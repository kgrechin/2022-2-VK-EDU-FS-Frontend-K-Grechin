import {
  CENTRIFUGE_CONNECT_FAILURE,
  CENTRIFUGE_CONNECT_SUCCESS,
  CENTRIFUGE_DISCONNECT,
  CENTRIFUGE_INITIAL_SUBSCRIBE,
  CHANNEL_SUBSCRIBE_FAILURE,
  CHANNEL_SUBSCRIBE_SUCCESS
} from '../constants/actionTypes'

const initialState = {
  centrifuge: null,
  initialSubscribe: false
}

const centrifugeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CENTRIFUGE_CONNECT_SUCCESS:
      console.log('centrifuge connect')
      return {
        ...state,
        centrifuge: action.payload
      }
    case CENTRIFUGE_CONNECT_FAILURE:
      console.log(action.payload)
      return state
    case CHANNEL_SUBSCRIBE_SUCCESS:
      console.log(`Subscribe to ${action.payload}`)
      return state
    case CHANNEL_SUBSCRIBE_FAILURE:
      console.log(`Can't subscribe to ${action.payload}`)
      return state
    case CENTRIFUGE_INITIAL_SUBSCRIBE:
      return {
        ...state,
        initialSubscribe: true
      }
    case CENTRIFUGE_DISCONNECT:
      console.log('centrifuge disconnect')
      return {
        centrifuge: null,
        initialSubscribe: false
      }
    default:
      return state
  }
}

export default centrifugeReducer
