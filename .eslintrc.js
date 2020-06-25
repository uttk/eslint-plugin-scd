module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true,
  },

  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
  ],

  parser: '@typescript-eslint/parser',

  parserOptions: {
    sourceType: 'module',
    project: "./tsconfig.json"
  },

  plugins: [
    "prettier",
    '@typescript-eslint',
  ],

  rules: {},
};