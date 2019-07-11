import { useSelector, useDispatch } from 'react-redux'
import { Post } from '../../api/contentful'
import { RootState } from '../../store'
import Page from '../../components/Page'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { fetchPosts } from '../../store/modules/posts'
import Main from '../../components/Main'
import PostsList from '../../components/PostsList'

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
