import reactStringReplace from 'react-string-replace'
import styles from '../components/EmojiKeyboard/EmojiKeyboard.module.scss'

import { EMOJIS } from '../constants/appData'

const parseEmojis = (text) => {
  EMOJIS.forEach((name) => {
    text = reactStringReplace(text, `:${name}:`, (match) => (
      <div
        key={Math.random()}
        style={{ display: 'inline-block', verticalAlign: 'bottom' }}
        className={`${styles[match.slice(1, -1)]} ${styles.emoji}`}
      />
    ))
  })
  return text
}

export default parseEmojis
