import { memoize, MultiMap, isPromise, pDebounce } from '@twipped/utils';
import log from 'fancy-log';
import fs from 'fs-extra';
import { hashFile } from 'hasha';
import path from 'node:path';
import rev from 'rev-hash';
import { rimraf } from 'rimraf';

import { resolve } from '#gen/config';

const cache = new MultiMap();
const FILE_ACTION = Symbol('FILE_ACTION');

const CACHE_FOLDER_PATH = resolve('cache');
const CACHE_MANIFEST_PATH = resolve('cache', 'manifest.json');

const mtime = memoize(
  (f) =>
    fs.stat(resolve(f))
      .catch(() => null)
      .then((stats) => (stats && Math.floor(stats.mtimeMs / 1000))),
  {
    maxAge: 10000,
  }
);

export const hfile = memoize(
  (f) => hashFile(resolve(f), { algorithm: 'md5' }).then((h) => h.slice(0, 8)),
  {
    maxAge: 10000,
  }
);

let manifest = null;
const readManifest = memoize(async function readManifest () {
  if (manifest) return;

  await fs.ensureDir(CACHE_FOLDER_PATH);

  manifest = await fs.readJson(CACHE_MANIFEST_PATH).catch(() => ({}));
});

const writeManifest = pDebounce(async function () {
  return fs.writeJson(CACHE_MANIFEST_PATH, manifest || {}, { spaces: 2 });
}, 500, { maxWait: 5000 });

export const SOURCE_CHANGED = 1;
export const CACHE_MISSING = 2;

async function cleanCache (sourceCachePath, validHash) {
  return rimraf(sourceCachePath, {
    filter: (p) => !p.startsWith(path.join(sourceCachePath, validHash)),
  });
}

export async function file (source, target, ...args) {
  if (global.GENCACHE_DO_NOT_FILE) {
    return false;
  }

  await readManifest();
  const fn = args.pop();

  return memory(FILE_ACTION, source, target, ...args, async () => {
    try {
      const ext = path.extname(target);
      const sourceMTime = await mtime(source);
      if (!sourceMTime) {
        throw new Error(`Could not locate ${source}`);
      }

      let changed = 0;
      const sourceKey = rev(source);
      const targetKey = rev(target);
      const sourceHash = await hfile(source);
      const cacheEntryPath = path.resolve(CACHE_FOLDER_PATH, sourceKey);
      const cacheTargetPath = path.join(cacheEntryPath, sourceHash, targetKey + ext);
      const cacheEntryExists = await fs.pathExists(cacheEntryPath);

      let origin = manifest[sourceKey];

      if (!origin || !cacheEntryExists) {
        log.trace('CACHE', source, 'Newly seen file', !!origin, !!cacheEntryExists, cacheEntryPath);
        changed = SOURCE_CHANGED;
        origin = manifest[sourceKey] = {
          mtime: sourceMTime,
          hash: sourceHash,
        };
      } else if (origin.hash !== sourceHash) {
        log.trace('CACHE', source, 'Previous hash differs', origin.hash, sourceHash);
        changed = SOURCE_CHANGED;
        origin.mtime = sourceMTime;
        origin.hash = sourceHash;
      }

      if (changed && cacheEntryExists) {
      // if the file has changed, purge all cache targets for that file
        log.trace('CACHE', source, 'source has changed, purging old cached values');
        await cleanCache(cacheEntryPath, sourceHash);
        await fs.ensureDir(cacheEntryPath);
      }

      // if the source is unchanged, check if the cached result exists
      // if it doesn't, then we need to remake it anyway
      if (!changed) {
        const cacheTargetExists = await fs.pathExists(cacheTargetPath);
        if (!cacheTargetExists) {
          log.trace('CACHE', source, 'no cached value for target', target);
          changed = CACHE_MISSING;
        }
      }

      if (changed) {
        log.trace('CACHE', source, 'Remaking target', target);
        // we need to rerun the task. pass the cache target path and why it is needed
        await fs.ensureFile(cacheTargetPath);
        await fn(cacheTargetPath, { why: changed, hash: sourceHash, mtime: sourceMTime });
      }

      // copy the cached result to the target destination
      if (changed || !await fs.pathExists(resolve(target))) {
        log.trace('CACHE', source, 'Copying to target', target);
        await fs.copy(cacheTargetPath, resolve(target));
      }
      return changed;
    } finally {
      writeManifest();
    }
  });
}

export async function memory (...args) {
  const fn = args.pop();

  if (typeof fn !== 'function') {
    throw new Error('cache.memory did not receive a function');
  }
  if (typeof args[0] !== 'string' && typeof args[0] !== 'symbol') {
    console.warn(args[0]);
    throw new Error('First argument to cache.memory must be a cache name.');
  }

  var leaf = cache.getLeaf(args);
  if (leaf) {
    return leaf.get();
  }

  const res = fn();
  if (isPromise(res)) {
    res.then(null, () => cache.delete(args));
  }
  if (leaf) {
    leaf.set(res);
  } else {
    leaf = cache.setLeaf(args, res);
  }

  return res;
}
