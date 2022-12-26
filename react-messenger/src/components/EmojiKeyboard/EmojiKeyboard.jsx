import { useContext } from 'react'
import { AttachmentContext } from '../../contexts/AttachmentContext'

import { EMOJIS } from '../../constants/appData'
import Wrapper from '../Wrapper'

import styles from './EmojiKeyboard.module.scss'

const EmojiKeyboard = () => {
  const { setInput } = useContext(AttachmentContext)

  const emojis = EMOJIS.map((name, idx) => (
    <div
      key={idx}
      className={`${styles[name]} ${styles.emoji} ${styles.onKeyboard}`}
      onClick={() =>
        setInput((prev) =>
          prev.trim() ? prev.trim() + ` :${name}:` : `:${name}:`
        )
      }
    />
  ))

  return (
    <Wrapper className={styles.wrapper} classNameContainer={styles.container}>
      {emojis}
    </Wrapper>
  )
}

export default EmojiKeyboard
