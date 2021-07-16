<script context="module">
  export const hydrate = true
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page: { params }, fetch }) {
    const url = `/blog/post/${params.slug}.json`
    const res = await fetch(url)
    if (res.ok) {
      const { post } = await res.json()
      return {
        props: { post },
      }
    }
  }
</script>

<script>
  import { onMount } from "svelte"
  import Seo from "$lib/components/Seo.svelte"
  import ArticleHero from "./_ArticleHero.svelte"
  import PostMd from "./_PostMd.svelte"
  import Toc from "$lib/components/Toc/index.svelte"

  /** @type {import('$lib/posts').Post} */
  export let post
  const { title, date, updated, slug, description, ogImageUrl } = post.meta
  const path = `/blog/post/${slug}`
  const { toc, tocIDs } = post

  onMount(() => {
    ;(adsbygoogle = window.adsbygoogle || []).push({})
    const replaceClass = "language-unknown"
    for (const e of document.querySelectorAll(`.${replaceClass}`)) {
      e.classList.replace(replaceClass, "language-text")
    }
  })
</script>

<Seo title={`${title} | Honai's Blog`} {path} {description} {ogImageUrl} />
<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/themes/prism-tomorrow.min.css"
    integrity="sha512-vswe+cgvic/XBoF1OcM/TeJ2FW0OofqAVdCZiEYkd6dwGXthvkSFWOoGGJgS2CW70VK5dQM5Oh+7ne47s74VTg=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
    media="print"
    onload="this.media='all'"
  />
</svelte:head>

<article class="layout">
  <div class="header">
    <ArticleHero {title} {date} {updated} />
  </div>
  <aside class="aside">
    <div class="sticky">
      <nav>
        <Toc {toc} {tocIDs} />
      </nav>
    </div>
  </aside>
  <main class="main">
    <PostMd html={post.contentHtml} />
  </main>
  <div class="ad">
    <!-- 記事の下 -->
    <ins
      class="adsbygoogle"
      style="display:block"
      data-ad-client="ca-pub-9155380222623167"
      data-ad-slot="4880052047"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  </div>
</article>

<style lang="scss">
  @use "src/variables" as v;
  .layout {
    padding: 1rem;

    @media screen and (min-width: v.$break_lg) {
      width: 100%;
      display: grid;
      justify-content: center;
      grid-template-areas:
        "header header"
        "main   aside"
        "ad     .";
      grid-template-columns: minmax(0, 1fr) 30rem;
      grid-template-rows: 18rem auto auto;
      gap: 2rem 4rem;

      > .header {
        grid-area: header;
        max-width: 72rem;
        margin: auto;
      }
      > .aside {
        grid-area: aside;
      }
      > .main {
        grid-area: main;
      }

      > .aside > .sticky {
        position: sticky;
        top: 0;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 2.4rem;
      }

      > .ad {
        grid-area: ad;
        margin: 1rem;
      }
    }

    @media screen and (min-width: v.$break-xl) {
      grid-template-columns: 84rem 30rem;
    }
  }
</style>
