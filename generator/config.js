/**
 * This config module centralizes config management for the frontend
 * build and testing processes. Environment variables are merged with local
 * dotenv files, validated and sanitized for use during webpack builds
 * and backend runtime.
 *
 * The functions exported from this module make it easier to resolve
 * paths to files and dependencies within the repo for the webpack
 * and jest configuration files.
 */

import path from 'node:path';

import BuildConfig from './config.class.js';
import ENV from './env.js';
import PKG, { ROOT_DIR } from './pkg.js';

export { PKG, ENV, ROOT_DIR };

export const {
  NODE_ENV,
} = ENV;

export const BUILD_ENV = {
  NODE_ENV,
};

export const IS_PROD = process.env.NODE_ENV === 'production';
export const IS_DEV = !IS_PROD;

export const CONFIG = new BuildConfig({
  cwd: ROOT_DIR,
});

export const PATH_SRC = CONFIG.resolve('src');
export const PATH_ENTRY = CONFIG.resolve('src/index.js');
export const PATH_HTML = CONFIG.resolve('src/index.html');
export const PATH_PUBLIC = CONFIG.resolve('public');
export const PATH_OUTPUT = CONFIG.resolve('dist');

export const BABEL_CONFIG = JSON.parse(await CONFIG.read('babel.config.json'));

export function resolve (...args) {
  args = args.filter(Boolean);
  const fpath = args.shift();
  if (!fpath) return ROOT_DIR;

  return path.resolve(ROOT_DIR, fpath, ...args);
}

export function resolveRelative (fpath, parent = '') {
  // if (fpath[0] === '/') fpath = fpath.slice(1);

  if (fpath.startsWith(ROOT_DIR)) {
    fpath = path.relative(ROOT_DIR, fpath);
  } else if (fpath[0] === '/') {
    if (parent) {
      fpath = path.join(parent, fpath.slice(1));
    } else {
      fpath = fpath.slice(1);
    }
  }

  return fpath;
}

export function resolvePublic (fpath) {
  return resolveRelative(fpath, 'public');
}

export function resolveDist (fpath) {
  return resolveRelative(fpath, 'dist');
}
