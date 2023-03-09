module.exports = {
  parser: '@typescript-eslint/parser', // Allows Eslint to understand TypeScript syntax.
  parserOptions: {
    project: 'tsconfig.json',
    ecmaVersion: 2021, // ECMAScript version supported in the project.
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin', 
    "import", // Support linting for import/export syntax
    "simple-import-sort", // Plugin for sorting imports in file.
    "unused-imports" // Plugin for removing unused imports
  ],
  extends: [
    "eslint:recommended", // Eslint recommended configuration by eslint.
    "plugin:import/recommended", // Linting of ES2015+ import/export syntax.
    'plugin:@typescript-eslint/recommended', // Turns on rules from TypeScript-specific plugin.
    'plugin:prettier/recommended', // Turns off all rules that are unnecessary or might conflict with Prettier.
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts"] // use typescript-eslint parser for .ts files.
    },
    "import/resolver": {
      "typescript": {
        "project": "./tsconfig.json",
        "alwaysTryTypes": true // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`.
      }
    }
  },
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
    "import/first": "warn",
    "import/newline-after-import": "warn",
    "import/no-duplicates": "error",
    "import/no-named-as-default-member": "off",
    "@typescript-eslint/comma-dangle": "off", // Avoid conflict rule between Eslint and Prettier
    "@typescript-eslint/consistent-type-imports": "error", // Ensure `import type` is used when it's necessary
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "import/prefer-default-export": "off", // Named export is easier to refactor automatically
    "simple-import-sort/imports": "warn", // Import configuration for `eslint-plugin-simple-import-sort`
    "simple-import-sort/exports": "warn", // Export configuration for `eslint-plugin-simple-import-sort`
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "no-restricted-imports": "off",
    "@typescript-eslint/no-restricted-imports": "warn"
  },
};
