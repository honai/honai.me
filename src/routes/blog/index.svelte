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

  /** @type {import("$lib/posts").PostMeta[]} */
  export let posts = []
  const title = "Honai's Blog"
</script>

<Seo {title} />

<h1>{title}</h1>
<p><a href="/">Home</a></p>
<ul>
  {#each posts as p (p.slug)}
    <li><a href={`/blog/post/${p.slug}`}>{p.title}</a></li>
  {/each}
</ul>
