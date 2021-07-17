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
  import Seo from "$lib/components/Seo.svelte"
  import ArticleHero from "./_ArticleHero.svelte"
  import PostMd from "./_PostMd.svelte"
  import Toc from "$lib/components/Toc/index.svelte"
  import LinkCss from "$lib/components/LinkCss.svelte"
  import { onMount } from "svelte"

  /** @type {import('$lib/posts').Post} */
  export let post
  const { title, date, updated, slug, description, ogImageUrl, filePath } = post.meta
  const path = `/blog/post/${slug}`
  const { toc, tocIDs } = post
  onMount(() => {
    window.adsbygoogle = window.adsbygoogle || []
    window.adsbygoogle.push({})
  })
</script>

<Seo title={`${title} | Honai's Blog`} {path} {description} {ogImageUrl} />
<LinkCss
  href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/themes/prism-tomorrow.min.css"
  integrity="sha512-vswe+cgvic/XBoF1OcM/TeJ2FW0OofqAVdCZiEYkd6dwGXthvkSFWOoGGJgS2CW70VK5dQM5Oh+7ne47s74VTg=="
/>
<LinkCss
  href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.13.11/katex.min.css"
  integrity="sha512-J8je2SgrCzA7hNBeiCJiA6oETHTTdp3We3EriOgJp6POycGLcDXj5dSwWlAPQcYGeaQ4N3uf30aOg/Nt5pxW2g=="
  async
/>

<article class="layout">
  <div class="header">
    <ArticleHero {title} {date} {updated} />
  </div>
  <aside class="aside">
    <div class="sticky">
      <Toc {toc} {tocIDs} />
      <div>
        <a href={`https://github.com/honai/honai.me/blob/main/${filePath}`}>この記事の編集をリクエスト (GitHub)</a>
      </div>
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
