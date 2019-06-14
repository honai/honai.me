import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  public render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head>
          <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
