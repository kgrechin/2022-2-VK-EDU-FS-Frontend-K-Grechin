export interface ITranslateProps {
  text: string
  sourceLang?: string
  targetLang: string
}

interface ITranslateDataSuccess {
  translations: Array<{
    text: string
    detectedLanguageCode?: string
  }>
}

interface ITranslateDataFailure {
  code: number
  message: string
  details: Array<{
    requestId: string
  }>
}

export type ITranslateData = ITranslateDataSuccess & ITranslateDataFailure

export interface ICacheStore {
  [key: string]: ITranslateData
}
