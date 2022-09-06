import webpack from 'webpack';
import webpackConfig from '../webpack/index.js';

export default function runWebpack () {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (err) return reject(err);
      if (stats.hasErrors()) {
        if (stats.compilation?.errors?.length) return reject(new Error(stats.compilation?.errors.map(({ message }) => message).join('\n')));
        if (stats.compilation?.warnings?.length) return reject(stats.compilation.warnings[0]);
        return reject(stats);
      }
      resolve(stats);
    });
  });
}
