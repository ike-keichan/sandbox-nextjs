import CONFIGS from '../const/index.mjs';

const { ERROR } = CONFIGS;

// TypeScript の書き方の規則
// 道具（プラグイン）そのものは、Next.js の公式の設定が登録しているので、ここでは規則だけを足す。
/**
@type {import('eslint').Linter.Config[]}
*/
export default [
  {
    files: ['**/*.{ts,tsx,mts}'],
    rules: {
      // 型だけを読み込むときは、import type を使う
      '@typescript-eslint/consistent-type-imports': ERROR,
    },
  },
];
