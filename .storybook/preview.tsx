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
    // アクセシビリティの問題を、Storybook の画面の「Accessibility」の欄に、エラーとして表示する。
    // 色の差（コントラスト）は、ここで確かめる（単体テストでは、調べられない）。
    // この検査は、Storybook の画面を開いたときにだけ動く。自動テストでは、動かない。
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
