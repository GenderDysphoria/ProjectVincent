import log from 'fancy-log';

import renderTask, { watch as renderTaskWatch } from './tasks/render.js';
import metaTask, { watch as metaTaskWatch } from './tasks/meta.js';
import cleanupTask from './tasks/cleanup.js';

const tasks = {
  render: () => renderTask(),
  scanPages: () => metaTask(),
  clean: () => cleanupTask([ 'compiled', 'dist' ]),
  build: [
    'clean',
    'scanPages',
    'render',
  ],
  watch: [
    'clean',
    'scanPages',
    { parallel: [
      function watchPages () { return metaTaskWatch(); },
    ] },
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
    throw new Error(`gen invoked too many recursive tasks: ${calls.join(' -> ')}`);
  }

  if (Array.isArray(action)) {
    log(`${indent(depth)}Executing serial task "${command.name || command}" {`);

    for (const a of action) {
      await exec(a, null, flags, depth + 1);
    }

    log(`${indent(depth)}}`);
    return;
  }

  if (typeof action === 'function') {
    log(`${indent(depth)}Executing action "${command.name || command}"`);
    await action(args, flags, depth);
  }

  if (action?.parallel && Array.isArray(action.parallel)) {
    if (typeof command === 'string') {
      log(`${indent(depth)}Executing parallel ("${command.name || command}") {`);
    } else {
      log(`${indent(depth)}Executing parallel {`);
    }

    await Promise.all(action.parallel.map((a) => exec(a, null, flags, depth + 1)));

    log(`${indent(depth)}}`);
  }
}

export default async function gen (command, args, flags) {
  // eslint-disable-next-line no-param-reassign
  if (!command) command = 'build';
  return exec(command, args, flags).catch(console.error);
}
