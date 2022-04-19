import { ThemeToggle } from "./components/ThemeToggle";
import { useEleventy } from "./EleventyContext";
import { Seo } from "./Seo";

const asyncStylesheets = [
  "/styles/index.css",
  "https://use.typekit.net/bdo3rru.css",
];
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
  const { sassinline } = useEleventy();
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

        {/* 同期で読み込むStyleSheet */}
        <link
          rel="stylesheet"
          href="/styles/theme-dark.css"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="stylesheet"
          href="/styles/theme-light.css"
          media="(prefers-color-scheme: light)"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: sassinline("_portfolio-critical.scss"),
          }}
        />

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
      </head>

      <body class="body-layout">
        <div class="center">
          <header class="portfolio-header">
            <h2 className="title">
              <a href="/" className="_uncolor">
                honai.me
              </a>
            </h2>
            <ThemeToggle />
          </header>
          <main class="main-content">{children}</main>
        </div>
        <footer class="site-footer">
          &copy; 2022 Honai Ueoka
          <br />
          Powered by{" "}
          <a
            href="https://www.11ty.dev/"
            target="_blank"
            rel="noopener"
            class="_uncolor"
          >
            Eleventy
          </a>
        </footer>
      </body>
    </html>
  );
};
