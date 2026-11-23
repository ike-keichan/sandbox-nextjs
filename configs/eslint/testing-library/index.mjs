import eslintPluginTestingLibrary from 'eslint-plugin-testing-library';

import { TEST_FILES } from '../const/index.mjs';

// Testing Library の使い方の規則。テストのファイルにだけ適用する
/**
@type {import('eslint').Linter.Config[]}
*/
export default [
  {
    files: TEST_FILES,
    ...eslintPluginTestingLibrary.configs['flat/react'],
  },
  {
    files: TEST_FILES,
    rules: {
      // 操作は、fireEvent ではなく、userEvent で行う（実際の操作に近い）
      'testing-library/prefer-user-event': 'error',
    },
  },
];
