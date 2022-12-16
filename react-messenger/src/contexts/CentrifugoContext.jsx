import { createContext, useContext, useEffect, useState } from 'react'

import { Centrifuge } from 'centrifuge'

import { LoginContext } from './LoginContext'

import Notification from '../components/Notification'

import { getCentrifugeToken, getChats } from '../utils/requests'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const CentrifugoContext = createContext()

export const CentrifugoProvider = ({ children }) => {
  const { user, tokens } = useContext(LoginContext)

  const [chats, setChats] = useState(null)
  const [loading, setLoading] = useState(false)
  const [centrifugo, setCentrifugo] = useState(null)

  useEffect(() => {
    user && init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const init = async () => {
    const chats = await getChats(tokens.access_token)
    setChats(chats)

    const centrifugo = new Centrifuge(process.env.REACT_APP_CENTRIFUGO_URL, {
      getToken: (ctx) =>
        getCentrifugeToken(
          process.env.REACT_APP_CENTRIFUGO_CONNECT_URL,
          ctx,
          tokens.access_token
        )
    })
    centrifugo.connect()
    setCentrifugo(centrifugo)

    setLoading(true)
  }

  useEffect(() => {
    loading && subscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  const subscribe = () => {
    const sub = centrifugo.newSubscription(user.id, {
      getToken: (ctx) =>
        getCentrifugeToken(
          process.env.REACT_APP_CENTRIFUGO_SUBSCRIBE_URL,
          ctx,
          tokens.access_token
        )
    })
    sub.subscribe()
    sub.on('publication', (ctx) => {
      subChat(ctx.data)
      setChats((prev) => [ctx.data, ...prev])
    })

    chats.forEach((chat) => {
      subChat(chat)
    })
  }

  const subChat = async (chat) => {
    const sub = centrifugo.newSubscription(chat.id, {
      getToken: (ctx) =>
        getCentrifugeToken(
          process.env.REACT_APP_CENTRIFUGO_SUBSCRIBE_URL,
          ctx,
          tokens.access_token
        )
    })
    sub.subscribe()
    sub.on('publication', (ctx) => {
      updateMessage(chat.id, ctx.data)

      const parser = document.createElement('a')
      parser.href = window.location.href
      const location = parser.hash.slice(2)

      if (
        ctx.data.user.id !== user.id &&
        location !== chat.id &&
        location !== ''
      ) {
        toastify({ ...ctx.data, chat })
      }
    })
  }

  const toastify = (data) => {
    toast(<Notification {...data} />, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark'
    })
    const audio = new Audio(
      'https://drive.google.com/uc?export=download&id=1M95VOpto1cQ4FQHzNBaLf0WFQglrtWi7'
    )
    audio.play()
  }

  const updateMessage = (id, data) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === id ? { ...chat, last_message: data } : chat
      )
    )
  }

  return (
    <CentrifugoContext.Provider
      children={children}
      value={{ chats, centrifugo }}
    />
  )
}
