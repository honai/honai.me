const Feed = require('feed').Feed

class Rss {
  data() {
    return {
      permalink: 'blog/rss.xml'
    }
  }
  render(data) {
    const domain = 'https://www.honai.me'
    const feed = new Feed({
      title: "Honai's Blog",
      link: `${domain}/`,
      description: 'ほないのブログです',
      id: `${domain}/`,
      copyright: '2021 Honai Ueoka'
    })
    for (const post of data.collections.posts.sort((a, b) => b.date - a.date)) {
      const url = `${domain}${post.url.slice(0, -1)}`
      feed.addItem({
        title: post.data.title,
        id: url,
        link: url,
        date: post.date,
        description: post.data.description,
        image: post.data.og_image_url
      })
    }
    return feed.rss2()
  }
}

module.exports = Rss
