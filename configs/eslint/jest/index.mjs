import eslintPluginJest from 'eslint-plugin-jest';

import { TEST_FILES } from '../const/index.mjs';

// Jest のテストの書き方の規則。テストのファイルにだけ適用する
/**
@type {import('eslint').Linter.Config[]}
*/
export default [
  {
    files: TEST_FILES,
    ...eslintPluginJest.configs['flat/recommended'],
  },
  {
    files: TEST_FILES,
    ...eslintPluginJest.configs['flat/style'],
  },
];
