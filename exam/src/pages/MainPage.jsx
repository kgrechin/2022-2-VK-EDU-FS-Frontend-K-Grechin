import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getLangs, setSourceLang } from '../actions/langs'
import { addTranslate } from '../actions/translates'
import ControlPanel from '../components/ControlPanel'
import Textarea from '../components/Textarea'
import Wrapper from '../components/Wrapper'

const MainPage = ({
  langs,
  getLangs,
  targetLang,
  setSourceLang,
  addTranslate
}) => {
  useEffect(() => {
    if (!langs) {
      getLangs()
    }
  }, [getLangs, langs])

  const [input, setInput] = useState('')
  const [translate, setTranslate] = useState('')

  const getTranslate = () => {
    const sourceText = input

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'df5ffa97f3mshfa5277882376ad1p1db7b7jsnb69ba524116a',
        'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
      },
      body: JSON.stringify([{ text: sourceText }])
    }

    fetch(
      `https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=${targetLang}&api-version=3.0&profanityAction=NoAction&textType=plain`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setTranslate(response[0].translations[0].text)
        const key = response[0].detectedLanguage.language
        console.log(key)
        setSourceLang({
          name: langs[key].name,
          key: key
        })
        addTranslate({
          sourceLang: langs[key].name,
          targetLang: langs[targetLang].name,
          sourceText: sourceText,
          targetText: response[0].translations[0].text
        })
      })
      .catch((err) => console.error(err))
  }

  return (
    <>
      {langs && (
        <>
          <Wrapper>
            <ControlPanel getTranslate={getTranslate} />
            <div
              style={{
                flex: '1',
                display: 'flex'
              }}
            >
              <Textarea text={input} setInput={setInput} />
              <Textarea variant={'light'} text={translate} />
            </div>
          </Wrapper>
        </>
      )}
    </>
  )
}

const mapStateToProps = (state) => ({
  langs: state.langs.langs,
  targetLang: state.langs.targetLang.key
})

export default connect(mapStateToProps, {
  getLangs,
  setSourceLang,
  addTranslate
})(MainPage)
