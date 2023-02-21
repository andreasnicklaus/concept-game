module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    // '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    quotes: 0,
    'quote-props': 0,
    'spaces-before-function-paren': 0,
    'no-trailing-spaces': ["error", {
      skipBlankLines: true,
      ignoreComments: true
    }]
  }
}
