import eslintPluginN from 'eslint-plugin-n';

export default {
  name: 'twipped/rulesets/node',

  plugins: {
    n: eslintPluginN,
  },

  rules: {
    'no-path-concat': 'error',
    'no-process-exit': 'warn',
    'no-buffer-constructor': 'error',

    'n/handle-callback-err': [ 'error', '^(err|error)$' ],
    'n/no-callback-literal': 'error',
    'n/no-deprecated-api': 'error',
    'n/no-exports-assign': 'error',
    'n/no-new-require': 'error',
    'n/no-path-concat': 'error',
    'n/process-exit-as-throw': 'error',

    // ensure correct hashbang path when hashbang is used in executable scripts
    'n/shebang': 'error',

  },
};
