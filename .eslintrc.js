module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
        "linebreak-style": ["error", "windows"],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "no-use-before-define": ["error", { "variables": false }],
        "object-curly-newline": ["error", {ImportDeclaration: 'never' }],
        "react/destructuring-assignment": 0,
        "react/prop-types": 0,
        "global-require": 0,
        "import/no-named-as-default": "off",
  },
};
