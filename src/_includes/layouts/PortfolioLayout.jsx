import * as AC from "../components/AvoidCache";
import { Seo } from "../components/Seo";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import VerticalGrow from "../components/VerticalGrow";

const asyncStylesheets = ["https://use.typekit.net/bdo3rru.css"];
const preconnectDomains = [
  "https://p.typekit.net",
  "https://res.cloudinary.com",
];

/**
 * @param {Object} props
 * @param {string} [props.subTitle]
 * @param {string} [props.description] 空文字ならdescriptionなし、undefならデフォルトのテキスト
 * @param {string} props.pageUrl Absolute page path, "page.url" in data cascade
 * @param {string} [props.thumbnailUrl]
 * @param {boolean} [props.noSeo]
 * @param {string} [props.headerMaxWidth]
 * @param {import("../../../types").TwitterCardPlayer} [props.twitterCard]
 * @param {any} props.children
 */
export const PortfolioLayout = ({
  subTitle,
  description,
  pageUrl,
  thumbnailUrl,
  noSeo,
  headerMaxWidth,
  twitterCard,
  children,
}) => {
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        {!noSeo && (
          <Seo
            title={!!subTitle ? `${subTitle} | honai.me` : "honai.me"}
            description={description ?? "honaiのポートフォリオ・ブログ"}
            pageUrl={pageUrl}
            thumbnailUrl={thumbnailUrl}
            twitterCard={twitterCard}
          />
        )}
        {preconnectDomains.map((domain) => (
          <link rel="preconnect" href={domain} />
        ))}

        <AC.Link rel="stylesheet" href="/index.css" />
        <link rel="preload" as="image" href="/images/open_in_new.svg" />

        {/* 遅延読み込みするStyleSheet */}
        {asyncStylesheets.map((href) => (
          <link
            rel="preload"
            as="style"
            href={href}
            // @ts-ignore
            onLoad="this.onload=null;this.rel='stylesheet'"
          />
        ))}
        <noscript>
          {asyncStylesheets.map((href) => (
            <link rel="stylesheet" href={href} />
          ))}
        </noscript>

        {/* theme-toggle */}
        <script type="module" src="/scripts/theme-toggle.js"></script>
      </head>

      <body>
        <VerticalGrow>
          <Header maxWidth={headerMaxWidth || "72rem"} />
          <VerticalGrow.Grow>{children}</VerticalGrow.Grow>
          <Footer />
        </VerticalGrow>
      </body>
    </html>
  );
};
