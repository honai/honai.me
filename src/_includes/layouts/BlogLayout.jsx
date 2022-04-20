import { Script } from "../Script";
import { Seo } from "../Seo";

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
 * @param {string} [props.ogImageUrl]
 * @param {any} props.children
 */
export const BlogLayout = ({
  pageUrl,
  title,
  description,
  ogImageUrl,
  styleSheets,
  children,
}) => {
  return (
    <html lang="ja">
      <head>
        <Seo
          pageUrl={pageUrl}
          title={title}
          description={description}
          og_image_url={ogImageUrl}
        />
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
        <link rel="stylesheet" href="/styles/blog.css" />
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
            ga('create', '{{ gtag_id | safe }}', 'auto');
            ga('send', 'pageview');
            (adsbygoogle = window.adsbygoogle || []).push({});
          })
        `}</Script>
      </body>
    </html>
  );
};
