import eslintPluginTestingLibrary from 'eslint-plugin-testing-library';

/** @type {import('eslint').Linter.FlatConfig} */
export default {
  plugins: {
    'testing-library': eslintPluginTestingLibrary,
  },
  ...eslintPluginTestingLibrary.configs['react'],
  rules: {},
};
