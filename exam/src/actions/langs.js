import {
  GET_LANGS_FAILURE,
  GET_LANGS_SUCCESS,
  SET_SOURCE_LANG,
  SET_TARGET_LANG,
  SWITCH_LANGS
} from '../constants/actionTypes'

const getLangsSuccess = (langs) => ({
  type: GET_LANGS_SUCCESS,
  payload: langs
})

const getLangsFailure = (message) => ({
  type: GET_LANGS_FAILURE,
  payload: message
})

export const getLangs = () => (dispatch) => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'df5ffa97f3mshfa5277882376ad1p1db7b7jsnb69ba524116a',
      'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
      'x-rapidapi-ua': 'RapidAPI-Playground'
    }
  }

  fetch(
    'https://microsoft-translator-text.p.rapidapi.com/languages?api-version=3.0',
    options
  )
    .then((res) => res.json())
    .then((res) => dispatch(getLangsSuccess(res.dictionary)))
    .catch((err) => dispatch(getLangsFailure(err.message)))
}

export const setSourceLang = (lang) => (dispatch) =>
  dispatch({
    type: SET_SOURCE_LANG,
    payload: lang
  })

export const setTargetLang = (lang) => (dispatch) =>
  dispatch({
    type: SET_TARGET_LANG,
    payload: lang
  })

export const switchLangs = () => (dispatch) => dispatch({ type: SWITCH_LANGS })
