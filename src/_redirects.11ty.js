// Cloudflare Pages Redirects
// https://developers.cloudflare.com/pages/platform/redirects/

const redirects = [
  { from: "/rss", to: "/blog/rss.xml" },
  { from: "/blog/20:year/:slug", to: "/blog/post/:slug" },
  { from: "/post/*", to: "/blog/post/:splat" },
];

class Redirects {
  data() {
    return {
      permalink: "/_redirects",
    };
  }
  render() {
    return redirects.map(({ from, to }) => `${from} ${to} 301`).join("\n");
  }
}

module.exports = Redirects;
