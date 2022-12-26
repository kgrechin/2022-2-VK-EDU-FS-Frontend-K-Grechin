import Linkify from 'linkify-react'
import parseEmojis from '../../utils/parseEmojis'
import styles from './Message.module.scss'

const Message = ({ children, position, date, voice, sender }) => {
  return (
    <div className={`${styles.message} ${styles[position]}`}>
      <div className={`${styles.data} ${voice && styles.voice}`}>
        <Linkify options={{ target: '_blank' }}>
          {parseChildren(children)}
        </Linkify>
        <div className={styles.date}>
          <div className={styles.sender}>{sender}</div>
          {date}
        </div>
      </div>
    </div>
  )
}

const parseChildren = (children) => {
  const copy = [...children]
  if (typeof copy[1] === 'string') {
    copy[1] = parseEmojis(copy[1])
  }
  return copy
}

export default Message
