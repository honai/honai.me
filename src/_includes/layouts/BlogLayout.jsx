import { Script } from "../components/Script";
import { Seo } from "../components/Seo";
import * as AC from "../components/AvoidCache";

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
        <link
          rel="stylesheet"
          href="https://use.typekit.net/bdo3rru.css"
          media="print"
          // @ts-ignore
          onload="this.media='all'"
        />
        <AC.Link rel="stylesheet" href="/index.css" />
        <AC.Script type="module" src="/scripts/theme-toggle.js" />
      </head>

      <body>{children}</body>
    </html>
  );
};
