import * as esbuild from 'esbuild';
import log from 'fancy-log';
import glob from 'fast-glob';

import BUILD_HASH from '../build-hash.js';
import { ROOT_DIR } from '../pkg.js';

export const INCLUDE_GLOB = [ 'public/static/*/index.js', 'public/static/*.js' ];
export const EXCLUDE_GLOB = [ ];
export const WATCH_GLOB = [ ...INCLUDE_GLOB, ...EXCLUDE_GLOB.map((s) => `!${s}`) ];

export default async function staticJsTask (options) {
  const {
    cwd = ROOT_DIR,
    minify = false,
    bundlePath,
    distPath,
    includeGlob,
    excludeGlob,
    followSymbolicLinks = true,
    deep,
    dot = true,
  } = options = {
    includeGlob: INCLUDE_GLOB,
    excludeGlob: EXCLUDE_GLOB,
    distPath: `dist/static/${BUILD_HASH}/`,
    ...options,
  };

  const entryPoints = await glob(includeGlob, {
    cwd,
    deep,
    followSymbolicLinks,
    ignore: excludeGlob,
    onlyFiles: true,
    dot,
  });

  const res = await esbuild.build({
    entryPoints,
    bundle: true,
    write: true,
    outdir: distPath,
    sourcemap: true,
    minify,
    treeShaking: true,
    metafile: true,
  });

  log('    JS bundles written:');
  Object.keys(res.metafile.outputs).forEach((s) => log(`      ${s}`));
}
