/* eslint-disable @typescript-eslint/camelcase */
import { createClient, Entry, EntryCollection } from 'contentful'

const contentful = createClient({
  space: process.env.CTF_SPACE_ID,
  accessToken: process.env.CTF_ACCESSTOKEN
})

export default contentful

export type Post = Entry<PostFields>

export interface PostFields {
  slug: string
  title: string
  content: string
}

export function getBlogPosts(limit: number, skip: number): Promise<EntryCollection<PostFields>> {
  return contentful.getEntries<PostFields>({
    content_type: 'blogPost',
    limit: limit,
    skip: skip
  })
}

export async function getBlogPostBySlug(slug: string): Promise<Post | null> {
  const response = await contentful.getEntries<PostFields>({
    content_type: 'blogPost',
    'fields.slug': slug
  })
  console.log(response)
  return response.total === 1 ? response.items[0] : null
}
