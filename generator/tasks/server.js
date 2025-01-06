import express from 'express';
import log from 'fancy-log';
import morgan from 'morgan';
import path from 'node:path';
import directory from 'serve-index';

import { ROOT_DIR } from '../pkg.js';

export async function serverWatchTask (options = {}) {
  const {
    cwd = ROOT_DIR,
    port,
    distPath,
  } = options = {
    port: process.env.PORT || 8080,
    distPath: 'dist',
    ...options,
  };

  const hostDir = path.resolve(cwd, distPath);

  var app = express();

  app.disable('etag');
  app.use(morgan('dev'));

  app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    req.headers['if-none-match'] = 'no-match-for-this';
    next();
  });

  app.use(express.static(hostDir, { etag: false, maxAge: 5 }));

  app.use(directory(hostDir, { icons: true }));

  app.get('/i', (req, res) => res.send(''));

  log('Server starting...');

  return new Promise((resolve, reject) => {
    const server = app.listen(port);
    function dispose () {
      log('Closing server...');
      const closed = new Promise((resolve) => server.on('close', resolve));
      server.close();
      return closed;
    }
    server.on('listening', () => {
      log('Listening on http://127.0.0.1:' + server.address().port);
      resolve(dispose);
    });
    server.on('error', (err) => {
      reject(err);
    });
  });
}
