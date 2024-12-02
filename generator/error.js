import chalk from 'chalk';
import ErrorStackParser from 'error-stack-parser';

function minimumGuard (count, minimum) {
  if (count < minimum) {
    return minimum;
  }
  return count;
}

export class Diagnostic {
  constructor (error) {
    this.error = error;
  }

  get message () {
    return this.error?.message || this.error.message;
  }

  get help () {
    return this.error.diagnostic?.help;
  }

  get functionName () {
    if (this.error?.error?.name) return this.error.name;
    const parsedErrorStack = ErrorStackParser.parse(this.error);
    return parsedErrorStack[0].functionName;
  }

  get code () {
    return this.error.name;
  }

  get url () {
    return this.error.diagnostic?.url;
  }

  get snippets () {
    return this.error.snippets;
  }

  get fileAndLineNumber () {
    const parsedErrorStack = ErrorStackParser.parse(this.error);
    const lastStack = parsedErrorStack[0];
    return `${lastStack.fileName?.substring(lastStack.fileName.lastIndexOf('/') + 1, lastStack.fileName.length)}:${lastStack.lineNumber}:${lastStack.columnNumber}`;
  }

  get source () {
    // Ensure that we append a new line to the end of the source if it doesn't already have one.
    return (this.error?.source
      + (this.error?.source?.[this.error.source?.length] === '\n' ? '' : '\n'));
  }

  get severity () {
    return this.error.severity || 'ERROR';
  }
}

export class Reporter {
  constructor (diagnostic, style, characters) {
    // This will be used to store the raw output and used in tests for assertions
    this.debugString = '';
    this.diagnostic = diagnostic;
    this.theme = {
      style,
      characters,
    };
  }

  write (str) {
    process.stdout.write(str);
    this.debugString += str;
  }

  writeLine (str) {
    process.stdout.write(str + '\n');
    this.debugString += str + '\n';
  }

  severityStyle () {
    if (this.diagnostic.severity === 'WARNING') {
      return this.theme.style.warning;
    }
    if (this.diagnostic.severity === 'ADVICE') {
      return this.theme.style.advice;
    }
    return this.theme.style.error;
  }

  getLines (str) {
    let line = 0;
    let column = 0;
    let offset = 0;
    let line_offset = 0;
    let line_str = '';
    const lines = [];
    const iter = str.split('');
    iter.forEach((c, i) => {
      const at_end_of_file = iter.length === i + 1;
      if (c === '\r') {
        if (iter[i + 1] === '\n') {
          offset += 1;
          line += 1;
          column = 0;
        } else {
          line_str += c;
          column += 1;
        }
      }
      if (c === '\n') {
        line += 1;
        column = 0;
      }
      if (c !== '\n' && c !== '\r') {
        line_str += c;
        column += 1;
      }
      if (c === ' ') {
        line_offset += 1;
      }
      if (iter[i + 1] === '' && !at_end_of_file) {
        line += 1;
      }
      if (column === 0 || iter[i + 1] === '') {
        lines.push({
          line_number: line,
          offset: line_offset,
          length: line_str.length - line_offset,
          text: line_str,
        });
        line_str = '';
        line_offset = offset;
      }
    });
    return lines;
  }

  render () {
    this.render_header();
    this.render_cause();
    this.render_snippets();
    this.render_footer();
  }

  render_header () {
    if (this.diagnostic.url) {
      this.writeLine(`Error: ${this.theme.style.code(`${this.diagnostic.functionName} ( ${this.diagnostic.url} )`)}`);
    } else {
      this.writeLine(`Error: ${this.theme.style.code(this.diagnostic.functionName)}`);
    }
  }

  render_cause () {
    const severityStyle = this.severityStyle();
    if (this.diagnostic.error) {
      this.writeLine('');
      this.writeLine(`${' '.repeat(3)}${severityStyle(`${this.theme.characters.x} ${this.diagnostic.message}`)}`);
    }
  }

  render_snippets () {
    this.writeLine('');
    const lines = this.getLines(this.diagnostic.source);
    const lineWidth = lines
      .map((line) => line.line_number)
      .sort((a, b) => b - a)[0]
      .toString().length;
    this.write(`${' '.repeat(lineWidth + 2)}${this.theme.characters.ltop}${this.theme.characters.hbar.repeat(3)}`);
    // if we have a name for the snippet we should use that
    this.write(`[${this.diagnostic.fileAndLineNumber}]`);
    this.writeLine('');
    lines.forEach((line, i) => {
      this.writeLine(` ${i} ${' '.repeat(minimumGuard(lineWidth - i.toString().length, 0))}${this.theme.characters.vbar} ${line.text}`);
      // get all the snippets that are applicable to a certain line
      const snippetsOnLineSorted = (this.diagnostic.snippets || [])
        .filter((snippet) => {
          return line.text.trim().indexOf(snippet.context) > -1;
        })
        .map((snippet, i) => {
          return {
            ...snippet,
            rendered: false,
            offset: line.text.trim().indexOf(snippet.context),
            color: this.theme.style.highlights[i],
          };
        })
        .sort((a, b) => {
          return a.offset - b.offset;
        });
      // Short circuit and do nothing as there are no snippets
      if (snippetsOnLineSorted.length === 0) {
        return;
      }
      // Render the initial selection bar for the text the snippet is related to
      const initialHighlighedLine = Array(line.length).fill(' ');
      snippetsOnLineSorted.forEach((snippet) => {
        // TODO: colorizing everything is expensive, we should be able to reduce the cost of doing this
        // We are setting the bars and splicing the mtop character in the middle of the needed length at the right offset
        const highlightedBar = Array(snippet.context.length).fill(snippet.color(this.theme.characters.hbar));
        highlightedBar.splice(snippet.context.length / 2, 1, [
          snippet.color(this.theme.characters.mtop),
        ]);
        initialHighlighedLine.splice(snippet.offset, snippet.context.length, ...highlightedBar);
      });
      // set the line offset that needs to be added when we are only rendering a single entry on a line or multiple
      const lineOffset = snippetsOnLineSorted.length > 1 ? 1 : line.offset + 1;
      // Renders the initially highlights for the line
      this.writeLine(`${' '.repeat(lineWidth + 2)}${this.theme.characters.vbar_break}${' '.repeat(lineOffset)}${initialHighlighedLine.join('')}`);
      // continue looping until we have rendered all the snippets
      while (snippetsOnLineSorted.length > 0) {
        const lineToRender = Array(line.length).fill(' ');
        snippetsOnLineSorted.forEach((snippet, i) => {
          // If we are the last snippet then we can render out the context
          if (i === snippetsOnLineSorted.length - 1) {
            lineToRender.splice(snippet.offset + (snippet.context.length / 2), 1, [
              snippet.color(this.theme.characters.lbot
                + this.theme.characters.underline.repeat(2)
                + ' '
                + snippet.highlight),
            ]);
            snippetsOnLineSorted.pop();
          } else {
            lineToRender.splice(snippet.offset + (snippet.context.length / 2), 1, [ snippet.color(this.theme.characters.vbar) ]);
          }
        });
        this.writeLine(`${' '.repeat(lineWidth + 2)}${this.theme.characters.vbar_break}${' '.repeat(lineOffset)}${lineToRender.join('')}`);
      }
    });
    this.write(`${' '.repeat(lineWidth + 2)}${this.theme.characters.lbot}${this.theme.characters.hbar.repeat(3)}`);
  }

  render_footer () {
    if (this.diagnostic.help) {
      this.writeLine('');
      this.write(this.theme.characters.fyi + ' ');
      this.writeLine(this.theme.style.help(this.diagnostic.help));
    }
    this.writeLine('');
  }
}

const characters = {
  hbar: '─',
  vbar: '│',
  xbar: '┼',
  vbar_break: '·',
  uarrow: '▲',
  rarrow: '▶',
  ltop: '╭',
  mtop: '┬',
  rtop: '╮',
  lbot: '╰',
  mbot: '┴',
  rbot: '╯',
  lbox: '[',
  rbox: ']',
  lcross: '├',
  rcross: '┤',
  underbar: '┬',
  underline: '─',
  fyi: '‽',
  x: '×',
  warning: '⚠',
  point_right: '☞',
};

const style = {
  error: chalk.rgb(172, 65, 66),
  warning: chalk.rgb(244, 191, 117),
  advice: chalk.rgb(106, 159, 181),
  code: chalk.rgb(170, 117, 159),
  help: chalk.rgb(106, 159, 181),
  filename: chalk.underline.bold.rgb(117, 181, 170),
  highlights: [
    chalk.rgb(255, 135, 162),
    chalk.rgb(150, 232, 133),
    chalk.rgb(62, 238, 210),
    chalk.rgb(234, 207, 182),
    chalk.rgb(130, 221, 255),
    chalk.rgb(255, 188, 242),
  ],
};

export default function renderError (err) {
  new Reporter(new Diagnostic(err), style, characters).render();
}
