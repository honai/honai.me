import { NextFC } from 'next'
import { Post } from '../../types'
import contentful from '../../modules/contentful'

const PostPage: NextFC<PostInitialProps> = ({ post }: PostInitialProps): JSX.Element => {
  if (!post) {
    return <div>残念</div>
  }
  const {
    fields: { title, content },
    sys: { updatedAt, createdAt }
  } = post
  return (
    <main>
      <h1>{title}</h1>
      <div>投稿: {createdAt}</div>
      <p>{content}</p>
    </main>
  )
}

interface PostInitialProps {
  post?: Post
}

PostPage.getInitialProps = async ({ query }): Promise<PostInitialProps> => {
  let post: Post
  if (!query.slug) {
    return {}
  }
  try {
    const response = await contentful.getEntries({
      'fields.slug': query.slug,
      // eslint-disable-next-line @typescript-eslint/camelcase
      content_type: 'blogPost'
    })
    post = response.items[0]
  } catch (e) {
    console.log(e)
    return {}
  }
  return { post: post }
}

export default PostPage
