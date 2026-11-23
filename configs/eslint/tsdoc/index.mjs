import eslintPluginTsdoc from 'eslint-plugin-tsdoc';

import CONFIGS from '../const/index.mjs';

const { WARN } = CONFIGS;

// 説明のコメント（TSDoc）の書き方の規則
/**
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      tsdoc: eslintPluginTsdoc,
    },
    rules: {
      // TSDoc の書き方に、誤りがないか
      'tsdoc/syntax': WARN,
    },
  },
];
