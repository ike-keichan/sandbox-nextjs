import eslintPluginsSonarjs from 'eslint-plugin-sonarjs';

/** @type {import('eslint').Linter.FlatConfig} */
export default {
  plugins: {
    sonarjs: eslintPluginsSonarjs,
  },
  ...eslintPluginsSonarjs.configs.recommended,
  rules: {},
};
