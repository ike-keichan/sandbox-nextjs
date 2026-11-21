import eslintPluginSecurity from 'eslint-plugin-security';

import CONFIGS from '../const/index.mjs';

const { OFF } = CONFIGS;

// 安全でない書き方の規則
/**
@type {import('eslint').Linter.Config[]}
*/
export default [
  eslintPluginSecurity.configs.recommended,
  {
    rules: {
      // object[key] の形を、すべて警告する規則。型で確かめている場合にも警告するので、無効にする
      'security/detect-object-injection': OFF,
    },
  },
];
