import { Post } from '../api/contentful'
import PostPreview from './PostPreview'

interface PostListProps {
  posts: Post[]
}

const PostsList = ({ posts }: PostListProps): JSX.Element => (
  <>
    <ul className="reset">
      {posts.map(
        (post): JSX.Element => (
          <li key={post.sys.id}>
            <PostPreview post={post} />
          </li>
        )
      )}
    </ul>
    <style jsx>
      {`
        li {
          margin: 0 auto;
          max-width: 600px;
          padding: 5px 0;
        }
      `}
    </style>
  </>
)

export default PostsList
