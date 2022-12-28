import { ICacheStore, ITranslateData, ITranslateProps } from './types'

export function cache(func: Function) {
  const store: ICacheStore = {}

  async function wrapper(props: ITranslateProps) {
    const key: string = props.text + ' ' + props.targetLang

    if (key in store == false) {
      console.log('get translate from api')
      const val: ITranslateData = await func(props)
      store[key] = val
    } else {
      console.log('get translate from cache')
    }
    return store[key]
  }
  return wrapper
}
