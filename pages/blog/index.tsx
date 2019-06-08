import { NextFC } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Post } from '../../api/contentful'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../Redux'
import { fetchPosts } from '../../Redux/modules/posts'

const Index: NextFC = (): JSX.Element => {
  const posts = useSelector((state: RootState): Post[] => state.posts.posts)
  const dispatch = useDispatch()
  return (
    <>
      <ul>
        {posts.map(
          (post): JSX.Element => (
            <li key={post.sys.id}>
              <Link
                href={`/blog/post?slug=${post.fields.slug}`}
                as={`/blog/post/${post.fields.slug}`}
              >
                <a>{post.fields.title}</a>
              </Link>
            </li>
          )
        )}
      </ul>
      <button onClick={() => dispatch(fetchPosts())}>読み込み</button>
    </>
  )
}

export default Index
