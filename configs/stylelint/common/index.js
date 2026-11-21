module.exports = {
  rules: {
    //　!importantの使用禁止
    'declaration-no-important': true,
    // セレクタのネストを２レベルまで許可
    'max-nesting-depth': 2,
    // 指定したCSSプロパティを使用禁止
    'property-disallowed-list': ['all', 'background', 'flex', 'font'],
    // セレクタの特定性が前に記述されたセレクタよりも低くなることを禁止
    // stylelint-config-recommendedではtrue
    // 場合によってはnullにしても良さそう。
    // 'no-descending-specificity': null,
  },
};
