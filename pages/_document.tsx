import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  public render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head>
          <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.GA_TRACKING_ID}');
                  `
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
