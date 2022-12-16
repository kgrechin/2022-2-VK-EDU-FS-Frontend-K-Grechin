import CreateIcon from '@mui/icons-material/Create'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'

import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { CentrifugoContext } from '../../contexts/CentrifugoContext'
import { LoginContext } from '../../contexts/LoginContext'

import Button from '../../components/Button'
import Header from '../../components/Header'
import MessageMeta from '../../components/MessageMeta'
import ProfileMeta from '../../components/ProfileMeta'
import Wrapper from '../../components/Wrapper'

import 'react-toastify/dist/ReactToastify.css'
import styles from './PageChatList.module.scss'

const PageChatList = () => {
  const { user } = useContext(LoginContext)
  const { chats } = useContext(CentrifugoContext)

  const getActivity = ({ last_message, is_private }) => {
    const activityTemplate = (data) =>
      last_message.user.id === user.id
        ? `Вы: ${data}`
        : is_private
        ? data
        : `${last_message.user.first_name} ${last_message.user.last_name}: ${data}`

    if (last_message.text) {
      return activityTemplate(last_message.text)
    }
    if (last_message.voice) {
      return activityTemplate('Голосовое сообщение')
    }
    if (last_message.images) {
      return activityTemplate('Изображение')
    }
  }

  const getProfileMeta = (chat) => {
    const activity = getActivity(chat)
    return {
      avatar: chat.avatar,
      name: chat.title,
      activity: activity
    }
  }

  const getMessageMeta = (chat) => {
    const convertDate = (date) =>
      new Date(date).toLocaleTimeString('ru', {
        hour: 'numeric',
        minute: 'numeric'
      })
    const date = chat.last_message.created_at || chat.created_at
    return {
      date: convertDate(date)
    }
  }

  const renderChats = () =>
    chats &&
    chats.map((chat) => {
      return (
        <Link
          key={chat.id}
          to={`${chat.id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div className={styles.meta}>
            <ProfileMeta {...getProfileMeta(chat)} />
            <MessageMeta {...getMessageMeta(chat)} />
          </div>
        </Link>
      )
    })

  return (
    <>
      <Header className={styles.header}>
        <Link to="profile">
          <Button>
            <MenuIcon />
          </Button>
        </Link>
        <Button>
          <SearchIcon />
        </Button>
      </Header>
      <Wrapper className={styles.wrapper}>
        {renderChats()}
        <Button variant={'gradient'} className={styles.create}>
          <CreateIcon />
        </Button>
      </Wrapper>
    </>
  )
}

export default PageChatList
