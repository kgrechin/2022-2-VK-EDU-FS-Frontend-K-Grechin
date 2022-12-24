import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const store = createStore(rootReducer, applyMiddleware(thunk))
store.subscribe(() => {
  localStorage.setItem('auth', JSON.stringify(store.getState().auth))
})

export default store
