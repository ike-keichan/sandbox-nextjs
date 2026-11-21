import eslintPluginImportX from 'eslint-plugin-import-x';

import CONFIGS from '../const/index.mjs';

const { ERROR } = CONFIGS;

// import の書き方の規則
// eslint-plugin-import の後継の eslint-plugin-import-x を使う（ESLint 10 に対応している）。
/**
@type {import('eslint').Linter.Config[]}
*/
export default [
  {
    plugins: {
      'import-x': eslintPluginImportX,
    },
    rules: {
      // import を、種類ごとにまとめて、アルファベット順に並べる
      'import-x/order': [
        ERROR,
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'type'],
          pathGroups: [{ pattern: '~/**', group: 'internal' }],
          'newlines-between': 'always',
          alphabetize: { order: 'asc' },
        },
      ],
      // 同じファイルからの import を、1つにまとめる
      'import-x/no-duplicates': ERROR,
      // import は、ファイルの先頭に書く
      'import-x/first': ERROR,
      // import のあとは、1行空ける
      'import-x/newline-after-import': ERROR,
    },
  },
];
