/* eslint-disable @typescript-eslint/camelcase */
import { createClient, Entry, EntryCollection, Asset } from 'contentful'

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
  customPublishedAt: string
  customUpdatedAt: string
}

export function getBlogPosts(limit: number, skip: number): Promise<EntryCollection<PostFields>> {
  return contentful.getEntries<PostFields>({
    content_type: 'blogPost',
    limit: limit,
    skip: skip,
    order: 'sys.createdAt'
  })
}

export function getAllBlogPosts(): Promise<EntryCollection<PostFields>> {
  return contentful.getEntries<PostFields>({
    content_type: 'blogPost'
  })
}

export async function getBlogPostBySlug(slug: string): Promise<Post | null> {
  const response = await contentful.getEntries<PostFields>({
    content_type: 'blogPost',
    'fields.slug': slug
  })
  return response.total === 1 ? response.items[0] : null
}

interface WorksFields {
  title: string
  hero: Asset
  url: string
  description: string
}

export type WorkEntry = Entry<WorksFields>

export async function getMyWorks(): Promise<EntryCollection<WorksFields>> {
  const works = await contentful.getEntries<WorksFields>({
    content_type: 'work',
    order: 'sys.createdAt'
  })
  return works
}
