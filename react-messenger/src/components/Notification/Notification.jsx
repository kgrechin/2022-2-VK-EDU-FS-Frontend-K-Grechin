import React from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './Notification.module.scss'

const Notification = ({ user, text, images, voice, chat }) => {
  const navigate = useNavigate()

  console.log('text', text)
  console.log('images', images)
  console.log('voice', voice)

  const message = text
    ? text
    : images.length > 0
    ? 'Изображения'
    : voice
    ? 'Голосовое сообщение'
    : ''

  return (
    <div
      onClick={() => {
        navigate(chat.id)
        window.location.reload()
      }}
      className={styles.wrapper}
    >
      <img src={chat.avatar} alt={''} className={styles.image} />
      <div className={styles.data}>
        <div>{chat.title}</div>
        <div className={styles.message}>
          {!chat.is_private
            ? `${user.first_name} ${user.last_name}: ${message}`
            : message}
        </div>
      </div>
    </div>
  )
}

export default Notification
