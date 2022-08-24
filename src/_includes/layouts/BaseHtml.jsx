import { Seo } from "../components/Seo";

const defaultAsyncStyles = ["https://use.typekit.net/bdo3rru.css"];
const preconnectDomains = [
  "https://p.typekit.net",
  "https://res.cloudinary.com",
];

/**
 * @param {import("../../../types").BaseHtmlProps} props
 */
export const BaseHtml = ({
  title,
  description,
  thumbnailUrl,
  twitterCard,
  lazyStylesheets,
  children,
}) => {
  const asyncStylesheets = defaultAsyncStyles.concat(lazyStylesheets || []);
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <Seo
          title={title}
          description={description}
          thumbnailUrl={thumbnailUrl}
          twitterCard={twitterCard}
        />
        {preconnectDomains.map((domain) => (
          <link rel="preconnect" href={domain} />
        ))}

        <link rel="stylesheet" href="/index.css" />
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
        <script type="module" src="/js/common.js"></script>
      </head>
      <body>{children}</body>
    </html>
  );
};
