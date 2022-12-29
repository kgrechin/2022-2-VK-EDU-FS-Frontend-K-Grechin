import DoneAllIcon from '@mui/icons-material/DoneAll'

import styles from './MessageMeta.module.scss'

const statuses = {
  done_all: <DoneAllIcon />
}

const MessageMeta = ({ date, status = 'done_all' }) => {
  return (
    <div className={styles.meta}>
      <span className={styles.date}>{date}</span>
      <span className={styles.status}>{statuses[status]}</span>
    </div>
  )
}

export default MessageMeta
