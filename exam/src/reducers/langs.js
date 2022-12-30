import {
  GET_LANGS_FAILURE,
  GET_LANGS_SUCCESS,
  SET_SOURCE_LANG,
  SET_TARGET_LANG,
  SWITCH_LANGS
} from '../constants/actionTypes'

const initialState = {
  langs: null,
  sourceLang: {
    name: 'Русский',
    key: 'ru'
  },
  targetLang: {
    name: 'Английский',
    key: 'en'
  }
}

const langsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LANGS_SUCCESS:
      return {
        ...state,
        langs: action.payload
      }
    case GET_LANGS_FAILURE:
      console.error(action.payload)
      return {
        ...state,
        langs: null
      }
    case SET_SOURCE_LANG:
      return {
        ...state,
        sourceLang: action.payload
      }
    case SET_TARGET_LANG:
      return {
        ...state,
        targetLang: action.payload
      }
    case SWITCH_LANGS:
      const source = state.sourceLang
      const target = state.targetLang
      return {
        ...state,
        sourceLang: target,
        targetLang: source
      }
    default:
      return state
  }
}

export default langsReducer
