/**
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.pageUrl
 * @param {string} props.description
 * @param {string} [props.og_image_url]
 */
export const Seo = ({ title, pageUrl, description, og_image_url }) => {
  if (!pageUrl.startsWith("/")) {
    throw new Error(`Invalid pageUrl: ${pageUrl}`);
  }
  if (!!og_image_url && !/^https?:\/\//.test(og_image_url)) {
    throw new Error(`Invalid ogp image url: ${og_image_url}`);
  }
  const canonicalUrl = `https://www.honai.me${pageUrl}`;
  const isLargeCard = !!og_image_url;
  const ogImage = og_image_url || "https://www.honai.me/images/profile.png";
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

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
