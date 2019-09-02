import { ServerResponse, ClientRequest } from 'http'
import generateFeed from '../../lib/feeder'
import { getAllBlogPosts } from '../../lib/contentful'

export default (_req: ClientRequest, res: ServerResponse): void => {
  getAllBlogPosts().then((ctfRes): void => {
    const feed = generateFeed(ctfRes.items)
    res.setHeader('Content-Type', 'application/atom+xml; charset=utf-8')
    res.end(feed.atom1())
  })
}
