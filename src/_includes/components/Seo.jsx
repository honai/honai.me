import { useEleventy } from "../EleventyContext";

/**
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.pageUrl
 * @param {string} props.description
 * @param {import("../../../types").TwitterCardPlayer} [props.twitterCard]
 * @param {string} [props.thumbnailUrl]
 */
export const Seo = ({ title, description, thumbnailUrl, twitterCard }) => {
  const { page, SITE_DOMAIN } = useEleventy();
  const canonicalUrl = `https://${SITE_DOMAIN}${page.url}`;
  const isLargeCard = !!thumbnailUrl;
  const ogpImageUrl = thumbnailUrl
    ? ogpImage(thumbnailUrl, SITE_DOMAIN)
    : `https://${SITE_DOMAIN}/images/profile.png`;
  return (
    <>
      <link rel="canonical" href={canonicalUrl} />
      <title>{title}</title>
      {!!description && <meta name="description" content={description} />}

      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      {!!description && (
        <meta property="og:description" content={description} />
      )}
      <meta property="og:image" content={ogpImageUrl} />
      <meta property="fb:app_id" content="1144529745735811" />
      <meta property="og:locale" content="ja_JP" />

      {twitterCard && twitterCard.kind === "player" ? (
        <>
          <meta name="twitter:card" content="player" />
          <meta name="twitter:player" content={twitterCard.iframeUrl} />
          <meta
            name="twitter:player:width"
            content={twitterCard.width.toString()}
          />
          <meta
            name="twitter:player:height"
            content={twitterCard.height.toString()}
          />
        </>
      ) : (
        <meta
          name="twitter:card"
          content={isLargeCard ? "summary_large_image" : "summary"}
        />
      )}
      <meta name="twitter:site" content="@_honai" />

      <link rel="icon" href="/favicon.ico" />
    </>
  );
};

/** @param {string} url @param {string} domain */
function ogpImage(url, domain) {
  if (/^https?:\/\//.test(url)) {
    return url;
  }
  if (url.startsWith("/")) {
    return `https://${domain}${url}`;
  }
  throw Error(`Invalid OGP Image: ${url}`);
}
