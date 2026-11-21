import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

import type { DocumentContext, DocumentInitialProps } from 'next/document';

/**
すべてのページに共通の枠組み（html と body）

styled-components のスタイルを、サーバーの側で作る HTML に含めている。
含めないと、ページを開いた直後に、スタイルのない状態が一瞬見えてしまう。
*/
class AppDocument extends Document {
  static override async getInitialProps(context: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = context.renderPage;

    try {
      context.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await super.getInitialProps(context);

      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }

  override render() {
    return (
      <Html lang="ja">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
