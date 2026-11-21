// 規則の強さ
const CONFIGS = {
  OFF: 'off',
  WARN: 'warn',
  ERROR: 'error',
};

// テストと、Storybook の見本のファイル
export const TEST_FILES = ['**/*.test.{ts,tsx}', 'jest.setup.ts'];
export const STORY_FILES = ['**/*.stories.{ts,tsx}', '.storybook/**/*.{ts,tsx}'];

export default CONFIGS;
