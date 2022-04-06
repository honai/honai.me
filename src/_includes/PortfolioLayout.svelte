<script>
  import { getJsFuncs } from "./SvelteContext.svelte";
  import Seo from "./Seo.svelte";

  const asyncStylesheets = [
    "/style.css",
    "https://use.typekit.net/bdo3rru.css",
  ];
  const preconnectDomains = [
    "https://p.typekit.net",
    "https://res.cloudinary.com",
  ];

  export let subTitle = undefined;
  /** @param {string} 空文字ならdescriptionなし、undefならデフォルトのテキスト */
  export let description = undefined;
  export let pageUrl;
  const { sassinline } = getJsFuncs();
  const inlineStyle = `<style>${sassinline(
    "portfolio-critical.scss"
  )}<\/style>`;
</script>

<svelte:head>
  {#each preconnectDomains as domain}
    <link rel="preconnect" href={domain} />
  {/each}
  {#each asyncStylesheets as href}
    <link rel="preload" as="style" {href} onload="this.rel='stylesheet';" />
  {/each}
  {@html inlineStyle}
  <noscript>
    {#each asyncStylesheets as href}
      <link rel="stylesheet" {href} />
    {/each}
  </noscript>
</svelte:head>
<Seo
  title={!!subTitle ? `${subTitle} | honai.me` : "honai.me"}
  description={description ?? "honaiのポートフォリオ・ブログ"}
  {pageUrl}
/>

<div class="body-layout">
  <main class="main-content"><slot /></main>
  <footer class="site-footer">
    &copy; 2022 Honai Ueoka
    <br />
    Powered by
    <a
      href="https://www.11ty.dev/"
      target="_blank"
      rel="noopener"
      class="_uncolor"
    >
      Eleventy
    </a>
  </footer>
</div>
