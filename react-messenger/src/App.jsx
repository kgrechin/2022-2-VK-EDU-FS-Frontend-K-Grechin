import { Component } from 'react'
import { connect } from 'react-redux'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

import {
  connectCentrifuge,
  disconnectCentrifuge,
  setInitialSubscribe,
  subscribeChannel
} from './actions/centrifuge'
import { addChat, getChats, updateMessage } from './actions/chats'
import { addMessage, getMessages } from './actions/messages'

import { AUDIO_URL } from './constants/api'
import { NOTIFICATION_DATA } from './constants/appData'
import { AttachmentProvider } from './contexts/AttachmentContext'

import Notification from './components/Notification'
import PageChat from './pages/PageChat'
import PageChatList from './pages/PageChatList'
import PageProfile from './pages/PageProfile'

class App extends Component {
  componentDidMount = () => {
    this.props.getChats()
    this.props.connectCentrifuge()
  }

  componentWillUnmount = () => {
    this.props.disconnectCentrifuge()
  }

  componentDidUpdate = () => {
    const { setInitialSubscribe } = this.props

    if (
      this.props.chats &&
      this.props.centrifuge &&
      !this.props.initialSubscribe
    ) {
      this.initialSubscribe()
      setInitialSubscribe()
    }
  }

  initialSubscribe = () => {
    const { subscribeChannel, addChat } = this.props

    subscribeChannel(this.props.user.id, (ctx) => {
      this.subscribeChat(ctx.data)
      addChat(ctx.data)
    })

    this.props.chats.forEach((chat) => {
      this.subscribeChat(chat)
    })
  }

  subscribeChat = (chat) => {
    const { subscribeChannel, updateMessage, addMessage } = this.props

    subscribeChannel(chat.id, (ctx) => {
      updateMessage(chat.id, ctx.data)

      if (chat.id in this.props.messages) {
        addMessage(ctx.data, chat.id)
      }

      const parser = document.createElement('a')
      parser.href = window.location.href
      const location = parser.hash.slice(2)

      if (
        ctx.data.user.id !== this.props.user.id &&
        location !== chat.id &&
        location !== ''
      ) {
        this.toastify({ ...ctx.data, chat })
      }
    })
  }

  toastify = (data) => {
    toast(<Notification {...data} />, NOTIFICATION_DATA)
    new Audio(AUDIO_URL).play()
  }

  render () {
    return (
      <HashRouter>
        <Routes>
          <Route path={'/'} element={<PageChatList />} />
          <Route
            path={'/:uuid'}
            element={<AttachmentProvider children={<PageChat />} />}
          />
          <Route path={'/profile'} element={<PageProfile />} />
          <Route path={'/login'} element={<Navigate to={'/'} />} />
        </Routes>
        <ToastContainer />
      </HashRouter>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  chats: state.chats,
  centrifuge: state.centrifuge.centrifuge,
  initialSubscribe: state.centrifuge.initialSubscribe,
  messages: state.messages
})

export default connect(mapStateToProps, {
  connectCentrifuge,
  disconnectCentrifuge,
  getChats,
  subscribeChannel,
  addChat,
  updateMessage,
  addMessage,
  setInitialSubscribe,
  getMessages
})(App)
