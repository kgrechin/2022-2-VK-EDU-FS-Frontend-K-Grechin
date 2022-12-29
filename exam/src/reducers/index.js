import { combineReducers } from 'redux'

import langs from './langs'
import translates from './translates'

export default combineReducers({
  langs,
  translates
})
