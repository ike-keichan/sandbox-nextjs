import eslintPluginUnicorn from 'eslint-plugin-unicorn';

import CONFIGS from '../const/index.mjs';

const { OFF } = CONFIGS;

// 新しい書き方と、読みやすい書き方の規則
/**
@type {import('eslint').Linter.Config[]}
*/
export default [
  eslintPluginUnicorn.configs.recommended,
  {
    rules: {
      // 部品のファイル名は、部品の名前に合わせる（Button.tsx）
      'unicorn/filename-case': OFF,
      // props、ref などの、React でふつうに使う短い名前を許す
      'unicorn/prevent-abbreviations': OFF,
      // props、ref などの名前を、長い名前に直させる規則。上と同じ理由で無効にする
      'unicorn/name-replacements': OFF,
      // React では、何も表示しないときに null を返す
      'unicorn/no-null': OFF,
      // ページの部品は、const で定義してから、最後に export default する（ほかの部品と書き方をそろえる）
      'unicorn/default-export-style': OFF,
    },
  },
];
