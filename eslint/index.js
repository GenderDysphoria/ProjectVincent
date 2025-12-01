import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

import resolveIgnoresFromGitignore from './lib/resolve-gitignore.js';
import baseRules from './rulesets/base.js';
import { jsx as jsxRules, jsxStyles as jsxStyleRules } from './rulesets/jsx.js';
import nodeRules from './rulesets/node.js';
import styleRules from './rulesets/style.js';

export const node = defineConfig([
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
    name: 'twipped/node',
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
  baseRules,
  nodeRules,
  jsxRules,
  jsxStyleRules,
  styleRules,
]);

export const browser = defineConfig([
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
    name: 'twipped/browser',
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  importPlugin.flatConfigs.recommended,
  baseRules,
  styleRules,
]);
