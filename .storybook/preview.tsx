import '../src/shared/styles/globals.css';

import type { Preview } from '@storybook/nextjs-vite';

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
    // このプロジェクトは、App Router を使う
    nextjs: {
      appDirectory: true,
    },
  },
  // 部品の説明のページを、自動で作る
  tags: ['autodocs'],
};

export default preview;
