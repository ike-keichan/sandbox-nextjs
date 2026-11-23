import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  // JSX を変換する
  plugins: [react()],
  resolve: {
    // tsconfig.json の paths（~/ で始まる読み込み）を、テストでも使えるようにする
    tsconfigPaths: true,
  },
  test: {
    // ブラウザの代わりになる環境で、テストを動かす
    environment: 'jsdom',
    // テストの前に、毎回読み込むファイル
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    css: {
      // CSS のファイルを、テストでも実際に読み込む。
      // 読み込まないと、CSS に書いていないクラスの名前でも、テストが通ってしまう。
      include: [/\.css$/],
      modules: {
        // CSS Modules のクラスの名前を、書いたとおりの名前にする。
        // こうすると、テストで toHaveClass('primary') のように確かめられる。
        classNameStrategy: 'non-scoped',
      },
    },
    coverage: {
      // テストが通ったコードの割合を調べる対象
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.stories.tsx', 'src/**/*.test.tsx', 'src/app/**'],
    },
  },
});
