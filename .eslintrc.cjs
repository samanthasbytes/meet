module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true, // For Node.js-specific globals like require and process
  },
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: {
    react: { version: '18.2' },
    jest: {
      globalAliases: {
        describe: ['defineFeature'],
      },
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['react-refresh'],
  rules: {
    'no-unused-vars': 'off',
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
  overrides: [
    {
      files: ['**/*.test.js'],
      env: {
        jest: true,
      },
      extends: ['plugin:jest/recommended'],
      plugins: ['jest'],
      rules: {
        'jest/no-standalone-expect': 'off',
        'jest/expect-expect': 'off',
      },
    },
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
};
