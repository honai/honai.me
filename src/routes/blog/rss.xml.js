import { listPosts } from "$lib/posts"
import { Feed } from "feed"

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get() {
  const posts = listPosts()
  const baseUrl = "https://www.honai.me/blog"
  const feed = new Feed({
    title: "Honai's Blog",
    link: `${baseUrl}/`,
    description: "ほないのブログです",
    id: `${baseUrl}/`,
    copyright: "Honai Ueoka",
  })
  for (const post of posts) {
    const canonicalUrl = `${baseUrl}/post/${post.slug}/`
    feed.addItem({
      title: post.title,
      id: canonicalUrl,
      link: canonicalUrl,
      date: new Date(post.date),
      description: post.description,
      image: post.ogImageUrl || "https://www.honai.me/images/profile.png",
    })
  }
  return { headers: { "Content-Type": "application/rss+xml" }, body: feed.rss2() }
}
