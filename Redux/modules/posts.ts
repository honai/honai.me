import contentful, { Post, GetEntries } from '../../api/contentful'
import { ThunkAction } from 'redux-thunk'
import { RootState } from 'Redux'

export interface PostsState {
  posts: Post[]
  isAllFetched: boolean
}

interface Action<T> {
  type: string
  payload: T
}

const initialState: PostsState = {
  posts: [],
  isAllFetched: false
}

const ADD_POSTS = 'ADD_POSTS'

function addPosts(posts: Post[]): Action<Post[]> {
  return {
    type: ADD_POSTS,
    payload: posts
  }
}

const FETCH_LIMIT = 2

export function fetchPosts(): ThunkAction<void, RootState, undefined, Action<Post[]>> {
  return function(dispatch, getState) {
    return contentful
      .getEntries({
        // eslint-disable-next-line @typescript-eslint/camelcase
        content_type: 'blogPost',
        limit: FETCH_LIMIT,
        skip: getState().posts.posts.length
      })
      .then((response: GetEntries) => dispatch(addPosts(response.items)))
  }
}

export default function posts(
  state: PostsState = initialState,
  action: Action<Post[]>
): PostsState {
  switch (action.type) {
    case ADD_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
        isAllFetched: action.payload.length < FETCH_LIMIT
      }
    default:
      return state
  }
}
