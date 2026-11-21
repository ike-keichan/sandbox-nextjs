import globals from 'globals';
import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

import eslintConfigCommon from './configs/eslint/common/index.mjs';
import eslintConfigTypeScript from './configs/eslint/typescript/index.mjs';
import eslintConfigNext from './configs/eslint/next/index.mjs';
import eslintConfigImport from './configs/eslint/import/index.mjs';
import eslintConfigStrictDependencies from './configs/eslint/strict-dependencies/index.mjs';
import eslintConfigSonarjs from './configs/eslint/sonarjs/index.mjs';
import eslintConfigUnicorn from './configs/eslint/unicorn/index.mjs';
import eslintConfigSecurity from './configs/eslint/security/index.mjs';
import eslintConfigJest from './configs/eslint/jest/index.mjs';
import eslintConfigTestingLibrary from './configs/eslint/testing-library/index.mjs';
import eslintConfigStorybook from './configs/eslint/storybook/index.mjs';
import eslintConfigTsdoc from './configs/eslint/tsdoc/index.mjs';

const compat = new FlatCompat();

/** @type {import('eslint').Linter.FlatConfig[]} */
const eslintFlatConfigs = [
  // ファイルの設定
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    ignores: ['node_modules', './pnpm-lock.yaml'],
  },
  // ESLintの設定
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        ...globals.nodeBuiltin,
        ...globals.browser,
      },
    },
    // TODO: eslint-plugin-importはまだFlat Config非対応のためsettingを設定する。対応後に修正すること。
    // TODO: 参考になるissue URL:https://github.com/import-js/eslint-plugin-import/issues/2556
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  // extendの設定
  eslint.configs.recommended,
  // TODO: Flat Config非対応のためcompatでラップする。対応後に修正すること。
  // ...compat.extends('airbnb'),
  ...compat.extends('airbnb/hooks'),
  eslintConfigCommon,
  // eslintConfigTypeScript,
  // eslintConfigNext,
  eslintConfigImport,
  eslintConfigStrictDependencies,
  eslintConfigSonarjs,
  eslintConfigUnicorn,
  eslintConfigSecurity,
  eslintConfigJest,
  // eslintConfigTestingLibrary,
  eslintConfigStorybook,
  eslintConfigTsdoc,
  eslintConfigPrettier,
];

export default eslintFlatConfigs;
