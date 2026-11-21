import CONFIGS, { STORY_FILES, TEST_FILES } from '../const/index.mjs';

const { OFF, WARN, ERROR } = CONFIGS;

// ESLint に最初から入っている規則
/**
@type {import('eslint').Linter.Config[]}
*/
export default [
  {
    rules: {
      // 入れ子の深さは、3段まで
      'max-depth': [WARN, 3],
      // コールバックの入れ子は、3段まで
      'max-nested-callbacks': [WARN, 3],
      // 1つの関数の文は、15個まで
      'max-statements': [WARN, 15],
      // 意味の分からない数値を、直接書かない（-1、0、1 は除く）
      'no-magic-numbers': [WARN, { ignore: [-1, 0, 1] }],
      // console.log を残さない
      'no-console': WARN,
      // 分岐の数は、10個まで
      complexity: [ERROR, 10],
    },
  },
  // 設定のファイルは、設定のオブジェクトを、そのまま export default してよい
  {
    files: ['*.config.{mjs,ts}', 'configs/**/*.mjs', '.storybook/**/*.{ts,tsx}'],
    rules: {
      'import/no-anonymous-default-export': OFF,
      'no-magic-numbers': OFF,
    },
  },
  // テストと見本では、数値や文の数を気にしない
  {
    files: [...TEST_FILES, ...STORY_FILES],
    rules: {
      'max-nested-callbacks': OFF,
      'max-statements': OFF,
      'no-magic-numbers': OFF,
    },
  },
];
