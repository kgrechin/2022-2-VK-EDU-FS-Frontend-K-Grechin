import { ADD_TRANSLATE, CLEAR_TRANSLATES } from '../constants/actionTypes'

export const addTranslate = (translate) => (dispatch) =>
  dispatch({
    type: ADD_TRANSLATE,
    payload: translate
  })

export const clearTranslates = () => (dispatch) =>
  dispatch({ type: CLEAR_TRANSLATES })
