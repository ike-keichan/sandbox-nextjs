import eslintPluginStrictDependencies from 'eslint-plugin-strict-dependencies';
import CONFIGS from '../const/index.mjs';

const { ERROR } = CONFIGS;

/** @type {import('eslint').Linter.FlatConfig} */
export default {
  plugins: {
    'strict-dependencies': eslintPluginStrictDependencies,
  },
  rules: {
    // 特定のファイルのimport先を指定、誤ったimportがないか判別
    'strict-dependencies/strict-dependencies': [ERROR, []],
  },
};
