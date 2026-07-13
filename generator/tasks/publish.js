import parallelize from 'concurrent-transform';
import awspublish from 'gulp-awspublish';
import path from 'node:path';
import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import vfs from 'vinyl-fs';

const routes = [
  {
    pattern: /p\/.*\.(?:jpeg|jpg|png|gif)$/i,
    cacheTime: 86400, // one day on client
    sharedCacheTime: 2592000, // 30 days on server
  },

  {
    pattern: /^(?:sitemap|atom)\\.xml$/i,
    cacheTime: 3600, // one hour on client
    sharedCacheTime: 86400, // one day on server
  },

  {
    pattern: /\.html$/i,
    cacheTime: 3600, // 1 hour on client
    sharedCacheTime: 3600, // 1 hour on server
  },

  {
    pattern: /^404\.html$/i,
    cacheTime: 2592000, // 30 days on server
    sharedCacheTime: 2592000, // 30 days on server
  },

  {
    pattern: /\.(?:js|css)$/i,
    cacheTime: 604800, // one week on client
    sharedCacheTime: 2592000, // one month on server
  },
];

const router = new Transform({ objectMode: true });
router._transform = function (file, enc, cb) {
  const options = {
    cacheTime: 31536000,
    public: true,
    allowTransform: false,
    useExpires: false,
    immutable: false,
  };

  // init the file if the s3 opts are missing
  file.s3 = file.s3 || {
    headers: {},
    path: file.path
      .replace(file.base, '')
      .replace(new RegExp('\\' + path.sep, 'g'), '/')
      .replace(/^\//, ''),
  };

  for (const { pattern, ...o } of routes) {
    if (!pattern.test(file.relative)) continue;
    Object.apply(options, o);
  }

  // nothing to apply
  if (typeof options.cacheTime !== 'number') return cb(null, file);

  var directives = [];
  if (options.cacheTime === 0) {
    directives.push('no-cache');
  } else {
    directives.push('max-age=' + options.cacheTime);
  }

  if (typeof options.sharedCacheTime === 'number') {
    directives.push('s-maxage=' + options.sharedCacheTime);
  }

  if (!options.allowTransform) {
    directives.push('no-transform');
  }

  if (options.immutable) {
    directives.push('immutable');
  }

  if (options.public) {
    directives.push('public');
  } else {
    directives.push('private');
  }

  file.s3.headers['Cache-Control'] = directives.join(', ');

  if (options.contentType) {
    file.s3.headers['Content-Type'] = options.contentType;
  }

  if (options.useExpires) {
    file.s3.headers.Expires = new Date(Date.now() + (options.cacheTime * 1000));
  }

  return cb(null, file);
};

export default async function publish () {
  var credentials;
  try {
    credentials = (await import('#aws')).default;
  } catch (e) {
    console.error(e);
    throw new Error('Could not find the "aws.js" config file in the project root.');
  }

  var publisher = awspublish.create(credentials);

  return pipeline(
    vfs.src('dist/**/*', { encoding: false }),
    awspublish.gzip(),
    router,
    parallelize(publisher.publish(), 10),
    publisher.sync(),
    publisher.cache(),
    awspublish.reporter({
      states: [ 'create', 'update', 'delete' ],
    })
  );
}
