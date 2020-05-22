'use strict';

module.exports = {
  root: true,
  extends: '@extensionengine',
  overrides: [
    {
      files: ['src/**'],
      parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
      }
    },
    {
      files: ['tests/**'],
      parserOptions: {
        sourceType: 'module'
      },
      env: {
        jest: true
      }
    },
    {
      files: ['example/**'],
      parserOptions: {
        sourceType: 'module'
      }
    }
  ]
};
