// SPDX-FileCopyrightText: Meta Platforms, Inc. and its affiliates
// SPDX-FileCopyrightText: TNG Technology Consulting GmbH <https://www.tngtech.com>
// SPDX-FileCopyrightText: Leslie Lazzarino <leslie.lazzarino@tngtech.com>
// SPDX-FileCopyrightText: Benedikt Richter <benedikt.richter@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: ['tsconfig.json', 'ash-tree/tsconfig.json'],
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'plugin:react-hooks/recommended',
    'plugin:testing-library/react',
    'plugin:jest-dom/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  plugins: ['react', 'prettier', 'testing-library', 'jest-dom', 'filenames'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-explicit-any': 2,
    '@typescript-eslint/no-unused-vars': 2,
    '@typescript-eslint/explicit-function-return-type': 2,
    '@typescript-eslint/await-thenable': 2,
    '@typescript-eslint/require-await': 2,
    '@typescript-eslint/no-unnecessary-type-assertion': 2,
    'object-shorthand': 2,
    'react/prop-types': 'off',
    'filenames/match-regex': [2, '^[a-zA-Z0-9\\-]+(.d|.test)?$', true],
    quotes: [2, 'single', { avoidEscape: true }],
  },
};
