// Tailwind CSS のための規則
export default {
  rules: {
    // Tailwind CSS の書き方（@theme、@utility など）を許す
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'theme',
          'utility',
          'variant',
          'custom-variant',
          'source',
          'plugin',
          'apply',
          'reference',
        ],
      },
    ],
    // @import "tailwindcss" の書き方を許す（標準の規則は、url() の形を求める）
    'import-notation': 'string',
    // 変数の名前は、ケバブケース（--color-primary）で書く。
    // 「--color-*」のような、まとめて指定する書き方（Tailwind CSS の決まった書き方）も許す
    'custom-property-pattern': [
      String.raw`^([a-z][a-z0-9]*)(-[a-z0-9]+)*(-\*)?$`,
      { message: '変数の名前は、ケバブケースで書く（例: --color-primary）' },
    ],
  },
};
