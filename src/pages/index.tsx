import Head from 'next/head';

import { HomePage } from '~/features/home/HomePage';

/**
 * トップページ
 *
 * ページのファイルには、題名と、中身の部品の呼び出しだけを書く。
 */
const IndexPage = () => (
  <>
    <Head>
      <title>sandbox-nextjs</title>
      <meta content="Next.js のプロジェクトのひな形" name="description" />
    </Head>
    <HomePage />
  </>
);

export default IndexPage;
