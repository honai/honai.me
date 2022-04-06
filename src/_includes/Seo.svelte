<script>
  export let title;
  export let pageUrl;
  export let description;
  export let ogImageUrl = null;
  if (!pageUrl.startsWith("/")) {
    throw new Error(`Invalid pageUrl: ${pageUrl}`);
  }
  if (!!ogImageUrl && !/^https?:\/\//.test(ogImageUrl)) {
    throw new Error(`Invalid ogp image url: ${ogImageUrl}`);
  }
  const canonicalUrl = `https://www.honai.me${pageUrl}`;
  const isLargeCard = !!ogImageUrl;
  const ogImage = ogImageUrl || "https://www.honai.me/images/profile.png";
</script>

<svelte:head>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <link rel="canonical" href={canonicalUrl} />
  <title>{title}</title>
  {#if !!description}
    <meta name="description" content={description} />
  {/if}

  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:title" content={title} />
  {#if !!description}
    <meta property="og:description" content={description} />
  {/if}
  <meta property="og:image" content={ogImage} />
  <meta property="fb:app_id" content="1144529745735811" />
  <meta property="og:locale" content="ja_JP" />

  <meta
    name="twitter:card"
    content={isLargeCard ? "summary_large_image" : "summary"}
  />
  <meta name="twitter:site" content="@_honai" />

  <link rel="icon" href="/favicon.ico" />
</svelte:head>
