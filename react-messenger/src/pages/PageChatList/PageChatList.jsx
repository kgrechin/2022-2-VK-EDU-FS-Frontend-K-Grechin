import CreateIcon from '@mui/icons-material/Create'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'

import { Link } from 'react-router-dom'

import Button from '../../components/Button'
import Header from '../../components/Header'
import MessageMeta from '../../components/MessageMeta'
import ProfileMeta from '../../components/ProfileMeta'
import Wrapper from '../../components/Wrapper'

import styles from './PageChatList.module.scss'

// будет GET с получением чатов и цикл с выводом и добавлением ссылок
const chatID = '111'

const profileMeta = {
  name: 'Дженнифер',
  activity: 'Ну чо там как там',
  image: 'https://bit.ly/3TbYR88',
}

const messageMeta = {
  date: '21:48',
  status: 'done_all',
}

const PageChatList = () => {
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
        <Link to={`chat/${chatID}`} style={{ textDecoration: 'none' }}>
          <div className={styles.meta}>
            <ProfileMeta {...profileMeta} />
            <MessageMeta {...messageMeta} />
          </div>
        </Link>
        <Button variant={'gradient'} className={styles.create}>
          <CreateIcon />
        </Button>
      </Wrapper>
    </>
  )
}

export default PageChatList
