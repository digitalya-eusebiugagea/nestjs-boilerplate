module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "prettier/prettier": [
      "error",
      {
        "jsxSingleQuote": true,
        "singleQuote": true,
        "semi": true,
        "tabWidth": 2,
        "trailingComma": "all",
        "printWidth": 100,
        "bracketSameLine": false,
        "useTabs": false,
        "arrowParens": "always",
        "endOfLine": "auto"
      }
    ],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
