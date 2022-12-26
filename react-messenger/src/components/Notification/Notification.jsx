import React from 'react'
import { useNavigate } from 'react-router-dom'

import parseEmojis from '../../utils/parseEmojis'

import styles from './Notification.module.scss'

const Notification = ({ user, text, images, voice, chat }) => {
  const navigate = useNavigate()

  const message =
    text || (images.length > 0
      ? 'Изображения'
      : voice
        ? 'Голосовое сообщение'
        : '')

  return (
    <div
      onClick={() => {
        navigate(chat.id)
      }}
      className={styles.wrapper}
    >
      <img src={chat.avatar} alt={''} className={styles.image} />
      <div className={styles.data}>
        <div>{chat.title}</div>
        <div className={styles.message}>
          {!chat.is_private
            ? parseEmojis(`${user.first_name} ${user.last_name}: ${message}`)
            : parseEmojis(message)}
        </div>
      </div>
    </div>
  )
}

export default Notification
