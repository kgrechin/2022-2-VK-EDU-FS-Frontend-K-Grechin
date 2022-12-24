import {
  GET_AUTH_DATA_FAILURE,
  GET_AUTH_DATA_SUCCESS
} from '../constants/actionTypes'

const initialState = localStorage.getItem('auth')
  ? JSON.parse(localStorage.getItem('auth'))
  : {
      user: null,
      tokens: null
    }

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AUTH_DATA_SUCCESS:
      return {
        user: action.payload.user,
        tokens: action.payload.tokens
      }
    case GET_AUTH_DATA_FAILURE:
      console.log(action.payload.message)
      return {
        user: null,
        tokens: null
      }
    default:
      return state
  }
}

export default authReducer
