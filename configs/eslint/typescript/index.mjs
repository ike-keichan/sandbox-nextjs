import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.FlatConfig} */
export default {
  plugins: {
    '@typescript-eslint': tseslint.plugin,
  },
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  rules: {},
};
