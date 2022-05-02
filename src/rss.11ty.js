const Feed = require("feed").Feed;

class Rss {
  data() {
    return {
      permalink: "blog/rss.xml",
    };
  }
  render(data) {
    const domain = "https://www.honai.me";
    const feed = new Feed({
      title: "Honai's Blog",
      link: `${domain}/`,
      description: "ほないのブログです",
      id: `${domain}/`,
      copyright: "Honai Ueoka",
    });
    for (const post of data.collections.posts.sort((a, b) => b.date - a.date)) {
      const canonicalUrl = domain + post.url;
      feed.addItem({
        title: post.data.title,
        id: canonicalUrl,
        link: canonicalUrl,
        date: post.date,
        description: post.data.description,
        image: post.data.thumbnail_url,
      });
    }
    return feed.rss2();
  }
}

module.exports = Rss;
