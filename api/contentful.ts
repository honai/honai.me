/* eslint-disable @typescript-eslint/no-var-requires */
const contentfulSdk = require('contentful')
const contentful = contentfulSdk.createClient({
  space: process.env.CTF_SPACE_ID,
  accessToken: process.env.CTF_ACCESSTOKEN
})

export default contentful

export function getBlogPosts(limit: number, skip: number) {
  return contentful.getEntries({
    // eslint-disable-next-line @typescript-eslint/camelcase
    content_type: 'blogPosts',
    limit: limit,
    skip: skip
  })
}

export interface GetEntries {
  items: Post[]
}

export interface Post {
  sys: {
    id: string
    createdAt: string
    updatedAt: string
  }
  fields: {
    slug: string
    title: string
    content: string
  }
}
