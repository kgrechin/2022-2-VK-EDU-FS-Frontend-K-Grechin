import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'

import AttachmentIcon from '@mui/icons-material/Attachment'
import SendIcon from '@mui/icons-material/Send'

import Button from '../Button'

import { LoginContext } from '../../contexts/LoginContext'

import { sendMessageToChat } from '../../utils/requests'

import styles from './MessageForm.module.scss'

const MessageInput = () => {
  const params = useParams()

  const [input, setInput] = useState('')

  const { tokens } = useContext(LoginContext)

  const sendMessage = () => {
    if (input.trim() === '') {
      return
    }
    sendMessageToChat(tokens.access_token, params.uuid, {
      text: input
    })
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
