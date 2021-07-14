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
  import Seo from "$lib/Seo.svelte"

  const title = "Honai's Blog"

  export let posts = []
</script>

<Seo {title} />

<h1>{title}</h1>
<p><a href="/">Home</a></p>
<ul>
  {#each posts as p (p.params.slug)}
    <li><a href={`/blog/${p.params.year}/${p.params.slug}`}>{p.title}</a></li>
  {/each}
</ul>
