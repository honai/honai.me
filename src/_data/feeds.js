const path = require("path");
const fs = require("fs/promises");
const crypto = require("crypto");

const { XMLParser } = require("fast-xml-parser");

const RSS_FEEDS = [
  {
    feedUrl: "https://blog.camph.net/author/honai/feed/",
    getPosts: (parsed) =>
      parsed.rss.channel.item.map((item) => {
        const size = "200";
        return {
          title: item.title,
          url: item.link,
          date: new Date(item.pubDate),
          thumb:
            item["media:content"]["@_url"].split("?")[0] +
            `?fit=${size}%2C${size}`,
          source: {
            title: "CAMPHOR- Blog",
            url: "https://blog.camph.net/author/honai/",
          },
        };
      }),
  },
];

module.exports = async () => {
  const parser = new XMLParser({ ignoreAttributes: false });
  const notFlat = await Promise.all(
    RSS_FEEDS.map(async ({ feedUrl, getPosts }) => {
      const cacheFile = path.join(__dirname, `${url2hash(feedUrl)}.xml`);
      await cacheUrl(feedUrl, cacheFile);
      const xmlStr = await fs.readFile(cacheFile, { encoding: "utf-8" });
      const parsed = parser.parse(xmlStr);
      return getPosts(parsed);
    })
  );
  return notFlat.flat(1).sort((a, b) => b.date.getTime() - a.date.getTime());
};

async function cacheUrl(url, cacheFile) {
  const { got } = await import("got");
  if (await isFileFresh(cacheFile)) {
    return;
  }
  console.log(`cache for ${url} is old, refetching`);
  const data = await got.get(url);
  await fs.writeFile(cacheFile, data.body, { encoding: "utf-8" });
}

/**
 * 1時間以内に更新されたかチェック
 * @param {string} file - フルパス
 */
async function isFileFresh(file) {
  try {
    const { mtime } = await fs.stat(file);
    const diff = new Date().getTime() - mtime.getTime();
    if (diff <= 1000 * 60 * 60) {
      return true;
    }
    return false;
  } catch (error) {
    if (error.code === "ENOENT") {
      return false;
    }
    throw error;
  }
}

/** @param {string} url */
function url2hash(url) {
  return crypto
    .createHash("md5")
    .update(url, "binary")
    .digest("hex")
    .slice(0, 5);
}
