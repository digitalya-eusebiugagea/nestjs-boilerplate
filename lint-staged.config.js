module.exports = {
  '*.{js,ts}': 'eslint --ignore-path .gitignore --fix',
  '**/*.ts': () => 'npm run type-check',
  '*.{json,jsonc,less,scss,sass,css,html,mdx}': 'prettier --ignore-path .gitignore --write',
  'package.json': 'npx sort-package-json',
};
