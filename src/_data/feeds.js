const path = require('path')
const fs = require('fs/promises')
const crypto = require('crypto')

const { XMLParser } = require('fast-xml-parser')

const RSS_FEEDS = [
  "https://blog.camph.net/author/honai/feed/"
]

module.exports = async () => {
  const parser = new XMLParser()
  const notFlat = await Promise.all(RSS_FEEDS.map(async url => {
    const cacheFile = path.join(__dirname, `${url2hash(url)}.xml`)
    await cacheUrl(url, cacheFile)
    const xmlStr = await fs.readFile(cacheFile, { encoding: "utf-8" })
    const parsed = parser.parse(xmlStr)
    return rss2posts(parsed)
  }))
  return notFlat.flat(1).sort((a, b) => b.pubDate - a.pubDate)
}

function rss2posts(parsed) {
  return parsed.rss.channel.item.map(item => ({
    title: item.title,
    link: item.link,
    pubDate: new Date(item.pubDate)
  }))
}

async function cacheUrl(url, cacheFile) {
  const { got } = await import('got')
  if (await isFileFresh(cacheFile)) {
    return
  }
  console.log(`cache for ${url} is old, refetching`)
  const data = await got.get(url)
  await fs.writeFile(cacheFile, data.body, { encoding: "utf-8" })
}

/** 1時間以内に更新されたかチェック */
async function isFileFresh(file) {
  try {
    const { mtime } = await fs.stat(file)
    const diff = mtime - new Date()
    if (diff <= 1000 * 60 * 60) {
      return true
    }
    return false
  } catch (error) {
    if (error.code === "ENOENT") {
      return false
    }
    throw error
  }
}

function url2hash(url) {
  return crypto.createHash('md5')
               .update(url, "binary")
               .digest('hex')
               .slice(0, 5)
}
