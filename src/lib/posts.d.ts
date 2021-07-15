export type PostMeta = {
  slug: string
  title: string
}

export type Post= {
  meta: PostMeta
  content: string
}

export const listPosts: () => PostMeta[]
export const findSinglePost: (slug: string) => Post
