import '~/shared/styles/globals.css';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

// ページの題名と説明。検索結果や、ブラウザのタブに表示される。
export const metadata: Metadata = {
  title: 'sandbox-nextjs',
  description: 'Next.js のプロジェクトのひな形',
};

type RootLayoutProps = {
  children: ReactNode;
};

/**
 * すべてのページに共通の枠組み
 */
const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="ja">
    <body>{children}</body>
  </html>
);

export default RootLayout;
