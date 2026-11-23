import eslintPluginVitest from '@vitest/eslint-plugin';

import { TEST_FILES } from '../const/index.mjs';

// Vitest のテストの書き方の規則。テストのファイルにだけ適用する
/**
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  {
    files: TEST_FILES,
    ...eslintPluginVitest.configs.recommended,
  },
];
