import babel from '@babel/core';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const { loadOptionsAsync, transformAsync } = babel;

function isBabelConfigFile (filename) {
  const basename = path.basename(filename);
  return (
    basename === '.babelrc.js'
    || basename === '.babelrc.mjs'
    || basename === 'babel.config.js'
    || basename === 'babel.config.mjs'
    || basename === '.babelrc'
    || basename === '.babelrc.cjs'
    || basename === 'babel.config.cjs'
  );
}

// The formats that babel can compile
// It cannot compile wasm/json
const supportedModuleFormats = [ 'module' ];

function useLoader (url) {
  return !/node_modules/.test(url) && !/node:/.test(url);
}

export async function initialize () {
  // no nothing
}

const moduleCache = new Map();
export async function load (url, context, next) {
  if (!useLoader(url)) {
    return next(url, context, next);
  }

  const { source, format } = await next(url, context, next);

  // NodeJS' implementation of defaultLoad returns a source of `null` for CommonJS modules.
  // So we just skip compilation when it's commonjs until a future day when NodeJS (might) support that.
  // Also, we skip compilation of wasm and json modules by babel, since babel isn't needed or possible
  // in those situations
  if (!source || (format && !supportedModuleFormats.includes(format))) {
    return { source, format };
  }

  const filename = fileURLToPath(url);
  // Babel config files can themselves be ES modules,
  // but we cannot transform those since doing so would cause an infinite loop.
  if (isBabelConfigFile(filename)) {
    return {
      source,
      format: /\.(c|m)?js$/.test(filename) ? 'module' : 'json',
    };
  }

  if (moduleCache.has(filename)) {
    return {
      source: moduleCache.get(filename),
      format: 'module',
    };
  }

  // const isTest = isTestFile(filename);
  const options = await loadOptionsAsync({
    sourceType: format || 'module',
    root: process.cwd(),
    filename,
    rootMode: 'root',
    sourceMaps: 'inline',
    configFile: false,
    presets: [
      [ '@babel/preset-react', {
        runtime: 'automatic',
        importSource: 'essex',
        development: true,
      } ],
    ],
  });
  const transformed = await transformAsync(source, options);
  moduleCache.set(filename, transformed.code);

  return {
    source: transformed.code,
    format: 'module',
  };
}
