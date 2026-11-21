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
    files: ['vitest.setup.ts'],
    rules: {
      // テストのあとの片付け（cleanup）は、ふつうは自動で行われる。
      // このプロジェクトは、Vitest の関数を、毎回 import して使う設定にしている。
      // その場合は自動で行われないので、vitest.setup.ts で、手で呼んでいる。
      'testing-library/no-manual-cleanup': 'off',
    },
  },
];
