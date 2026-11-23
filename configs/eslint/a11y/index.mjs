import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';

// アクセシビリティの規則
// Next.js の公式の設定は、この道具の規則を、一部しか有効にしていない。勧められている規則を、すべて有効にする。
// 道具（プラグイン）そのものは、Next.js の公式の設定が登録しているので、ここでは規則だけを足す。
/**
@type {import('eslint').Linter.Config[]}
*/
export default [
  {
    rules: {
      ...eslintPluginJsxA11y.flatConfigs.recommended.rules,
    },
  },
];
