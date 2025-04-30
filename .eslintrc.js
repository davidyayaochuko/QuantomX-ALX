module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react'],
    extends: [
      'react-app',
      'react-app/jest',
      'plugin:@typescript-eslint/recommended'
    ],
    rules: {
      // Add specific rules to ignore Tailwind CSS class errors
      'max-len': 'off',
      'no-restricted-syntax': 'off'
    }
  };