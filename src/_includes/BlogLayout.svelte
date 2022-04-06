<script>
  import Script from "./Script.svelte";
  import Seo from "./Seo.svelte";

  export let pageUrl;
  export let title;
  export let description;
  /** @type {{href: string, integrity: string, async?: boolean}[]} */
  export let styleSheets = [];
  export let ogImageUrl = null;
</script>

<svelte:head>
  <base href={pageUrl} />
  {#each styleSheets as { href, integrity, async }}
    {#if async}
      <link
        rel="preload"
        as="style"
        {href}
        {integrity}
        crossOrigin="anonymous"
        onload="this.rel='stylesheet';"
      />
    {:else}
      <link rel="stylesheet" {href} {integrity} crossOrigin="anonymous" />
    {/if}
  {/each}
  <!-- TODO: async fallback -->
  <link
    rel="stylesheet"
    href="https://use.typekit.net/bdo3rru.css"
    media="print"
    onload="this.media='all'"
  />
  <link rel="stylesheet" href="/blog.css" />
</svelte:head>
<Seo {pageUrl} {title} {description} {ogImageUrl} />

<slot />

<Script
  type="application/json"
  className="external-scripts-list"
  js={`
    [
      "https://www.google-analytics.com/analytics.js",
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9155380222623167"
    ]
  `}
/>
<Script
  js={`
    // polyfill
    if (!window.requestIdleCallback) {
      window.requestIdleCallback = (cb) => {
        window.setTimeout(cb, 1)
      }
    }
    window.requestIdleCallback(() => {
      const elms = document.getElementsByClassName('external-scripts-list')
      const scripts = Array.from(elms).map(e => JSON.parse(e.textContent)).flat()
      scripts.map(s => {
        var e = document.createElement('script')
        e.src = s
        document.body.appendChild(e)
      })
      window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
      ga('create', '{{ gtag_id | safe }}', 'auto');
      ga('send', 'pageview');
      (adsbygoogle = window.adsbygoogle || []).push({});
    })
  `}
/>
