import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  public render(): JSX.Element {
    const trackingId = location.hostname === 'honai.me' ? process.env.GA_TRACKING_ID : ''
    return (
      <Html lang="ja">
        <Head>
          <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${trackingId}');
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
