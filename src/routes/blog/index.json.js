import { listPosts } from "$lib/posts"

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get() {
  const posts = listPosts()
  return {
    body: { posts },
  }
}
