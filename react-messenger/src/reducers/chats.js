import {
  ADD_CHAT,
  GET_CHATS_FAILURE,
  GET_CHATS_SUCCESS,
  UPDATE_MESSAGE
} from '../constants/actionTypes'

const initialState = null

const chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHATS_SUCCESS:
      return action.payload
    case GET_CHATS_FAILURE:
      console.log(action.payload)
      return state
    case ADD_CHAT:
      return [action.payload, ...state]
    case UPDATE_MESSAGE:
      return state.map((chat) =>
        chat.id === action.payload.id
          ? { ...chat, last_message: action.payload.message }
          : chat
      )
    default:
      return state
  }
}

export default chatsReducer
