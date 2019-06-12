import { withRouter } from 'next/router'
import { RootState } from 'Redux'
import { useSelector } from 'react-redux'
import { Post, getBlogPostBySlug } from '../../api/contentful'
import { NextPageProps, NextPage } from '../../types'
import Page from '../../components/Page'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Main from '../../components/Main'
import PostContainer from '../../components/PostContainer'

interface Query {
  slug: string
}
interface InitialProps {
  post?: Post
}
const PostPage: NextPage<InitialProps, Query> = (
  props: NextPageProps<InitialProps, Query>
): JSX.Element => {
  const slug = props.router.query.slug
  const posts = useSelector((state: RootState): Post[] => state.posts.posts)
  let post: Post | undefined
  if (props.post) {
    post = props.post
  } else if (slug) {
    post = posts.find((post): boolean => post.fields.slug === slug)
  }
  return (
    <Page>
      <Header />
      <Main>{post ? <PostContainer post={post} /> : <div>not found</div>}</Main>
      <Footer />
    </Page>
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
