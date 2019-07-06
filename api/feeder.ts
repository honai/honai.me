/* eslint-disable @typescript-eslint/camelcase */
import { Feed } from 'feed'
import markdownIt from 'markdown-it'
import { Item as FeedItem } from 'feed/lib/typings'
import { Post } from './contentful'

const md = new markdownIt({ html: true })

const siteUrl = 'https://honai.me'

function newFeed(date: Date): Feed {
  return new Feed({
    id: siteUrl,
    title: 'honai.me',
    copyright: '2019 Honai Ueoka',
    description: 'Webエンジニアになりたい大学生のブログです。',
    updated: date,
    link: siteUrl,
    feedLinks: {
      atom: `${siteUrl}/feed`,
      rss: `${siteUrl}/rss`
    },
    author: {
      name: 'Honai Ueoka'
    }
  })
}

function contentfulItemsToFeedOptions(items: Post[]): FeedItem[] {
  const sortedItems = items.sort(
    (a, b): number => {
      const dateA = Date.parse(a.fields.customPublishedAt || a.sys.createdAt)
      const dateB = Date.parse(b.fields.customPublishedAt || b.sys.createdAt)
      return dateB - dateA
    }
  )
  return sortedItems.map(
    (item): FeedItem => ({
      title: item.fields.title,
      link: `${siteUrl}/blog/post/${item.fields.slug}`,
      date: new Date(item.fields.customPublishedAt || item.sys.createdAt),
      description: md.render(item.fields.content)
    })
  )
}

function generateFeed(items: Post[]): Feed {
  const itemOptions = contentfulItemsToFeedOptions(items)
  const feed = newFeed(itemOptions.slice(-1)[0].date)
  itemOptions.forEach(
    (option): void => {
      feed.addItem(option)
    }
  )
  return feed
}

export default generateFeed
