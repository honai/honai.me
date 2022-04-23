import { PortfolioHeader } from "./_includes/components/PortfolioHeader";
import { css } from "./_includes/style.mjs";

export const data = {
  permalink: "404.html",
};

export default () => {
  const title = "404 Not Found";
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://use.typekit.net/bdo3rru.css" />
        <link rel="stylesheet" href="/index.css" />
        <script type="module" src="/scripts/theme-toggle.mjs"></script>
      </head>
      <body>
        <div class={css({ maxWidth: "72rem", margin: "2rem auto" })()}>
          <PortfolioHeader title={title} />
        </div>
      </body>
    </html>
  );
};
