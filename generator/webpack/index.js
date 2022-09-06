import { ENV, IS_PROD, PATH_ENTRY } from '../config.js';

import output from './output.js';
import optimization from './optimization.js';
import resolveConfig from './resolve.js';
import module from './module.js';
import plugins from './plugins.js';
import devServer from './dev-server.js';

// This is the production and development configuration.
// It is focused on developer experience, fast rebuilds, and a minimal bundle.
export default {
  target: [ 'browserslist' ],
  mode: IS_PROD ? 'production' : 'development',
  bail: IS_PROD,
  devtool: IS_PROD ? 'source-map' : 'cheap-module-source-map',

  devServer,

  // These are the "entry points" to our application.
  // This means they will be the "root" imports that are included in JS bundle.
  entry: PATH_ENTRY,
  output,
  infrastructureLogging: {
    level: ENV.INFRA_LOG_LEVEL,
    debug: '*',
  },
  optimization,
  resolve: resolveConfig,
  module,
  plugins,
  performance: false,
};
