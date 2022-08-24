const Feed = require("feed").Feed;

class Rss {
  data() {
    return {
      permalink: "blog/rss.xml",
    };
  }
  render(data) {
    const domain = data.SITE_DOMAIN;
    const feed = new Feed({
      title: "Honai's Blog",
      link: `https://${domain}/`,
      description: "ほないのブログです",
      id: `https://${domain}/`,
      copyright: "Honai Ueoka",
    });
    for (const post of data.collections.posts.sort((a, b) => b.date - a.date)) {
      const canonicalUrl = `https://${domain + post.url}`;
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
