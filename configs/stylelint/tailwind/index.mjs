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
  },
};
