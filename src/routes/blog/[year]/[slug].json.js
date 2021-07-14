import { findSinglePost } from "$lib/posts"

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params }) {
  const post = await findSinglePost(params.slug)
  if (!post) {
    return
  }
  return { body: { post } }
}
