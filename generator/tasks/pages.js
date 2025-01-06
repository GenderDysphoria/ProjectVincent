import { threepiece } from '@twipped/utils';
import { render } from 'essex';
import log from 'fancy-log';
import glob from 'fast-glob';
import fs from 'fs-extra';
import globWatch from 'glob-watcher';
import minimatch from 'minimatch';
import path from 'node:path';

import HtmlPage from '#src/components/HtmlPage';
import Template from '#src/components/Template/Template';

import BUILD_HASH from '../build-hash.js';
import { ROOT_DIR } from '../pkg.js';

const PAGE_GLOB = 'public/**/*.{mdx,js}';
const IGNORE_GLOB = 'public/**/_*.mdx';
const INDEX_GLOB = 'public/*/_index.json';
const COMPONENT_GLOB = 'src/components/**/*.js';

const CANONICAL_ROOT = 'https://gdb.fyi/';

async function loadPage (relPath, options = {}) {
  const {
    cwd = ROOT_DIR,
  } = options;

  const { default: Page, meta: sourceMeta } = await import(path.resolve(cwd, relPath) + `?update=${Date.now()}`);
  const meta = {
    ...sourceMeta,
    file: relPath,
    Page,
  };

  if (!meta.lang) {
    [ , meta.lang = 'en' ] = relPath.match(/\/(..)\//) || [];
  }

  if (!meta.url) {
    // if we're loading an index.js or index.mdx, it should become such
    if (path.basename(relPath).startsWith('index.')) {
      meta.url = path.dirname(relPath).replace(/^public/, '') + '/';
    } else {
      [ , meta.url ] = relPath.match(/public(\/.+?)(?:index)?\.(?:mdx|jsx?)/) || [];
    }
  }

  if (!meta.output) {
    meta.output = path.join(meta.url.slice(1), 'index.html');
  }

  return meta;
}

async function loadPages (options = {}) {
  const {
    cwd = ROOT_DIR,
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
    cwd = ROOT_DIR,
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

let manifest;
async function buildManifest (options = {}) {
  const {
    cwd = ROOT_DIR,
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

  manifest = { pages, routes, languages };

  const destPath = path.resolve(cwd, manifestDest);
  await fs.ensureFile(destPath);
  await fs.writeFile(destPath, JSON.stringify(manifest, null, 2));
  log(`    Manifest written to ${destPath}`);
}

async function renderPageBody (page, options = {}) {
  const {
    cwd = ROOT_DIR,
    distPath,
  } = options = {
    distPath: 'dist',
    ...options,
  };

  try {
    const { Page: PageBody } = page;
    page.body = await render(
      <HtmlPage
        lang={page.lang}
        title={page.title}
        canonical={`${path.join(CANONICAL_ROOT, page.url)}`}
      >
        <Template>
          <PageBody />
        </Template>
      </HtmlPage>,
      {
        metadata: page,
        BUILD_HASH,
        routes: manifest.routes,
        languages: manifest.languages,
      }
    );

    const destPath = path.resolve(cwd, distPath, page.output);
    log(`  Wrote ${destPath}`);
    await fs.ensureFile(destPath);
    await fs.writeFile(destPath, page.body);
  } catch (e) {
    e.message = `Error while rendering ${page.file}: ${e.message}`;
    e.stack = `Error while rendering ${page.file}:\n${e.stack}`;
    throw e;
  }

  return page;
}

async function renderAllPages (options = {}) {
  await Promise.all(
    Object.values(manifest.pages).map((page) => renderPageBody(page, options))
  );
}

async function updatePage (relPath, options = {}) {
  const newPage = await loadPage(relPath);
  const page = manifest.pages[newPage.url];
  Object.assign(page, newPage);
  await renderPageBody(page);
}

export default async function pagesTask (options = {}) {
  await buildManifest(options);
  await renderAllPages(options);
}

export async function watchPagesTask (options) {
  options = {
    distPath: 'dist',
    ...options,
  };

  await pagesTask(options);

  const watcher = globWatch([ PAGE_GLOB, INDEX_GLOB, COMPONENT_GLOB ]);
  watcher.on('change', async (fpath) => {
    const [ isPage, isIndex, isComponent ] = [
      minimatch(fpath, PAGE_GLOB),
      minimatch(fpath, INDEX_GLOB),
      minimatch(fpath, COMPONENT_GLOB),
    ];

    if (isPage) {
      log('  - Page changed: ', fpath);
      await updatePage(fpath, options);
    }

    if (isIndex) {
      log('  - Index changed, reloading manifest: ', fpath);
      await buildManifest(options);
    }

    if (isComponent) {
      log('  - Component changed, re-rendering all pages: ', fpath);
      await renderAllPages(options);
    }
  });

  watcher.on('add', async (fpath) => {
    log('- Added file', fpath);
    await buildManifest(options);
  });

  return () => {
    watcher.close();
  };
}
