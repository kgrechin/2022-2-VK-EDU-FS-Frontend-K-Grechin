import Linkify from 'linkify-react'

import styles from './Message.module.scss'

const Message = ({ children, position, date, voice, sender }) => {
  return (
    <div className={`${styles.message} ${styles[position]}`}>
      <div className={`${styles.data} ${voice && styles.voice}`}>
        <Linkify options={{ target: '_blank' }}>{children}</Linkify>
        <div className={styles.date}>
          <div className={styles.sender}>{sender}</div>
          {date}
        </div>
      </div>
    </div>
  )
}

export default Message
