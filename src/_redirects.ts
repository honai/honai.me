// Cloudflare Pages Redirects
// https://developers.cloudflare.com/pages/platform/redirects/

const redirects = [
  { from: "/rss", to: "/blog/rss.xml" },
  { from: "/blog/20:year/:slug", to: "/blog/post/:slug/" },
  { from: "/blog/20:year/:slug/", to: "/blog/post/:slug/" },
  { from: "/post/*", to: "/blog/post/:splat" },
];

export default redirects.map(({ from, to }) => `${from} ${to} 308`).join("\n");
