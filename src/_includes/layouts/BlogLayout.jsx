import { Script } from "../components/Script";
import { Seo } from "../components/Seo";

const GTAG_ID = "UA-137251140-3";

/**
 * @typedef {Object} StyleSheet
 * @prop {string} href
 * @prop {string} integrity
 * @prop {boolean} [async]
 */

/**
 * @param {Object} props
 * @param {string} props.pageUrl
 * @param {string} props.title
 * @param {string} props.description
 * @param {StyleSheet[]} [props.styleSheets]
 * @param {string} [props.thumbnailUrl]
 * @param {any} props.children
 */
export const BlogLayout = ({
  pageUrl,
  title,
  description,
  thumbnailUrl,
  styleSheets,
  children,
}) => {
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <Seo
          pageUrl={pageUrl}
          title={title}
          description={description}
          thumbnailUrl={thumbnailUrl}
        />
        <link
          rel="alternate"
          href="/blog/rss.xml"
          type="application/rss+xml"
          title="Honai's Blog"
        />
        {/* 相対画像のため。deprecated */}
        <base href={pageUrl} />
        {(styleSheets || []).map(({ href, integrity, async }) =>
          async ? (
            <link
              rel="preload"
              as="style"
              href={href}
              integrity={integrity}
              crossOrigin="anonymous"
              // @ts-ignore
              onLoad="this.rel='stylesheet';"
            />
          ) : (
            <link
              rel="stylesheet"
              href={href}
              integrity={integrity}
              crossOrigin="anonymous"
            />
          )
        )}
        {/* TODO: async fallback */}
        <link
          rel="stylesheet"
          href="https://use.typekit.net/bdo3rru.css"
          media="print"
          // @ts-ignore
          onload="this.media='all'"
        />
        <link rel="stylesheet" href="/index.css" />
        <script type="module" src="/scripts/theme-toggle.js"></script>
      </head>

      <body>
        {children}

        <Script type="application/json" class="external-scripts-list">{`
          [
            "https://www.google-analytics.com/analytics.js",
            "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9155380222623167"
          ]
        `}</Script>
        <Script>{`
          // polyfill
          if (!window.requestIdleCallback) {
            window.requestIdleCallback = (cb) => {
              window.setTimeout(cb, 1)
            }
          }
          window.requestIdleCallback(() => {
            const elms = document.getElementsByClassName('external-scripts-list')
            const scripts = Array.from(elms).map(e => JSON.parse(e.textContent)).flat()
            scripts.map(s => {
              var e = document.createElement('script')
              e.src = s
              document.body.appendChild(e)
            })
            window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
            ga('create', '${GTAG_ID}', 'auto');
            ga('send', 'pageview');
            (adsbygoogle = window.adsbygoogle || []).push({});
          })
        `}</Script>
      </body>
    </html>
  );
};
