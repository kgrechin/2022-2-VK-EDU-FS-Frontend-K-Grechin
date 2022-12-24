import {
  ADD_MESSAGE,
  GET_MESSAGES_FAILURE,
  GET_MESSAGES_SUCCESS,
  SEND_MESSAGE_FAILURE,
  SEND_MESSAGE_SUCCESS
} from '../constants/actionTypes'

const initialState = {}

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES_SUCCESS:
      const data = action.payload
      return {
        ...state,
        [data.chat]: data.messages
      }
    case GET_MESSAGES_FAILURE:
      console.log(action.payload)
      return state
    case ADD_MESSAGE:
      const { message, chat } = action.payload
      return {
        ...state,
        [chat]: [message, ...state[chat]]
      }
    case SEND_MESSAGE_SUCCESS:
      return state
    case SEND_MESSAGE_FAILURE:
      console.log(action.payload)
      return state
    default:
      return state
  }
}

export default messagesReducer
