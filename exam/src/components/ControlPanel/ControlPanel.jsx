import DoneIcon from '@mui/icons-material/Done'
import HistoryIcon from '@mui/icons-material/History'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import Button from '../Button'
import styles from './ControlPanel.module.scss'

import { Link } from 'react-router-dom'
import { setSourceLang, setTargetLang, switchLangs } from '../../actions/langs'

const ControlPanel = ({
  langs,
  sourceLang,
  setSourceLang,
  targetLang,
  setTargetLang,
  switchLangs,
  getTranslate,
  history
}) => {
  const [options, setOptions] = useState(null)

  useEffect(() => {
    let options = Object.entries(langs).map(([key, value]) => (
      <option key={key} value={value.name}>
        {value.name}
      </option>
    ))
    options = [
      <option key="detect" value={'Определить язык'}>
        Определить язык
      </option>,
      ...options
    ]
    setOptions(options)
  }, [langs])

  const findKey = (value) =>
    Object.keys(langs).find((key) => langs[key].name === value)

  return (
    <div className={styles.panel}>
      {options && (
        <select
          value={sourceLang}
          onChange={(e) =>
            setSourceLang({
              name: e.target.value,
              key: findKey(e.target.value)
            })
          }
          className={`${styles.select} ${styles.left}`}
        >
          {options}
        </select>
      )}
      <Button onClick={getTranslate}>
        <DoneIcon />
      </Button>
      {history.length > 0 && (
        <Link to="/history">
          <Button>
            <HistoryIcon />
          </Button>
        </Link>
      )}

      {options && (
        <select
          value={targetLang}
          onChange={(e) =>
            setTargetLang({
              name: e.target.value,
              key: findKey(e.target.value)
            })
          }
          className={`${styles.select} ${styles.right}`}
        >
          {options.slice(1)}
        </select>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  langs: state.langs.langs,
  sourceLang: state.langs.sourceLang.name,
  targetLang: state.langs.targetLang.name,
  history: state.translates
})

export default connect(mapStateToProps, {
  switchLangs,
  setSourceLang,
  setTargetLang
})(ControlPanel)
