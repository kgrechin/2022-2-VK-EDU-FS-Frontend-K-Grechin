import { cache } from './cache'
import { FOLDER, KEY, URL } from './constants'
import { ITranslateData, ITranslateProps } from './types'

async function translate(props: ITranslateProps) {
  const body = {
    texts: props.text,
    folderId: FOLDER,
    sourceLanguageCode: props.sourceLang,
    targetLanguageCode: props.targetLang
  }
  const response: any = await fetch(URL, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: KEY
    }
  })
  const data: ITranslateData = await response.json()
  return data
}

export const translateWithCache = cache(translate)
