const EXCLUDE_PARENTS = [ 'STYLE', 'SCRIPT', 'TITLE' ];

addEventListener('DOMContentLoaded', (event) => {
  // look for the glossary definition script tag
  const glossary = document.getElementById('glossary');
  if (!glossary) return; // nothing to do

  // parse out the JSON from the tag and generate a lookup table of terms
  const words = JSON.parse(glossary.innerHTML);

  const lookup = new Map();
  let minLen = 100;

  // loops through the words and add to the lookup table by main term and aliases
  for (const [ word, { aliases = [], ...def } ] of Object.entries(words)) {
    const definition = {
      id: word,
      title: word,
      sortBy: word,
      ...def,
      description: Array.isArray(def.description) ? def.description : [ def.description ],
    };
    for (const w of [ word, ...aliases ]) {
      lookup.set(w.toLowerCase(), definition);
      minLen = Math.min(minLen, w.length);
    }
  }

  // generate a regexp to match on all the terms in the glossary
  const MATCHER = new RegExp(`(?:^|\\W)(${Array.from(lookup.keys()).join('|')})(?:\\W|$)`, 'igd');

  const mutations = [];

  // walk the dom searching for text nodes
  const walker = document.createTreeWalker(glossary.parentElement, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const target = walker.currentNode;
    const parent = target.parentElement;
    // do not include text nodes inside script or style tags
    if (EXCLUDE_PARENTS.includes(target.parentElement?.nodeName)) continue;
    const text = target.nodeValue;

    // don't bother searching text nodes that could not contain any of our terms
    if (!text || typeof text !== 'string' || text.trim().length < minLen) continue;

    const foundWords = [];
    for (const match of text.matchAll(MATCHER)) {
      const word = match[1];
      const [ start, end ] = match.indices[1];
      const definition = lookup.get(word.toLowerCase());
      if (!definition) continue; // this shouldn't happen, but just in case...

      foundWords.push({ start, end, word: definition });
    }
    if (!foundWords.length) continue;

    // you cannot mutate the dom while walking it with TreeWalker, so we defer these updates
    // until we're done walking
    const mutation = {
      target,
      parent,
      replacement: [],
    };

    let s = 0;
    for (const { start, end, word } of foundWords) {
      // if there is text before the match, we need to create a new node for it
      if (start > s) {
        const textNode = document.createTextNode(text.slice(s, start));
        mutation.replacement.push(textNode);
      }

      // create the ABBR tag for the matched text
      const abbrNode = document.createElement('abbr');
      abbrNode.innerHTML = text.slice(start, end);
      abbrNode.setAttribute('title', word.description.join('\n'));
      abbrNode.setAttribute('data-word', word.id);
      mutation.replacement.push(abbrNode);

      s = end;
    }

    // create a new text node for any text after the last match
    if (s < text.length) {
      const textNode = document.createTextNode(text.slice(s));
      mutation.replacement.push(textNode);
    }

    mutations.push(mutation);
  }

  // now loop through all pending mutations and replace the text nodes
  for (const { target, parent, replacement } of mutations) {
    for (const node of replacement) {
      parent.insertBefore(node, target);
    }
    target.remove();
  }
});
