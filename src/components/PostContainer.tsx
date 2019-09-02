import PostBody from 'src/components/PostBody'
import { Post } from 'src/lib/contentful'
import PostHeader from 'src/components/PostHeader'

const PostContainer = ({ post }: { post: Post }): JSX.Element => {
  const headerProps = {
    title: post.fields.title,
    published: new Date(post.fields.customPublishedAt || post.sys.createdAt),
    updated: new Date(post.fields.customUpdatedAt || post.sys.updatedAt)
  }
  return (
    <>
      <PostHeader {...headerProps} />
      <PostBody content={post.fields.content} />
    </>
  )
}

export default PostContainer
