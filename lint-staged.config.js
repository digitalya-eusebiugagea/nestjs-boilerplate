module.exports = {
  '*.{js,ts}': ['eslint --fix', 'eslint'],
  '**/*.ts': () => 'npm run check-types',
  '*.{json,jsonc,less,scss,sass,css,html,mdx}': ['prettier --write'],
  'package.json': 'npx sort-package-json',
};
