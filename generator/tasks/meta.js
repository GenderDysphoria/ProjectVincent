import { threepiece } from '@twipped/utils';
import log from 'fancy-log';
import glob from 'fast-glob';
import fs from 'fs-extra';
import globWatch from 'glob-watcher';
import path from 'node:path';

import { ROOT_DIR } from '../pkg.js';

const PAGE_GLOB = 'public/**/*.mdx';
const IGNORE_GLOB = 'public/**/_*.mdx';
const INDEX_GLOB = 'public/*/_index.json';

async function loadPage (relPath, options = {}) {
  const {
    cwd = ROOT_DIR,
  } = options;

  const { meta: sourceMeta } = await import(path.resolve(cwd, relPath));
  const meta = {
    ...sourceMeta,
    file: relPath,
  };

  if (!meta.lang) {
    [ , meta.lang ] = relPath.match(/\/(..)\//) || [];
  }

  if (!meta.url) {
    [ , meta.url ] = relPath.match(/public(\/.+?)(?:index)?\.(?:mdx|jsx?)/) || [];
  }

  return meta;
}

async function loadPages (options = {}) {
  const {
    cwd = process.cwd(),
    deep,
    followSymbolicLinks = true,
    ignore = IGNORE_GLOB,
    dot = true,
    pageGlob = PAGE_GLOB,
  } = options;

  const inputs = await glob(pageGlob, {
    cwd,
    deep,
    followSymbolicLinks,
    ignore,
    onlyFiles: true,
    dot,
  });

  const pages = {};
  const routes = {};

  await Promise.all(
    inputs.map(async (relPath) => {
      const meta = await loadPage(relPath);
      pages[meta.url] = meta;
      routes[meta.url] = meta.file;
    })
  );

  return { pages, routes };
}

async function loadIndexes (options = {}) {
  const {
    cwd = process.cwd(),
    deep,
    followSymbolicLinks = true,
    ignore,
    dot = true,
    indexGlob = INDEX_GLOB,
  } = options;

  const inputs = await glob(indexGlob, {
    cwd,
    deep,
    followSymbolicLinks,
    ignore,
    onlyFiles: true,
    dot,
  });

  const languages = {};

  await Promise.all(
    inputs.map(async (relPath) => {
      const contents = await fs.readFile(relPath, 'utf8');
      const language = JSON.parse(contents);
      languages[language.lang] = language;
    })
  );

  return languages;
}

export default async function buildLanguages (options = {}) {
  const {
    cwd = process.cwd(),
    manifestDest = 'compiled/manifest.json',
  } = options;

  const [ { pages, routes }, languages ] = await Promise.all([
    loadPages(options),
    loadIndexes(options),
  ]);

  for (const lang of Object.values(languages)) {
    lang.pages = threepiece(lang.pages, ([ , prev ] = [], [ , curr ] = [], [ , next ] = []) => {
      const page = pages[curr];
      if (!page) {
        throw new Error(`Could not find a file matching the indexed url ${curr}. Did you put unicode in your urls again?`);
      }
      page.previous = prev;
      page.next = next;
      return page;
    });
  }

  const destPath = path.resolve(cwd, manifestDest);
  await fs.ensureFile(destPath);
  await fs.writeFile(destPath, JSON.stringify({ pages, routes, languages }, null, 2));
  log(`    Manifest written to ${destPath}`);
}

export function watch (options) {
  const watcher = globWatch([ PAGE_GLOB, INDEX_GLOB ]);
  watcher.on('change', async (fpath) => {
    log('  - File changed: ', fpath);
    await buildLanguages(options);
  });

  watcher.on('add', (fpath) => {
    log('Added file', fpath);
    buildLanguages(options);
  });

  return new Promise((resolve) => {
    const kill = () => resolve(watcher.close());
    process.on('exit', kill);
  });
}
