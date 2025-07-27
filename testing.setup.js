import { register } from 'node:module';
// import { mock } from 'node:test';

register(import.meta.resolve('import-essex'));

// mock.module('ioredis', {
//   defaultExport: Redis,
// });

// ensure that #gen/cache does not perform disk I/O
global.GENCACHE_DO_NOT_FILE = true;
