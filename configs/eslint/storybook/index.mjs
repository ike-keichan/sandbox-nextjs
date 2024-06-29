import eslintPluginStorybook from 'eslint-plugin-storybook';

/** @type {import('eslint').Linter.FlatConfig} */
export default {
  plugins: {
    storybook: eslintPluginStorybook,
  },
  ...eslintPluginStorybook.FlatConfig,
  rules: {},
};
