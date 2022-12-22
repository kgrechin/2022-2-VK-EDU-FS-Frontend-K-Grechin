import axios from 'axios'

import {
  ADD_MESSAGE,
  GET_MESSAGES_FAILURE,
  GET_MESSAGES_SUCCESS,
  SEND_MESSAGE_FAILURE,
  SEND_MESSAGE_SUCCESS
} from '../constants/actionTypes'
import { MESSAGES_URL } from '../constants/api'

const getMessagesSuccess = (data) => ({
  type: GET_MESSAGES_SUCCESS,
  payload: data
})

const getMessagesFailure = (message) => ({
  type: GET_MESSAGES_FAILURE,
  payload: message
})

export const getMessages = (uuid) => (dispatch, getState) => {
  axios
    .get(`${MESSAGES_URL}/${uuid}/`, {
      headers: {
        Authorization: `Bearer ${getState().auth.tokens.access_token}`
      }
    })
    .then((res) =>
      dispatch(getMessagesSuccess({ messages: res.data, chat: uuid }))
    )
    .catch((err) => dispatch(getMessagesFailure(err.message)))
}

const sendMessageSuccess = () => ({
  type: SEND_MESSAGE_SUCCESS
})

const sendMessageFailure = (message) => ({
  type: SEND_MESSAGE_FAILURE,
  payload: message
})

export const sendMessage = (uuid, data) => (dispatch, getState) => {
  axios
    .post(`${MESSAGES_URL}/${uuid}/`, data, {
      headers: {
        Authorization: `Bearer ${getState().auth.tokens.access_token}`,
        'content-type': 'multipart/form-data'
      }
    })
    .then((res) => dispatch(sendMessageSuccess()))
    .catch((err) => dispatch(sendMessageFailure(err.message)))
}

export const addMessage = (message, chat) => (dispatch) => {
  return dispatch({
    type: ADD_MESSAGE,
    payload: { message, chat }
  })
}
