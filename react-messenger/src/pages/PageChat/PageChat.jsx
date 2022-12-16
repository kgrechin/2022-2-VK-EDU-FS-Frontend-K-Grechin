import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ImageIcon from '@mui/icons-material/Image'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SearchIcon from '@mui/icons-material/Search'

import { AttachmentContext } from '../../contexts/AttachmentContext'
import { CentrifugoContext } from '../../contexts/CentrifugoContext'
import { LoginContext } from '../../contexts/LoginContext'

import { getChatMessages } from '../../utils/requests'

import AttachmentMenu from '../../components/AttachmentMenu'
import Button from '../../components/Button'
import Header from '../../components/Header'
import ImagesPreview from '../../components/ImagesPreview'
import Message from '../../components/Message'
import MessageForm from '../../components/MessageForm'
import ProfileMeta from '../../components/ProfileMeta'
import VoiceMessage from '../../components/VoiceMessage'
import Wrapper from '../../components/Wrapper'

import styles from './PageChat.module.scss'

const PageChat = () => {
  const params = useParams()

  const [chat, setChat] = useState(null)

  const { user, tokens } = useContext(LoginContext)
  const { chats, centrifugo } = useContext(CentrifugoContext)
  const { images, attachmentMenu, getRootProps, getInputProps, isDragActive } =
    useContext(AttachmentContext)

  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState(null)

  useEffect(() => {
    chats && !loading && init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chats])

  const init = async () => {
    const messages = await getChatMessages(tokens.access_token, params.uuid)
    setMessages(messages)
    setLoading(true)

    const sub = centrifugo._subs[params.uuid]
    sub.on('publication', (ctx) => {
      setMessages((prev) => [ctx.data, ...prev])
    })
    setChat(chats.find((chat) => chat.id === params.uuid))
  }

  const getProfileMeta = () => {
    return (
      chat && {
        name: chat.title,
        avatar: chat.avatar,
        activity: chat.is_private
          ? 'был недавно'
          : chat.members.length + ' участника'
      }
    )
  }

  const renderMessages = () =>
    messages &&
    messages.map((message) => {
      const position = message.user.id === user.id ? 'right' : 'left'
      const date = new Date(message.created_at).toLocaleTimeString('ru', {
        hour: 'numeric',
        minute: 'numeric'
      })

      return (
        <Message
          key={message.id}
          position={position}
          date={date}
          sender={
            !chat.is_private &&
            message.user.first_name + ' ' + message.user.last_name
          }
          voice={message.voice}
        >
          <div className={styles.messageImagesContainer}>
            {message.images.map((image) => (
              <img
                key={image.id}
                src={'http://127.0.0.1:9000' + image.image}
                alt={''}
              />
            ))}
          </div>
          {message.text}
          {message.voice && (
            <VoiceMessage
              url={
                message.voice.startsWith('http')
                  ? message.voice
                  : 'http://127.0.0.1:9000' + message.voice
              }
            />
          )}
        </Message>
      )
    })

  return (
    <>
      <Header className={styles.header}>
        <Link to="/">
          <Button>
            <ArrowBackIcon />
          </Button>
        </Link>
        <ProfileMeta {...getProfileMeta()} />
        <Button>
          <SearchIcon />
        </Button>
        <Button>
          <MoreVertIcon />
        </Button>
      </Header>

      <Wrapper
        dragProps={getRootProps()}
        className={!isDragActive ? styles.wrapper : styles.dragWrapper}
      >
        <input {...getInputProps()} />
        {!isDragActive ? (
          renderMessages()
        ) : (
          <>
            <span>Перетащите картинки прямо сюда</span>
            <div>
              <ImageIcon fontSize="inherit" />
            </div>
          </>
        )}
      </Wrapper>

      {images.length > 0 && !isDragActive && <ImagesPreview />}

      {attachmentMenu && !isDragActive && <AttachmentMenu />}

      {!isDragActive && (
        <div className={styles.input}>
          <MessageForm />
        </div>
      )}
    </>
  )
}

export default PageChat
