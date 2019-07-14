import Link from 'next/link'
import moment from 'moment'
import { primaryColor } from './theme'
import { Post } from '../api/contentful'
import { PropsWithChildren } from 'react'

moment.locale('ja')

interface PostLinkProps {
  slug: string
}

const PostLink = ({ children, slug }: PropsWithChildren<PostLinkProps>): JSX.Element => (
  <Link href={`/blog/post?slug=${slug}`} as={`/blog/post/${slug}`}>
    {children}
  </Link>
)

interface PreviewProps {
  post: Post
}

const PostPreview = ({ post }: PreviewProps): JSX.Element => {
  const { slug, title, customPublishedAt } = post.fields
  const { createdAt } = post.sys
  return (
    <section>
      <PostLink slug={slug}>
        <a>
          <h2>{title}</h2>
          <div className="date">{moment(customPublishedAt || createdAt).format('ll')}</div>
        </a>
      </PostLink>
      <style jsx>{`
        a {
          text-decoration: unset;
          color: unset;
        }
        a:hover h2,
        a:hover .date {
          color: ${primaryColor};
        }
        section {
          box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
          padding: 10px 20px;
          border-radius: 5px;
          background-color: #fff;
        }
        h2,
        .date {
          text-align: center;
        }
        .date {
          color: #888;
          margin: 1rem;
        }
      `}</style>
    </section>
  )
}

export default PostPreview
