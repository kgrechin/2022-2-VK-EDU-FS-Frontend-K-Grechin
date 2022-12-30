import { ADD_TRANSLATE, CLEAR_TRANSLATES } from '../constants/actionTypes'

const initialState = localStorage.getItem('history')
  ? JSON.parse(localStorage.getItem('history'))
  : []

const translatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TRANSLATE:
      const data = action.payload
      const newState = [...state, data]
      localStorage.setItem('history', JSON.stringify(newState))
      return newState
    case CLEAR_TRANSLATES:
      localStorage.removeItem('history')
      return []
    default:
      return state
  }
}

export default translatesReducer
