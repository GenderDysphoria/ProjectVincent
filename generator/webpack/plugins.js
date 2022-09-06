import {
  ENV,
  BUILD_ENV,
  IS_DEV,
  ROOT_DIR,
} from '../config.js';

import DefinePlugin from 'webpack/lib/DefinePlugin.js';
import ModuleNotFoundPlugin from 'react-dev-utils/ModuleNotFoundPlugin.js';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
// import CopyPlugin from 'copy-webpack-plugin';
// import { WebpackManifestPlugin } from 'webpack-manifest-plugin';

import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import escapeForBundling from './escape.js';

export default [
  // This gives some necessary context to module not found errors, such as
  // the requesting resource.
  new ModuleNotFoundPlugin(ROOT_DIR),

  // Makes some environment variables available to the JS code, for example:
  // `if (process.env.NODE_ENV === 'production') { ... }`
  // It is absolutely essential that NODE_ENV is set to production during a
  // production build. Otherwise React will be compiled in the very slow
  // development mode.
  new DefinePlugin({
    ...escapeForBundling(BUILD_ENV, { prefix: 'process.env..' }),
    'process.env.BUILD_ENV': JSON.stringify(BUILD_ENV),
  }),

  // Watcher doesn't work well if you mistype casing in a path so we use
  // a plugin that prints an error when you attempt to do this.
  // See https://github.com/facebook/create-react-app/issues/240
  IS_DEV && new CaseSensitivePathsPlugin(),

  ENV.USE_REACT_REFRESH && new ReactRefreshWebpackPlugin({
    overlay: false,
  }),

  // new CopyPlugin({
  //   patterns: [
  //     {
  //       from: 'public',
  //       globOptions: {
  //         ignore: [
  //           '**.mdx',
  //         ],
  //       },
  //     },
  //   ],
  // }),

].filter(Boolean);
