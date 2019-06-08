import { createStore as reduxCreateStore, combineReducers, Store } from 'redux'
import counter from './modules/counter'

export default function createStore(): Store {
  return reduxCreateStore(combineReducers({ counter }))
}
