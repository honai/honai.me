import { createStore as reduxCreateStore, combineReducers, Store } from 'redux'
import counter from './modules/counter'

const rootReducer = combineReducers({ counter })

export default function createStore(): Store {
  if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
    return reduxCreateStore(
      rootReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  } else {
    return reduxCreateStore(rootReducer)
  }
}
