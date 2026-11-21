import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat();

/** @type {import('eslint').Linter.FlatConfig} */
export default {
  // TODO: Flat Config非対応のためcompatでラップする。対応後に修正すること。
  ...compat.extends('plugin:testing-library/react'),
  rules: {},
};
