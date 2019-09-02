import { ServerResponse, ClientRequest } from 'http'
import generateFeed from '../../api/feeder'
import { getAllBlogPosts } from '../../api/contentful'

export default (_req: ClientRequest, res: ServerResponse): void => {
  getAllBlogPosts().then((ctfRes): void => {
    const feed = generateFeed(ctfRes.items)
    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
    res.end(feed.rss2())
  })
}
