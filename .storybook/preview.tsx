import { GlobalStyles } from '../src/shared/styles/GlobalStyles';

import type { Preview } from '@storybook/nextjs';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    // アクセシビリティの問題を見つけたら、エラーにする
    a11y: {
      test: 'error',
    },
    // このプロジェクトは、Pages Router を使う
    nextjs: {
      appDirectory: false,
    },
  },
  // すべての見本に、全体のスタイルを適用する
  decorators: [
    (Story) => (
      <>
        <GlobalStyles />
        <Story />
      </>
    ),
  ],
  // 部品の説明のページを、自動で作る
  tags: ['autodocs'],
};

export default preview;
