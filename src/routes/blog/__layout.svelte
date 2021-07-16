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
<div>
  <script
    async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9155380222623167"
    crossorigin="anonymous"></script>
</div>
