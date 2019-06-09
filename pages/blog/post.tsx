import { withRouter } from 'next/router'
import { RootState } from 'Redux'
import { useSelector } from 'react-redux'
import { Post, getBlogPostBySlug } from '../../api/contentful'
import { NextPageProps, NextPage } from '../../types'

interface Query {
  slug: string
}
interface InitialProps {
  post?: Post
}
const PostPage: NextPage<InitialProps, Query> = (
  props: NextPageProps<InitialProps, Query>
): JSX.Element => {
  let post: Post | undefined = undefined
  if (props.post) {
    post = props.post
  } else if (props.router.query.slug) {
    post = useSelector(
      (state: RootState): Post | undefined =>
        state.posts.posts.find(
          (post: Post): boolean => post.fields.slug === props.router.query.slug
        )
    )
  }
  if (!post) {
    return <div>NOT FOUND</div>
  }
  const {
    fields: { title, content },
    sys: { createdAt }
  } = post
  return (
    <main>
      <h1>{title}</h1>
      <div>投稿: {createdAt}</div>
      <p>{content}</p>
    </main>
  )
}

PostPage.getInitialProps = async ({ query, res }): Promise<InitialProps> => {
  if (!res) {
    return {}
  }
  const post = await getBlogPostBySlug(query.slug)
  if (post === null) {
    res.statusCode = 404
    res.end('404 not found')
    return {}
  }
  return { post: post }
}

export default withRouter(PostPage)
