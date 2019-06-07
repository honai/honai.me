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
