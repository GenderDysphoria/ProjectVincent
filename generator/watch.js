import { pDebounce } from '@twipped/utils';
import log from 'fancy-log';
import globWatch from 'glob-watcher';
import { spawn } from 'node:child_process';
import path from 'path';

import { ROOT_DIR } from './pkg.js';
import { WATCH_GLOB as cssGlob } from './tasks/css.js';
import { WATCH_GLOB as pagesGlob } from './tasks/pages.js';
import { serverWatchTask } from './tasks/server.js';

export default async function watch () {
  const disposeServer = await serverWatchTask();

  const cssWatcher = globWatch(cssGlob);
  cssWatcher.on('change', async (fpath) => {
    await rebuildCss();
  });
  cssWatcher.on('add', async (fpath) => {
    await rebuildCss();
  });
  const disposeCssWatcher = () => cssWatcher.close();

  const pageWatcher = globWatch(pagesGlob);
  pageWatcher.on('change', async (fpath) => {
    await rebuildPages();
  });
  pageWatcher.on('add', (fpath) => {
    rebuildPages();
  });
  const disposePageWatcher = () => pageWatcher.close();

  const gitWatcher = globWatch([ '.git/refs/heads/main' ]);
  gitWatcher.on('change', async (fpath) => {
    // if a commit is made, we need to refresh for the build hash
    await Promise.all([
      rebuildPages(),
      rebuildCss(),
    ]);
  });
  const disposeGitWatcher = () => gitWatcher.close();

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
