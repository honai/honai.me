export type PostMeta = {
  slug: string
  title: string
}

export type Post= {
  meta: PostMeta
  contentHtml: string
  toc: any
}

export const listPosts: () => PostMeta[]
export const findSinglePost: (slug: string) => Post
