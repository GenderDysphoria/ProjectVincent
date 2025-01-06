import log from 'fancy-log';

import BUILD_HASH from './build-hash.js';
import cleanupTask from './tasks/cleanup.js';
import cssTask, { watchCssTask } from './tasks/css.js';
import pagesTask, { watchPagesTask } from './tasks/pages.js';
import { serverWatchTask } from './tasks/server.js';

const tasks = {
  pages: () => pagesTask(),
  clean: () => cleanupTask([ 'compiled', 'dist' ]),
  css: () => cssTask({
    distPath: `dist/static/${BUILD_HASH}/bundle.css`,
  }),
  build: [
    'clean',
    {
      parallel: [
        'css',
        'pages',
      ],
    },
  ],
  watch: [
    'clean',
    {
      parallel: [
        function watchCss () { return watchCssTask(); },
        function watchPages () { return watchPagesTask(); },
      ],
    },
    function server () { return serverWatchTask(); },
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
    const res = await action(args, flags, depth);

    if (typeof res === 'function') {
      // action is long running and returned a disposer
      process.on('exit', res);
    }
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
  if (!command) command = 'build';
  return exec(command, args, flags).catch(console.error);
}
