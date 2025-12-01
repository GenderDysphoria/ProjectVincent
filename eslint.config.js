import { defineConfig } from 'eslint/config';

import { node, browser } from '#eslint';

export default defineConfig([
  {
    files: [
      '**/*.js',
      '!public/static/**/*.js',
    ],
    extends: [ node ],
  },
  {
    files: [ 'public/static/**/*.js' ],
    extends: [ browser ],
  },
]);
