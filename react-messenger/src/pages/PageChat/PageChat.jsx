import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SearchIcon from '@mui/icons-material/Search'

import { CentrifugoContext } from '../../contexts/CentrifugoContext'
import { LoginContext } from '../../contexts/LoginContext'

import { getChatMessages } from '../../utils/requests'

import Button from '../../components/Button'
import Header from '../../components/Header'
import Message from '../../components/Message'
import MessageForm from '../../components/MessageForm'
import ProfileMeta from '../../components/ProfileMeta'
import Wrapper from '../../components/Wrapper'

import styles from './PageChat.module.scss'

const PageChat = () => {
  const params = useParams()

  const { user, tokens } = useContext(LoginContext)
  const { chats, centrifugo } = useContext(CentrifugoContext)

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
  }

  const getProfileMeta = () => {
    return {
      name: chats && chats.find((chat) => chat.id === params.uuid).title
    }
  }

  const renderMessages = () =>
    messages &&
    messages.map((message) => {
      const position = message.user.id === user.id ? 'right' : 'left'
      const date = new Date(message.created_at).toLocaleTimeString('ru', {
        hour: 'numeric',
        minute: 'numeric'
      })

      console.log()

      return (
        <Message key={message.id} position={position} date={date}>
          {message.text}
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
      <Wrapper className={styles.wrapper}>{renderMessages()}</Wrapper>
      <div className={styles.input}>
        <MessageForm />
      </div>
    </>
  )
}

export default PageChat
