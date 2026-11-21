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
];
