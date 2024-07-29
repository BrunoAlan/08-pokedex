module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        jsxSingleQuote: true,
        trailingComma: 'es5',
        arrowParens: 'always',
        printWidth: 80,
      },
    ],
  },
};
