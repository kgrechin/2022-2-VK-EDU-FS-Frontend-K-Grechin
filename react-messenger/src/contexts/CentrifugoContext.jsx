import { createContext, useContext, useEffect, useState } from 'react'

import { Centrifuge } from 'centrifuge'

import { LoginContext } from './LoginContext'

import { getChats } from '../utils/requests'

export const CentrifugoContext = createContext()

export const CentrifugoProvider = ({ children }) => {
  const { user, tokens } = useContext(LoginContext)

  const [chats, setChats] = useState(null)
  const [loading, setLoading] = useState(false)
  const [centrifugo, setCentrifugo] = useState(null)

  useEffect(() => {
    user && init()
  }, [user])

  const init = async () => {
    const chats = await getChats(tokens.access_token)
    setChats(chats)

    const centrifugo = new Centrifuge(process.env.REACT_APP_CENTRIFUGO_URL, {
      token: user.con_token
    })
    centrifugo.connect()
    setCentrifugo(centrifugo)

    setLoading(true)
  }

  useEffect(() => {
    loading && subscribe()
  }, [loading])

  const subscribe = () => {
    const sub = centrifugo.newSubscription(user.id, {
      token: user.sub_token
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
      token: chat.token
    })
    sub.subscribe()
    sub.on('publication', (ctx) => {
      updateMessage(chat.id, ctx.data)
    })
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
