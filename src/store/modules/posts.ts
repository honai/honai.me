import { Post, getBlogPosts } from 'src/lib/contentful'
import { ThunkAction } from 'redux-thunk'
import { RootState } from 'src/store/'
import { Action } from 'redux'

export interface PostsState {
  posts: Post[]
  isAllFetched: boolean
}

const initialState: PostsState = {
  posts: [],
  isAllFetched: false
}

interface PayloadAction<T> extends Action<string> {
  payload: T
}

type PostsAction = PayloadAction<Post[]>

const ADD_POSTS = 'ADD_POSTS'

function addPosts(posts: Post[]): PostsAction {
  return {
    type: ADD_POSTS,
    payload: posts
  }
}

const FETCH_LIMIT = 10

export function fetchPosts(): ThunkAction<void, RootState, undefined, Action> {
  return function(dispatch, getState): void {
    const state = getState().posts
    if (state.isAllFetched) {
      return
    }
    getBlogPosts(FETCH_LIMIT, state.posts.length).then((response): void => {
      dispatch(addPosts(response.items))
    })
  }
}

export default function posts(state: PostsState = initialState, action: PostsAction): PostsState {
  switch (action.type) {
    case ADD_POSTS:
      const posts = [...state.posts, ...action.payload]
      const sorted = posts.sort((a, b): number => {
        const dateA = new Date(a.sys.createdAt)
        const dateB = new Date(b.sys.createdAt)
        return dateB.valueOf() - dateA.valueOf()
      })
      return {
        ...state,
        posts: sorted,
        isAllFetched: action.payload.length < FETCH_LIMIT
      }
    default:
      return state
  }
}
