import log from 'fancy-log';

import metaTask from './tasks/meta.js';
import cleanupTask from './tasks/cleanup.js';

const tasks = {
  // mdx: () => mdx([ 'public/**/*.mdx' ], '.compiled'),
  // babelSrc: () => babel([ 'src/**/*.js' ], '.compiled'),
  scanPages: () => metaTask(),
  clean: () => cleanupTask([ './.compiled', 'src/manifest.json' ]),
  build: [
    'clean',
    'scanPages',
  ],
};

const OVERCALL_LIMIT = 20;
const calls = [];

function indent (level = 0) {
  return ''.padEnd(level * 2, ' ');
}

async function exec (command, args, flags, depth = 0) {
  const action = typeof command === 'string' ? tasks[command] : command;
  if (!action) {
    log(`${indent(depth)}Could not find task "${command}"`);
    return;
  }

  calls.push(command);

  if (calls.length > OVERCALL_LIMIT) {
    throw new Error('gen invoked too many recursive tasks: ' + calls.join(' -> '));
  }

  if (Array.isArray(action)) {
    log(`${indent(depth)}Executing serial task "${command}" {`);

    for (const a of action) {
      await exec(a, null, flags, depth + 1);
    }

    log(`${indent(depth)}}`);
    return;
  }

  if (typeof action === 'function') {
    log(`${indent(depth)}Executing action "${command}"`);
    await action(args, flags, depth);
  }

  if (action?.parallel && Array.isArray(action.parallel)) {
    if (typeof command === 'string') {
      log(`${indent(depth)}Executing parallel ("${command}") {`);
    } else {
      log(`${indent(depth)}Executing parallel {`);
    }

    await Promise.all(action.parallel.map((a) => exec(a, null, flags, depth + 1)));

    log(`${indent(depth)}}`);
  }
}

export default async function gen (command, args, flags) {
  if (!command) command = 'build';
  return exec(command, args, flags);
}
