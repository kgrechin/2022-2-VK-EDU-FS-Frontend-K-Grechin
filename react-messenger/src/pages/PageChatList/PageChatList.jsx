import CreateIcon from '@mui/icons-material/Create'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'

import Button from '../../components/Button'
import Header from '../../components/Header'
import MessageMeta from '../../components/MessageMeta'
import ProfileMeta from '../../components/ProfileMeta'
import Wrapper from '../../components/Wrapper'

import styles from './PageChatList.module.scss'

const profileMeta = {
  name: 'Дженнифер',
  activity: 'Ну чо там как там',
  image: 'https://bit.ly/3TbYR88',
}

const messageMeta = {
  date: '21:48',
  status: 'done_all',
}

const PageChatList = ({ setPage }) => {
  return (
    <>
      <Header className={styles.header}>
        <Button>
          <MenuIcon />
        </Button>
        <Button>
          <SearchIcon />
        </Button>
      </Header>
      <Wrapper className={styles.wrapper}>
        <div className={styles.meta} onClick={() => setPage('chat')}>
          <ProfileMeta {...profileMeta} />
          <MessageMeta {...messageMeta} />
        </div>
        <Button variant={'gradient'} className={styles.create}>
          <CreateIcon />
        </Button>
      </Wrapper>
    </>
  )
}

export default PageChatList
