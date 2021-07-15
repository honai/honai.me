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
  /** @type {import('$lib/posts').Post} */
  export let post
  const { title } = post.meta
</script>

<h1>{title}</h1>
<nav><a href="/blog">BLOG</a></nav>
<main>{@html post.content}</main>
