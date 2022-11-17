import { useState } from 'react'

import AttachmentIcon from '@mui/icons-material/Attachment'
import SendIcon from '@mui/icons-material/Send'

import Button from '../Button'

import styles from './MessageForm.module.scss'

const MessageInput = ({ messages, setMessages }) => {
  const [input, setInput] = useState('')

  const sendMessage = () => {
    if (input.trim() === '') {
      return
    }
    const message = {
      id: Math.random(), // пока что, чтобы не по индексам смотрел в массиве
      data: input,
      date: new Date().toLocaleTimeString('ru', {
        hour: 'numeric',
        minute: 'numeric',
      }),
    }
    setMessages([message, ...messages])
    setInput('')
  }

  return (
    <div className={styles.container}>
      <div className={styles.messageInput}>
        <input
          type="text"
          placeholder="Сообщение"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => event.key === 'Enter' && sendMessage()}
        />
        <Button>
          <AttachmentIcon />
        </Button>
      </div>
      <Button variant={'gradient'} onClick={sendMessage}>
        <SendIcon />
      </Button>
    </div>
  )
}

export default MessageInput
