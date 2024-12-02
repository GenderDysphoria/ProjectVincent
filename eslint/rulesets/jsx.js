import react from 'eslint-plugin-react';

export const jsx = ({
  name: 'amorra/jsx',

  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },

  plugins: {
    react,
  },

  settings: {
    react: {
      version: '18',
    },
    linkComponents: [
      'Link',
    ],
  },

  rules: {
    'react/jsx-boolean-value': 'warn',
    'react/jsx-fragments': [ 'warn', 'syntax' ],
    'react/jsx-handler-names': 'warn',
    'react/jsx-key': [ 'off', {
      checkFragmentShorthand: true,
    } ],
    'react/jsx-no-comment-textnodes': 'warn',
    'react/jsx-no-duplicate-props': 'warn',
    'react/jsx-no-target-blank': [ 'warn', { enforceDynamicLinks: 'always' } ],
    'react/jsx-no-undef': [ 'warn', { allowGlobals: true } ],
    'react/jsx-uses-react': 'warn',
    'react/jsx-uses-vars': 'warn',
    'react/no-children-prop': 'warn',
    'react/no-danger-with-children': 'warn',
    'react/no-deprecated': 'warn',
    'react/no-direct-mutation-state': 'warn',
    'react/no-find-dom-node': 'warn',
    'react/no-is-mounted': 'warn',
    'react/no-string-refs': [ 'warn', {
      noTemplateLiterals: true,
    } ],
    'react/no-unescaped-entities': [ 'warn', {
      forbid: [ '>', '}' ],
    } ],
    'react/no-render-return-value': 'warn',
    'react/require-render-return': 'warn',
    'react/self-closing-comp': 'warn',
  },
});

export const jsxStyles = ({
  name: 'amorra/style/jsx',

  rules: {
    '@stylistic/jsx-child-element-spacing': 'warn',
    '@stylistic/jsx-closing-bracket-location': [ 'warn', 'tag-aligned' ],
    '@stylistic/jsx-closing-tag-location': 'warn',
    '@stylistic/jsx-curly-brace-presence': [ 'warn', {
      props: 'never',
      children: 'never',
    } ],
    '@stylistic/jsx-curly-newline': [ 'warn', {
      multiline: 'consistent',
      singleline: 'consistent',
    } ],
    '@stylistic/jsx-curly-spacing': [ 'warn', {
      attributes: { when: 'never', allowMultiline: true },
      children: { when: 'never', allowMultiline: true },
    } ],
    '@stylistic/jsx-equals-spacing': [ 'warn', 'never' ],
    '@stylistic/jsx-first-prop-new-line': [ 'warn', 'multiline-multiprop' ],
    '@stylistic/jsx-indent': [ 'warn', 2, {
      checkAttributes: false,
      indentLogicalExpressions: true,
    } ],
    '@stylistic/jsx-indent-props': [ 'warn', 2 ],
    '@stylistic/jsx-pascal-case': [ 'warn', { allowAllCaps: false } ],
    '@stylistic/jsx-props-no-multi-spaces': 'warn',
    '@stylistic/jsx-quotes': [ 'warn', 'prefer-double' ],
    '@stylistic/jsx-tag-spacing': [ 'warn', {
      closingSlash: 'never',
      beforeSelfClosing: 'always',
      afterOpening: 'never',
      beforeClosing: 'never',
    } ],
    '@stylistic/jsx-wrap-multilines': [ 'warn', {
      declaration: 'parens-new-line',
      assignment: 'parens-new-line',
      return: 'parens-new-line',
      arrow: 'ignore',
      condition: 'ignore',
      logical: 'ignore',
      prop: 'ignore',
    } ],
  },
});
