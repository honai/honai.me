import { Children, FC, TwitterCard } from "../../types.js";
import { AdSrc } from "../components/Adsense.js";
import { Seo } from "../components/Seo.js";

const defaultAsyncStyles = ["https://use.typekit.net/bdo3rru.css"];
const preconnectDomains = [
  "https://p.typekit.net",
  "https://res.cloudinary.com",
];

interface Props {
  title: string;
  description: string;
  thumbnailUrl: string;
  twitterCard: TwitterCard;
  lazyStylesheets?: string[];
  adsense?: boolean;
  children: Children;
}

export const BaseHtml: FC<Props> = ({
  title,
  description,
  thumbnailUrl,
  twitterCard,
  lazyStylesheets,
  adsense,
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

        <link rel="stylesheet" href="/styles/index.css" />
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
        {adsense && <AdSrc />}
      </head>
      <body>
        <>{children}</>
      </body>
    </html>
  );
};
