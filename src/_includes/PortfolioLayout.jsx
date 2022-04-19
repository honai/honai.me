import { useEleventy } from "./EleventyContext";
import { Seo } from "./Seo";

const asyncStylesheets = ["/style.css", "https://use.typekit.net/bdo3rru.css"];
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
        {asyncStylesheets.map((href) => (
          <link
            rel="preload"
            as="style"
            href={href}
            // @ts-ignore
            onLoad="this.rel='stylesheet';"
          />
        ))}
        <style
          dangerouslySetInnerHTML={{
            __html: sassinline("portfolio-critical.scss"),
          }}
        />
        <noscript>
          {asyncStylesheets.map((href) => (
            <link rel="stylesheet" href={href} />
          ))}
        </noscript>
      </head>

      <body class="body-layout">
        <main class="main-content">{children}</main>
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
