// CSS の書き方の規則
export default {
  rules: {
    // !important を使わない
    'declaration-no-important': true,
    // セレクタの入れ子は、2段まで
    'max-nesting-depth': 2,
    // まとめて指定するプロパティを使わない（どの値を変えているのかが、分かりにくくなるため）
    'property-disallowed-list': ['all', 'background', 'flex', 'font'],
  },
};
