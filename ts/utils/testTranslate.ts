import { translateWithCache, types as T } from './TranslateUtils'

async function test() {
  const props: T.ITranslateProps = {
    text: 'hello world',
    sourceLang: 'en',
    targetLang: 'ru'
  }

  const result1 = await translateWithCache(props)
  console.log(result1)
  const result2 = await translateWithCache(props)
  console.log(result2)

  return [result1, result2]
}

test()
