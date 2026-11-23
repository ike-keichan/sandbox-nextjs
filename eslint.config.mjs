import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';
import eslintConfigPrettier from 'eslint-config-prettier';

import eslintConfigA11y from './configs/eslint/a11y/index.mjs';
import eslintConfigCommon from './configs/eslint/common/index.mjs';
import eslintConfigImport from './configs/eslint/import/index.mjs';
import eslintConfigJest from './configs/eslint/jest/index.mjs';
import eslintConfigRestrictedImports from './configs/eslint/restricted-imports/index.mjs';
import eslintConfigSecurity from './configs/eslint/security/index.mjs';
import eslintConfigSonarjs from './configs/eslint/sonarjs/index.mjs';
import eslintConfigStorybook from './configs/eslint/storybook/index.mjs';
import eslintConfigStrictDependencies from './configs/eslint/strict-dependencies/index.mjs';
import eslintConfigTestingLibrary from './configs/eslint/testing-library/index.mjs';
import eslintConfigTsdoc from './configs/eslint/tsdoc/index.mjs';
import eslintConfigTypeScript from './configs/eslint/typescript/index.mjs';
import eslintConfigUnicorn from './configs/eslint/unicorn/index.mjs';

// 規則のまとまりごとに、configs/eslint/ の下のファイルに分けている。
// 下に書いたものほど優先される。書式に関する規則を無効にする Prettier の設定は、最後に置く。
export default defineConfig([
  // 検査の対象から外すもの（自動で作られるファイル）
  globalIgnores(['.next/**', 'coverage/**', 'storybook-static/**', 'next-env.d.ts']),
  // ESLint が勧める規則
  js.configs.recommended,
  // Next.js の公式の設定（React、React Hooks、Next.js、TypeScript の規則と、アクセシビリティの規則の一部を含む）
  ...nextCoreWebVitals,
  ...nextTypeScript,
  ...eslintConfigA11y,
  ...eslintConfigTypeScript,
  ...eslintConfigRestrictedImports,
  ...eslintConfigCommon,
  ...eslintConfigImport,
  ...eslintConfigStrictDependencies,
  ...eslintConfigSonarjs,
  ...eslintConfigUnicorn,
  ...eslintConfigSecurity,
  ...eslintConfigTsdoc,
  ...eslintConfigJest,
  ...eslintConfigTestingLibrary,
  ...eslintConfigStorybook,
  eslintConfigPrettier,
]);
