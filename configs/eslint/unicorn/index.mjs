import eslintPluginUnicorn from 'eslint-plugin-unicorn';

/** @type {import('eslint').Linter.FlatConfig} */
export default {
  plugins: {
    unicorn: eslintPluginUnicorn,
  },
  ...eslintPluginUnicorn.configs['flat/recommended'],
  rules: {},
};
