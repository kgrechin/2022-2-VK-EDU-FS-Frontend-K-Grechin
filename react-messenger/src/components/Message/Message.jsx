import styles from './Message.module.scss'

const Message = ({ children, position, date }) => {
  return (
    <div className={`${styles.message} ${styles[position]}`}>
      <div className={styles.data}>
        {children}
        <div className={styles.date}>{date}</div>
      </div>
    </div>
  )
}

export default Message
