import axios from 'axios'

import {
  GET_AUTH_DATA_FAILURE,
  GET_AUTH_DATA_SUCCESS,
  LOGOUT
} from '../constants/actionTypes'

import {
  AUTH_URL,
  BACKEND,
  CLIENT_ID,
  CLIENT_SECRET,
  GRANT_TYPE,
  USER_URL
} from '../constants/api'

const getAuthDataSuccess = (authData) => ({
  type: GET_AUTH_DATA_SUCCESS,
  payload: authData
})

const getAuthDataFailure = (message) => ({
  type: GET_AUTH_DATA_FAILURE,
  payload: message
})

export const getAuthData = (googleToken) => (dispatch, getState) => {
  axios
    .post(
      AUTH_URL,
      {
        grant_type: GRANT_TYPE,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        backend: BACKEND,
        token: googleToken
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then((authRes) =>
      axios
        .get(USER_URL, {
          headers: {
            Authorization: `Bearer ${authRes.data.access_token}`
          }
        })
        .then((userRes) =>
          dispatch(
            getAuthDataSuccess({ tokens: authRes.data, user: userRes.data })
          )
        )
        .catch((err) => dispatch(getAuthDataFailure(err)))
    )
    .catch((err) => dispatch(getAuthDataFailure(err)))
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('auth')
  return dispatch({ type: LOGOUT })
}
