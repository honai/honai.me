<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ fetch }) {
    const url = `/blog.json`
    const res = await fetch(url)
    if (!res.ok) {
      return
    }
    const { posts } = await res.json()
    return {
      props: { posts },
    }
  }
</script>

<script>
  import Seo from "$lib/components/Seo.svelte"
  import { onMount } from "svelte"
  import PostListItem from "./_PostListItem.svelte"

  /** @type {import("$lib/posts").PostMeta[]} */
  export let posts = []
  const title = "Honai's Blog"

  onMount(() => {
    var adsbygoogle = window.adsbygoogle || []
    adsbygoogle.push({})
  })
</script>

<Seo {title} description="Latest posts from Honai's Blog" path="/blog" />
<svelte:head>
  <link type="application/rss+xml" rel="alternate" title="Honai's Blog" href="/blog/rss.xml" />
  <script
    defer
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9155380222623167"
    crossorigin="anonymous"></script>
</svelte:head>

<div class="layout">
  <h1>{title}</h1>
  <ul class="post-list">
    {#each posts as post (post.slug)}
      <PostListItem {post} />
    {/each}
  </ul>
  <!-- ブログ記事一覧下 -->
  <ins
    class="adsbygoogle"
    style="display:block"
    data-ad-client="ca-pub-9155380222623167"
    data-ad-slot="3792188932"
    data-ad-format="auto"
    data-full-width-responsive="true"
  />
</div>

<style>
  .layout {
    width: 100%;
    max-width: 720px;
    margin: 0 auto;
    padding: 0 20px 20px;
  }
  h1 {
    text-align: center;
    font-family: var(--font-family-century);
    font-weight: var(--font-weight-century);
    padding: 4.8rem 0;
  }
  .post-list {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-flow: column;
    gap: 3.6rem;
  }
</style>
