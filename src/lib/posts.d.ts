export type PostMeta = {
  slug: string
  filePath: string
  title: string
  description: string
  date: string
  updated?: string
  ogImageUrl?: string
}

export type PostToc = {
  id: string
  text: string
  children: PostToc[]
}

export type Post= {
  meta: PostMeta
  contentHtml: string
  toc: PostToc[]
  tocIDs: stirng[]
}

export const listPosts: () => PostMeta[]
export const findSinglePost: (slug: string) => Post
