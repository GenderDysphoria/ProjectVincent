import { node, browser } from '@twipped/eslint-config';
import { defineConfig } from 'eslint/config';

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
