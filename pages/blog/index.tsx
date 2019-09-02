import { useSelector, useDispatch } from 'react-redux'
import { Post } from 'src/lib/contentful'
import { RootState } from 'src/store'
import Page from 'src/components/Page'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import { fetchPosts } from 'src/store/modules/posts'
import Main from 'src/components/Main'
import PostsList from 'src/components/PostsList'

const Index = (): JSX.Element => {
  const posts = useSelector((state: RootState): Post[] => state.posts.posts)
  const dispatch = useDispatch()
  if (posts.length === 0) {
    dispatch(fetchPosts())
  }
  return (
    <Page title="Blog Posts">
      <Header />
      <Main>
        <h1 className="century-gothic">Blog Posts</h1>
        <PostsList posts={posts} />
      </Main>
      <Footer />
      <style jsx>
        {`
          :global(body) {
            background-color: rgb(247, 247, 247);
          }
          h1 {
            text-align: center;
          }
        `}
      </style>
    </Page>
  )
}

export default Index
