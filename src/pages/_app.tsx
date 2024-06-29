import 'the-new-css-reset/css/reset.css';
import type { AppProps } from 'next/app';
import { GlobalStyles } from '~/shared/styles/GlobalStyles';

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <GlobalStyles />
    <Component {...pageProps} />
  </>
);

export default App;
