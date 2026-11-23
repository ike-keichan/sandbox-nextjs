import eslintPluginSonarjs from 'eslint-plugin-sonarjs';

import CONFIGS, { TEST_FILES } from '../const/index.mjs';

const { OFF } = CONFIGS;

// バグになりやすい書き方と、分かりにくい書き方の規則
/**
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  eslintPluginSonarjs.configs.recommended,
  {
    files: TEST_FILES,
    rules: {
      // テストでは、同じ文字列を何度も書いてよい
      'sonarjs/no-duplicate-string': OFF,
    },
  },
];
