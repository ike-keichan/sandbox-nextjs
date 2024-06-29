import eslintPluginsSecurity from 'eslint-plugin-security';

/** @type {import('eslint').Linter.FlatConfig} */
export default {
  plugins: {
    security: eslintPluginsSecurity,
  },
  ...eslintPluginsSecurity.configs.recommended,
  rules: {},
};
