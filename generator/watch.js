import { pDebounce } from '@twipped/utils';
import globWatch from 'glob-watcher';
import { spawn } from 'node:child_process';
import path from 'path';

import { ROOT_DIR } from './pkg.js';
import { WATCH_GLOB as cssGlob } from './tasks/css.js';
import { WATCH_GLOB as pagesGlob } from './tasks/pages.js';
import { serverWatchTask } from './tasks/server.js';

export default async function watch () {
  const disposeServer = await serverWatchTask();
  const disposeCssWatcher = makeWatcher(cssGlob, () => rebuildCss());
  const disposePageWatcher = makeWatcher(pagesGlob, () => rebuildPages());
  const disposeGitWatcher = makeWatcher([ '.git/HEAD', '.git/refs/heads/main' ], () => {
    rebuildPages();
    rebuildCss();
  });

  var halting = false;
  [ 'SIGINT', 'SIGTERM' ].forEach((signal) => {
    process.once(signal, function handleSignal () {
      if (halting) {
        process.kill(-1);
      }
      halting = true;
      disposeServer();
      disposeCssWatcher();
      disposePageWatcher();
      disposeGitWatcher();
    });
  });
}

function makeWatcher (globs, cb) {
  const watcher = globWatch(globs);
  watcher.on('change', cb);
  watcher.on('add', cb);
  return () => watcher.close();
}

async function invokeTask (task) {
  const cpath = path.resolve(ROOT_DIR, 'gen');

  return new Promise((resolve, reject) => {
    const gen = spawn(cpath, [ task, '--color' ]);
    gen.stdout.pipe(process.stdout);
    gen.stderr.pipe(process.stderr);
    gen.on('error', reject);
    gen.on('close', resolve);
  });
}

var rebuildCss = pDebounce(async function rebuildCss () {
  return invokeTask('css');
}, 250);

var rebuildPages = pDebounce(async function rebuildCss () {
  return invokeTask('pages');
}, 250);
