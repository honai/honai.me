import { createStore as reduxCreateStore, combineReducers, Store, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import posts, { PostsState } from 'src/store/modules/posts'

const rootReducer = combineReducers({ posts })

export default function createStore(): Store {
  if (process.env.NODE_ENV === 'production') {
    return reduxCreateStore(rootReducer, applyMiddleware(thunk))
  } else {
    return reduxCreateStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
  }
}

export interface RootState {
  posts: PostsState
}
