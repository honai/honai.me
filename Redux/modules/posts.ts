import contentful, { Post, PostFields } from '../../api/contentful'
import { ThunkAction } from 'redux-thunk'
import { RootState } from 'Redux'
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

const FETCH_LIMIT = 2

export function fetchPosts(): ThunkAction<void, RootState, undefined, Action> {
  return function(dispatch, getState): void {
    const state = getState().posts
    if (state.isAllFetched) {
      return
    }
    contentful
      .getEntries<PostFields>({
        // eslint-disable-next-line @typescript-eslint/camelcase
        content_type: 'blogPost',
        limit: FETCH_LIMIT,
        skip: state.posts.length
      })
      .then(
        (response): void => {
          dispatch(addPosts(response.items))
        }
      )
  }
}

export default function posts(state: PostsState = initialState, action: PostsAction): PostsState {
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
