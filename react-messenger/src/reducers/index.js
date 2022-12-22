import { combineReducers } from 'redux'

import auth from './auth'
import centrifuge from './centrifuge'
import chats from './chats'
import messages from './messages'

export default combineReducers({
  auth,
  centrifuge,
  chats,
  messages
})
