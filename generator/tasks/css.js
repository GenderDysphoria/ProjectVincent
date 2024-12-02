import SourceMap from 'concat-with-sourcemaps';
import psNano from 'cssnano';
import log from 'fancy-log';
import glob from 'fast-glob';
import fs from 'fs-extra';
import globWatch from 'glob-watcher';
import path from 'node:path';
import postcss from 'postcss';
import psCombineSelect from 'postcss-combine-duplicated-selectors';
import psFor from 'postcss-for';
import psImport from 'postcss-import';
import psMixins from 'postcss-mixins';
import psNested from 'postcss-nested';
import psEnv from 'postcss-preset-env';
import psSimpleVars from 'postcss-simple-vars';

import renderError from '../error.js';

const INCLUDE_GLOB = 'src/**/*.css';
const EXCLUDE_GLOB = 'src/**/_*.css';

async function loadFiles (options = {}) {
  const {
    cwd = process.cwd(),
    deep,
    followSymbolicLinks = true,
    includeGlob,
    excludeGlob,
    bundlePath,
    dot = true,
  } = options;

  const inputs = await glob(includeGlob, {
    cwd,
    deep,
    followSymbolicLinks,
    ignore: excludeGlob,
    onlyFiles: true,
    dot,
  });

  const sm = new SourceMap(true, bundlePath, '\n');

  for (const f of inputs) {
    sm.add(f, await fs.readFile(path.resolve(cwd, f), 'utf-8'));
  }

  return { code: sm.content, map: sm.sourceMap };
}

export default async function cssTask (options) {
  const {
    cwd = process.cwd(),
    minify = false,
    bundlePath,
    distPath,
  } = options = {
    includeGlob: INCLUDE_GLOB,
    excludeGlob: EXCLUDE_GLOB,
    bundlePath: 'server/bundle.css',
    distPath: 'dist/bundle.css',
    ...options,
  };

  const { code, map } = await loadFiles(options);

  const result = await postcss([
    psFor,
    psSimpleVars,
    psMixins,
    psImport,
    psNested,
    psEnv,
    psCombineSelect,
    ...(minify ? [ psNano ] : []),
  ]).process(code, {
    from: bundlePath,
    to: distPath,
    map: {
      inline: true,
      prev: map,
    },
  });

  const destination = path.resolve(cwd, distPath);

  await fs.ensureFile(destination);
  await fs.writeFile(destination, result.css);
}

export function watchCssTask (options) {
  const watcher = globWatch([ INCLUDE_GLOB ]);
  watcher.on('change', async (fpath) => {
    log('  - File changed: ', fpath);
    await cssTask(options).catch(renderError);
  });

  watcher.on('add', (fpath) => {
    log('Added file', fpath);
    cssTask(options).catch(renderError);
  });

  return new Promise((resolve) => {
    const kill = () => resolve(watcher.close());
    process.on('exit', kill);
  });
}
