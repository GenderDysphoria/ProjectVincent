import { relative } from 'path';
import {
  PATH_SRC,
  PATH_OUTPUT,
  IS_PROD,
  IS_DEV,
} from '../config.js';

export default {
  path: PATH_OUTPUT,

  // Add /* filename */ comments to generated require()s in the output.
  pathinfo: IS_DEV,

  // There will be one main bundle, and one file per asynchronous chunk.
  // In development, it does not produce real files.
  filename: IS_PROD
    ? 'assets/js/[name].[contenthash:8].js'
    : IS_DEV && 'assets/js/bundle.js',

  // There are also additional JS chunk files if you use code splitting.
  chunkFilename: IS_PROD
    ? 'assets/js/[name].[contenthash:8].chunk.js'
    : IS_DEV && 'assets/js/[name].chunk.js',

  assetModuleFilename: IS_PROD
    ? 'assets/[name].[hash][ext]'
    : IS_DEV && 'assets/[name][ext]',

  // webpack uses `publicPath` to determine where the app is being served from.
  // It requires a trailing slash, or the file assets will get an incorrect path.
  // We inferred the "public path" (such as / or /my-project) from homepage.
  publicPath: '/',

  // Point sourcemap entries to original disk location (format as URL on Windows)
  devtoolModuleFilenameTemplate: IS_PROD
    ? (info) => relative(PATH_SRC, info.absoluteResourcePath).replace(/\\/g, '/')
    : (info) => info.absoluteResourcePath.replace(/\\/g, '/'),

};
