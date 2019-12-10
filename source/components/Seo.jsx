export const Seo = ({ meta }) => (
  <>
    <link rel="icon" href="/favicon.ico" />
    <title>{meta.title}</title>
    <meta name="description" content={meta.description} />
    <meta property="og:url" content={meta.siteUrl} />
    <meta property="og:title" content={meta.title} />
    <meta property="og:description" content={meta.description} />
    <meta property="og:image" content={meta.ogpImageUrl} />
    <meta property="fb:app_id" content="1144529745735811" />
    <meta property="og:locale" content="ja_JP" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={meta.siteUrl} />
    <meta name="twitter:description" content={meta.description} />
    <meta name="twitter:image" content={meta.ogpImageUrl} />
    <meta name="twitter:image:alt" content="profile icon" />
  </>
)
