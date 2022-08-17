import { useEleventy } from "../EleventyContext";

/**
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.description
 * @param {string} props.thumbnailUrl  // ドメインなしの絶対パス指定可
 * @param {import("../../../types").TwitterCard} props.twitterCard
 */
export const Seo = ({ title, description, thumbnailUrl, twitterCard }) => {
  const { page, SITE_DOMAIN, eleventy } = useEleventy();
  const canonicalUrl = `https://${SITE_DOMAIN}${page.url}`;
  const ogpImageUrl = ogpImage(thumbnailUrl, SITE_DOMAIN);
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

      <TwitterCard card={twitterCard} />

      <link rel="icon" href="/favicon.ico" />
      <meta name="generator" content={eleventy.generator} />
    </>
  );
};

/**
 * @param {Object} p
 * @param {import("../../../types").TwitterCard} p.card
 */
const TwitterCard = ({ card }) => {
  const common = <meta name="twitter:site" content="@_honai" />;
  switch (card.kind) {
    case "normal":
      return (
        <>
          {common}
          <meta name="twitter:card" content="summary" />
        </>
      );
    case "large":
      return (
        <>
          {common}
          <meta name="twitter:card" content="summary_large_image" />
        </>
      );
    case "player":
      return (
        <>
          {common}
          <meta name="twitter:card" content="player" />
          <meta name="twitter:player" content={card.iframeUrl} />
          <meta name="twitter:player:width" content={card.width.toString()} />
          <meta name="twitter:player:height" content={card.height.toString()} />
        </>
      );
    default:
      throw new Error("Unknown TwitterCard kind");
  }
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
