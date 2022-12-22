import axios from 'axios'

import {
  ADD_CHAT,
  GET_CHATS_FAILURE,
  GET_CHATS_SUCCESS,
  UPDATE_MESSAGE
} from '../constants/actionTypes'
import { CHATS_URL } from '../constants/api'

const getChatsSuccess = (chats) => ({
  type: GET_CHATS_SUCCESS,
  payload: chats
})

const getChatsFailure = (message) => ({
  type: GET_CHATS_FAILURE,
  payload: message
})

export const getChats = () => (dispatch, getState) => {
  axios
    .get(CHATS_URL, {
      headers: {
        Authorization: `Bearer ${getState().auth.tokens.access_token}`
      }
    })
    .then((res) => dispatch(getChatsSuccess(res.data)))
    .catch((err) => dispatch(getChatsFailure(err.message)))
}

export const addChat = (chat) => (dispatch) =>
  dispatch({
    type: ADD_CHAT,
    payload: chat
  })

export const updateMessage = (id, message) => (dispatch) =>
  dispatch({
    type: UPDATE_MESSAGE,
    payload: { id, message }
  })
