import { Feed } from "feed";
import { Post } from "./blog/post/posts.js";

export default (posts: Post[], domain: string) => {
  const feed = new Feed({
    title: "Honai's Blog",
    link: `https://${domain}/`,
    description: "ほないのブログです",
    id: `https://${domain}/`,
    copyright: "Honai Ueoka",
  });
  for (const post of posts.sort(
    (a, b) => b.date.valueOf() - a.date.valueOf()
  )) {
    const canonicalUrl = `https://${domain}/blog/post/${post.slug}/`;
    feed.addItem({
      title: post.title,
      id: canonicalUrl,
      link: canonicalUrl,
      date: post.date,
      description: post.description,
      image: post.thumbnail_url,
    });
  }
  return feed.rss2();
};
