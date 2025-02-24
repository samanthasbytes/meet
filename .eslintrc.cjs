module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true // For Node.js-specific globals like require and process
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'jest'],
  rules: {
    'no-unused-vars': 'off',
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ]
  },
  overrides: [
    {
      files: ['src/__tests__/**/*'],
      env: {
        jest: true
      },
      extends: ['plugin:jest/recommended'],
      plugins: ['jest']
    }
  ]
};
