import { Seo } from "../components/Seo";
import { css } from "../style.mjs";
import { Footer } from "../components/Footer";

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
 * @param {any} props.children
 */
export const PortfolioLayout = ({
  subTitle,
  description,
  pageUrl,
  children,
}) => {
  return (
    <html lang="ja">
      <head>
        <Seo
          title={!!subTitle ? `${subTitle} | honai.me` : "honai.me"}
          description={description ?? "honaiのポートフォリオ・ブログ"}
          pageUrl={pageUrl}
        />
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
        <div
          class={css({
            padding: "1rem",
            maxWidth: "calc(720px + 2rem)",
            margin: "0 auto",
          })()}
        >
          <main
            class={css({
              display: "flex",
              flexFlow: "column nowrap",
              gap: "3rem",
            })()}
          >
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
};
