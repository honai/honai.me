import { NextFC } from 'next'
import Link from 'next/link'
import { Post } from '../../types'
import contentful from '../../api/contentful'
import { useEffect, useState } from 'react'

const Index: NextFC = (): JSX.Element => {
  const postsInit: Post[] = []
  const [posts, setPosts] = useState(postsInit)
  useEffect((): void => {
    contentful
      .getEntries({
        // eslint-disable-next-line @typescript-eslint/camelcase
        content_type: 'blogPost'
      })
      .then(
        (response: GetEntries): void => {
          setPosts(response.items)
        }
      )
  }, [0])

  return (
    <ul>
      {posts.length === 0 ? <li>読み込み中</li> : false}
      {posts.map(
        (post): JSX.Element => (
          <li key={post.sys.id}>
            <Link
              href={`/blog/post?slug=${post.fields.slug}`}
              as={`/blog/post/${post.fields.slug}`}
            >
              <a>{post.fields.title}</a>
            </Link>
          </li>
        )
      )}
    </ul>
  )
}

interface GetEntries {
  items: Post[]
}

export default Index
