/**
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.pageUrl
 * @param {string} props.description
 * @param {string} [props.thumbnailUrl]
 */
export const Seo = ({ title, pageUrl, description, thumbnailUrl }) => {
  if (!pageUrl) {
    return;
  }
  if (!pageUrl.startsWith("/")) {
    throw new Error(`Invalid pageUrl: ${pageUrl}`);
  }
  const canonicalUrl = `https://www.honai.me${pageUrl}`;
  const isLargeCard = !!thumbnailUrl;
  const ogImage = thumbnailUrl
    ? ogpImage(thumbnailUrl)
    : "https://www.honai.me/images/profile.png";
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
      <meta property="og:image" content={ogImage} />
      <meta property="fb:app_id" content="1144529745735811" />
      <meta property="og:locale" content="ja_JP" />

      <meta
        name="twitter:card"
        content={isLargeCard ? "summary_large_image" : "summary"}
      />
      <meta name="twitter:site" content="@_honai" />

      <link rel="icon" href="/favicon.ico" />
    </>
  );
};

/** @param {string} url */
function ogpImage(url) {
  if (/^https?:\/\//.test(url)) {
    return url;
  }
  if (url.startsWith("/")) {
    return `https://www.honai.me${url}`;
  }
  throw Error(`Invalid OGP Image: ${url}`);
}
