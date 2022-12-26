import { useContext, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ImageIcon from '@mui/icons-material/Image'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SearchIcon from '@mui/icons-material/Search'

import { getMessages } from '../../actions/messages'
import { BACKEND_URL } from '../../constants/api'
import { AttachmentContext } from '../../contexts/AttachmentContext'

import AttachmentMenu from '../../components/AttachmentMenu'
import Button from '../../components/Button'
import EmojiKeyboard from '../../components/EmojiKeyboard'
import Header from '../../components/Header'
import ImagesPreview from '../../components/ImagesPreview'
import Message from '../../components/Message'
import MessageForm from '../../components/MessageForm'
import ProfileMeta from '../../components/ProfileMeta'
import VoiceMessage from '../../components/VoiceMessage'
import Wrapper from '../../components/Wrapper'

import styles from './PageChat.module.scss'

const PageChat = ({ chats, user, storeMessages, getMessages }) => {
  const { uuid } = useParams()

  const [chat, setChat] = useState(null)
  const messages = storeMessages[uuid]

  const {
    images,
    attachmentMenu,
    emojiKeyboard,
    getRootProps,
    getInputProps,
    isDragActive
  } = useContext(AttachmentContext)

  useEffect(() => {
    chats && setChat(chats.find((chat) => chat.id === uuid))
  }, [chats, uuid])

  useEffect(() => {
    chats && !messages && getMessages(uuid)
  }, [messages, uuid, chats, getMessages])

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
            chat &&
            !chat.is_private &&
            message.user.first_name + ' ' + message.user.last_name
          }
          voice={message.voice}
        >
          <div className={styles.messageImagesContainer}>
            {message.images.map((image) => (
              <img
                className={styles.image}
                key={image.id}
                src={BACKEND_URL + image.image}
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
                  : BACKEND_URL + message.voice
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
            <span className={styles.dragText}>
              Перетащите картинки прямо сюда
            </span>
            <div className={styles.dragImageWrapper}>
              <ImageIcon fontSize="inherit" />
            </div>
          </>
        )}
      </Wrapper>

      {images.length > 0 && !isDragActive && <ImagesPreview />}

      {attachmentMenu && !isDragActive && <AttachmentMenu />}

      {emojiKeyboard && !isDragActive && <EmojiKeyboard />}

      {!isDragActive && (
        <div className={styles.input}>
          <MessageForm />
        </div>
      )}
    </>
  )
}

const mapStateToProps = (state) => ({
  tokens: state.auth.tokens,
  user: state.auth.user,
  chats: state.chats,
  storeMessages: state.messages
})

export default connect(mapStateToProps, { getMessages })(PageChat)
