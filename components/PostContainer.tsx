import PostBody from './PostBody'
import { Post } from '../api/contentful'

const PostContainer = ({ post }: { post: Post }): JSX.Element => {
  return <PostBody content={post.fields.content} />
}

export default PostContainer
