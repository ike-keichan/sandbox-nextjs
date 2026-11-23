import CONFIGS from '../const/index.mjs';

const { ERROR } = CONFIGS;

// 読み込んではいけないものの規則
/**
@type {import('eslint').Linter.Config[]}
*/
export default [
  {
    rules: {
      'no-restricted-imports': [
        ERROR,
        {
          patterns: [
            {
              // 部品は、フォルダの名前で読み込む（~/components/Button）。中のファイルを、直接読み込まない
              group: ['~/components/*/*'],
              message:
                '部品は、フォルダの名前で読み込む（例: ~/components/Button）。中のファイルを、直接読み込まない。',
            },
          ],
        },
      ],
    },
  },
];
