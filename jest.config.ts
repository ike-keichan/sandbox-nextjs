import nextJest from 'next/jest.js';

import type { Config } from 'jest';

// Next.js の設定（next.config.ts、環境変数、TypeScript の変換）を、Jest に引き継ぐ
const createJestConfig = nextJest({ dir: './' });

const config: Config = {
  roots: ['<rootDir>/src'],
  // ブラウザの代わりになる環境で、テストを動かす
  testEnvironment: 'jest-environment-jsdom',
  // テストの前に、毎回読み込むファイル
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['**/*.test.{ts,tsx}'],
  // ~/ で始まる読み込みを、src/ の下に対応させる
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  // テストが通ったコードの割合を調べる対象
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.stories.tsx', '!src/pages/_*.tsx'],
};

export default createJestConfig(config);
