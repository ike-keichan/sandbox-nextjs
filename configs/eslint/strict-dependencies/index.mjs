import eslintPluginStrictDependencies from 'eslint-plugin-strict-dependencies';

import CONFIGS from '../const/index.mjs';

const { ERROR } = CONFIGS;

// どのディレクトリから、どのディレクトリを読み込んでよいかの規則
// 依存の向きを、pages → features → components → shared の一方向に保つ。
/**
@type {import('eslint').Linter.Config[]}
*/
export default [
  {
    plugins: {
      'strict-dependencies': eslintPluginStrictDependencies,
    },
    rules: {
      'strict-dependencies/strict-dependencies': [
        ERROR,
        [
          // ページは、ほかのどこからも読み込まない
          {
            module: 'src/pages',
            allowReferenceFrom: [],
            allowSameModule: false,
          },
          // ページの中身（features）は、ページからだけ読み込む
          {
            module: 'src/features',
            allowReferenceFrom: ['src/pages'],
            allowSameModule: true,
          },
          // 部品は、ページの中身と、ほかの部品からだけ読み込む
          {
            module: 'src/components',
            allowReferenceFrom: ['src/features', 'src/components'],
            allowSameModule: true,
          },
        ],
        { resolveRelativeImport: true },
      ],
    },
  },
];
