import eslintPluginTsdoc from 'eslint-plugin-tsdoc';
import CONFIGS from '../const/index.mjs';

const { WARN } = CONFIGS;

/** @type {import('eslint').Linter.FlatConfig} */
export default {
  plugins: {
    tsdoc: eslintPluginTsdoc,
  },
  rules: {
    // TSDocの構文エラーがないか判別
    'tsdoc/syntax': WARN,
  },
};
