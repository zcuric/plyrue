'use strict';

module.exports = {
  root: true,
  extends: '@extensionengine',
  rules: {
    'vue/component-definition-name-casing': 0
  },
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
