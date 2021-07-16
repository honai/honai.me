<script context="module">
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
  import Toc from "./_Toc.svelte"
  /** @type {import('$lib/posts').Post} */
  export let post
  const { title } = post.meta
  const { toc } = post
</script>

<h1>{title}</h1>
<nav>
  <ol>
    {#each toc as item (item.id)}
      <Toc toc={item} />
    {/each}
  </ol>
</nav>
<main>{@html post.contentHtml}</main>
