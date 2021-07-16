<script>
  import Header from "./_Header.svelte"
  import Footer from "./_Footer.svelte"
</script>

<svelte:head>
  <link type="application/rss+xml" rel="alternate" title="Honai's Blog" href="/blog/rss.xml" />
</svelte:head>
<Header />
<slot />
<Footer />
