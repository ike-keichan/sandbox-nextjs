import { GlobalStyles } from '~/shared/styles/GlobalStyles';

import type { AppProps } from 'next/app';

/**
 * すべてのページに共通の処理
 */
const App = ({ Component, pageProps }: AppProps) => (
  <>
    <GlobalStyles />
    <Component {...pageProps} />
  </>
);

export default App;
