import log from 'fancy-log';
import glob from 'fast-glob';
import fs from 'fs-extra';
import path from 'node:path';

import { ROOT_DIR, resolve } from '#gen/config';

export const INCLUDE_GLOB = [
  'public/favicon*',
];
export const EXCLUDE_GLOB = [];

export default async function copy (options) {
  const {
    cwd = ROOT_DIR,
    includeGlob,
    excludeGlob,
    followSymbolicLinks = true,
    deep,
    dot = true,
  } = options = {
    includeGlob: INCLUDE_GLOB,
    excludeGlob: EXCLUDE_GLOB,
    ...options,
  };

  const publicPath = resolve('public');

  const files = await glob(includeGlob, {
    cwd,
    deep,
    followSymbolicLinks,
    ignore: excludeGlob,
    onlyFiles: true,
    dot,
  });

  await Promise.all(files.map((f) => {
    const absPath = resolve(f);
    const relPath = path.relative(publicPath, absPath);
    const distPath = resolve('dist', relPath);
    return fs.copy(absPath, distPath);
  }));

  log('    Copied static assets');
}
