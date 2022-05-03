import { Seo } from "../components/Seo";
import { css } from "../style.mjs";
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
 * @param {boolean} [props.noSeo]
 * @param {any} props.children
 */
export const PortfolioLayout = ({
  subTitle,
  description,
  pageUrl,
  noSeo,
  children,
}) => {
  return (
    <html lang="ja">
      <head>
        {!noSeo && (
          <Seo
            title={!!subTitle ? `${subTitle} | honai.me` : "honai.me"}
            description={description ?? "honaiのポートフォリオ・ブログ"}
            pageUrl={pageUrl}
          />
        )}
        {preconnectDomains.map((domain) => (
          <link rel="preconnect" href={domain} />
        ))}

        <link rel="stylesheet" href="/index.css" />

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
        <script type="module" src="/scripts/theme-toggle.mjs"></script>
      </head>

      <body>
        <VerticalGrow>
          <Header />
          <VerticalGrow.Grow>{children}</VerticalGrow.Grow>
          <Footer />
        </VerticalGrow>
      </body>
    </html>
  );
};
