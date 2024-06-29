import eslintPluginJest from 'eslint-plugin-jest';

/** @type {import('eslint').Linter.FlatConfig} */
export default {
  plugins: {
    jest: eslintPluginJest,
  },
  ...eslintPluginJest.configs['flat/recommended'],
  rules: {},
};
