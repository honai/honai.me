import { ServerResponse } from 'http'
import { withRouter } from 'next/router'
import { RootState } from 'src/store'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import { Post, getBlogPostBySlug } from 'src/lib/contentful'
import { NextPageProps, NextPage } from 'src/types'
import Page from 'src/components/Page'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import Main from 'src/components/Main'
import PostContainer from 'src/components/PostContainer'

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
    <Page title={post ? post.fields.title : 'NOT FOUND'}>
      <Head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.10.1/dist/katex.css" />
      </Head>
      <Header />
      {post ? <PostContainer post={post} /> : <Main>NOT FOUND</Main>}
      <Footer />
    </Page>
  )
}

interface GetInitialPropsParams {
  query: Query
  res: ServerResponse
}

PostPage.getInitialProps = async ({ query, res }: GetInitialPropsParams): Promise<InitialProps> => {
  if (!res) {
    return {}
  }
  if (!query.slug) {
    res.statusCode = 404
    res.end('404 not found')
    return {}
  }
  const post = await getBlogPostBySlug(query.slug)
  return { post: post || undefined }
}

export default withRouter(PostPage)
