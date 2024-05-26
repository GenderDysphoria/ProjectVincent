import log from 'fancy-log';
import path from 'node:path';
import fs from 'fs-extra';
import glob from 'fast-glob';
import globWatch from 'glob-watcher';
import { render } from 'essex';
import { EmotionProvider } from 'essex-emotion';
import { threepiece } from '@twipped/utils';
import { MetaProvider } from '#src/providers/MetaProvider.js';
import PageRoot from '#src/components/PageRoot.js';
import { ROOT_DIR } from '../pkg.js';

const PAGE_GLOB = 'public/**/*.mdx';
const IGNORE_GLOB = 'public/**/_*.mdx';
const INDEX_GLOB = 'public/*/_index.json';

async function renderPageBody (page, options = {}) {
  const {
    cwd = ROOT_DIR,
    cache,
    collection,
    lang,
  } = options;

  const { default: Page } = await import(path.resolve(cwd, page.file));


  try {
    page.body = await render(
      <EmotionProvider cache={cache} collection={collection}>
        <MetaProvider page={page} lang={lang}>
          <PageRoot>
            <Page />
          </PageRoot>
        </MetaProvider>
      </EmotionProvider>
    );
  } catch (e) {
    e.message = `Error while rendering ${page.file}: ${e.message}`;
    e.stack = `Error while rendering ${page.file}:\n${e.stack}`;
    throw e;
  }

  return page;
}

async function renderPageBodies (options = {}) {
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
      const meta = await renderPageBody(relPath);
      pages[meta.url] = meta;
      routes[meta.url] = meta.file;
    })
  );

  return { pages, routes };
}

async function loadManifest (options = {}) {
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

export function watch (options) {
  // const watcher = globWatch([ PAGE_GLOB, INDEX_GLOB ]);
  // watcher.on('change', async (fpath) => {
  //   log('  - File changed: ', fpath);
  //   await buildLanguages(options);

  // });

  // watcher.on('add', (fpath) => {
  //   log('Added file', fpath);
  //   buildLanguages(options);
  // });

  // return new Promise((resolve) => {
  //   const kill = () => resolve(watcher.close());
  //   process.on('exit', kill);
  // });
}
