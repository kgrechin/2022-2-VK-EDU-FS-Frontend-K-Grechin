import { useContext, useEffect, useState } from 'react'
import { useReactMediaRecorder } from 'react-media-recorder'
import { useParams } from 'react-router-dom'

import AttachmentIcon from '@mui/icons-material/Attachment'
import ClearIcon from '@mui/icons-material/Clear'
import MicIcon from '@mui/icons-material/Mic'
import SendIcon from '@mui/icons-material/Send'

import Button from '../Button'
import VoiceMessage from '../VoiceMessage'

import { AttachmentContext } from '../../contexts/AttachmentContext'
import { LoginContext } from '../../contexts/LoginContext'

import { sendMessageToChat } from '../../utils/requests'

import styles from './MessageForm.module.scss'

const MessageInput = () => {
  const params = useParams()

  const [recording, setRecording] = useState(false)
  const [voiceMessage, setVoiceMessage] = useState(null)

  const { tokens } = useContext(LoginContext)
  const { input, setInput, images, setImages, toggleAttachmentMenu } =
    useContext(AttachmentContext)

  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder(
    { video: false, audio: true, screen: false }
  )

  useEffect(() => {
    if (mediaBlobUrl) {
      const getVoice = async () => {
        const audioBlob = await fetch(mediaBlobUrl).then((res) => res.blob())
        const audioFile = new File([audioBlob], 'voice.wav', {
          type: 'audio/wav'
        })
        setVoiceMessage(audioFile)
      }
      getVoice()
    }
  }, [mediaBlobUrl])

  const sendMessage = () => {
    if (input.trim() === '' && images.length === 0 && !voiceMessage) {
      return
    }
    const formData = new FormData()

    images.forEach((file) => {
      formData.append('images', file, file.name)
    })

    formData.append('text', input)
    voiceMessage && formData.append('voice', voiceMessage)

    sendMessageToChat(tokens.access_token, params.uuid, formData)
    setInput('')
    setImages([])
    setVoiceMessage(null)
  }

  const toggleRecording = () => {
    recording ? stopRecording() : startRecording()
    setRecording((prev) => !prev)
  }

  return (
    <div className={styles.container}>
      <div className={styles.messageInput}>
        {!voiceMessage ? (
          <>
            <input
              type="text"
              placeholder="Сообщение"
              value={input}
              disabled={recording}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => event.key === 'Enter' && sendMessage()}
            />
            <Button onClick={toggleAttachmentMenu} disabled={recording}>
              <AttachmentIcon />
            </Button>
          </>
        ) : (
          <>
            <VoiceMessage audioFile={voiceMessage} />
            <Button onClick={() => setVoiceMessage(null)}>
              <ClearIcon />
            </Button>
          </>
        )}
      </div>
      {input.trim() || voiceMessage || images.length > 0 ? (
        <Button variant={'gradient'} onClick={sendMessage}>
          <SendIcon />
        </Button>
      ) : (
        <Button
          variant={'gradient'}
          onClick={toggleRecording}
          className={recording && styles.record}
        >
          <MicIcon />
        </Button>
      )}
    </div>
  )
}

export default MessageInput
