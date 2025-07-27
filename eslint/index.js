import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

import resolveIgnoresFromGitignore from './lib/resolve-gitignore.js';
import base from './rulesets/base.js';
import { jsx, jsxStyles } from './rulesets/jsx.js';
import node from './rulesets/node.js';
import style from './rulesets/style.js';

export const server = [
  {
    ignores: resolveIgnoresFromGitignore(),
  },
  {
    files: [ '**/*.js' ],

    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
  },
  {
    name: 'amorra/globals/server',
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  importPlugin.flatConfigs.recommended,
  {
    rules: {
      'import/no-commonjs': 'error',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
    },
  },
  {
    settings: {
      'import/resolver': {
        typescript: {
          extensions: [ '.js', '.json', '.cjs', '.mjs' ],
        },
      },
    },
  },
  base,
  node,
  jsx,
  jsxStyles,
  style,
];

export const client = [
  {
    ignores: resolveIgnoresFromGitignore(),
  },
  {
    files: [ '**/*.js' ],

    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
  },
  {
    name: 'amorra/globals/client',
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  base,
  style,
];
