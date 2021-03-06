module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb', 'plugin:react/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"]
      }
    }
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  parser: 'babel-eslint',
  plugins: ['react'],
  rules: {
    // Warn
    'no-console': 'off',
    'react/prop-types': 'warn',

    // Off
    'linebreak-style': 'off',
    // 'radix': 'off',
    // 'arrow-body-style': 'off',
    // 'arrow-parens': 'off',
    // 'no-plusplus': 'off',
    // 'no-continue': 'off',
    camelcase: 'off',
    // 'no-param-reassign': 'off',
    // 'import/no-dynamic-require': 'off',
    // 'consistent-return': 'off',
    'react/prefer-stateless-function': 'off',
    // 'react/no-did-update-set-state': 'off',
    'no-shadow': 'off',
    // 'import/no-cycle': 'off',
    // 'no-restricted-globals': 'off',
    // 'no-nested-ternary': 'off',
    // 'jsx-a11y/no-noninteractive-element-interactions': 'off',
    // 'jsx-a11y/no-static-element-interactions': 'off',
    // 'jsx-a11y/click-events-have-key-events': 'off',
    // 'react/no-array-index-key': 'off',
    'react/prop-types': 'off',
    // 'react/sort-comp': 'off',
    'react/destructuring-assignment': 'off',
    // 'no-confusing-arrow': 'off',
    'react/jsx-filename-extension': 'off',
    // 'import/prefer-default-export': 'off',
    // 'function-paren-newline': 'off',
    // 'react/jsx-curly-brace-presence': 'off',
    "react/jsx-props-no-spreading": 'off',
    // 'no-unused-expressions': 'off',
    "react/no-did-update-set-state": 'off',
    'no-underscore-dangle': 'off',
  },
};
