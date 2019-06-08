import { createClient, Entry } from 'contentful'

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
