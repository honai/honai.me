import { NextFC } from 'next'
import { withRouter, WithRouterProps, SingletonRouter } from 'next/router'
import { RootState } from 'Redux'
import { useSelector } from 'react-redux'
import { Post, getBlogPostBySlug } from '../../api/contentful'

interface Query {
  slug: string
}

interface PageProps extends WithRouterProps<Query> {
  post?: Post
  router: SingletonRouter<Query> & CostomRouterProps
}

interface CostomRouterProps {
  query: Query
}

const PostPage: NextFC<PageProps, {}> = (props: PageProps): JSX.Element => {
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

PostPage.getInitialProps = async ({ query, res }) => {
  if (!res) {
    return {}
  }
  const post = await getBlogPostBySlug(query.slug)
  if (post === null) {
    res.statusCode = 404
    res.end('404 not found')
  }
  return { post: post }
}

export default withRouter(PostPage)
