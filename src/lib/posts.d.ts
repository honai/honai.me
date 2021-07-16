export type PostMeta = {
  slug: string
  title: string
}

export type PostToc = {
  tag: "h1" | "h2" | "h3"
  id: string
  text: string
  children: PostToc[]
}

export type Post= {
  meta: PostMeta
  contentHtml: string
  toc: PostToc[]
}

export const listPosts: () => PostMeta[]
export const findSinglePost: (slug: string) => Post
