import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SearchIcon from '@mui/icons-material/Search'

import Button from '../../components/Button'
import Header from '../../components/Header'
import Message from '../../components/Message'
import MessageForm from '../../components/MessageForm'
import ProfileMeta from '../../components/ProfileMeta'
import Wrapper from '../../components/Wrapper'

import styles from './PageChat.module.scss'

const profileMeta = {
  name: 'Дженнифер',
  activity: 'была 2 чаза назад',
  image: 'https://bit.ly/3TbYR88',
}

const PageChat = () => {
  const params = useParams()

  const [messages, setMessages] = useState(() => {
    return JSON.parse(localStorage.getItem('messages')) || []
  })

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages))
  }, [messages])

  const getMessages = () => {
    console.log(params)
    // здесь будет GET с id из useParamps
    return messages.map((item, index) => (
      <Message position={'right'} key={item.id} date={item.date}>
        {item.data}
      </Message>
    ))
  }

  return (
    <>
      <Header className={styles.header}>
        <Link to="/">
          <Button>
            <ArrowBackIcon />
          </Button>
        </Link>
        <ProfileMeta {...profileMeta} />
        <Button>
          <SearchIcon />
        </Button>
        <Button>
          <MoreVertIcon />
        </Button>
      </Header>
      <Wrapper className={styles.wrapper}>
        {getMessages()}
        <Message position={'right'} date={'21:50'}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque nemo
          quod ea veniam maiores voluptatum voluptate exercitationem vel ipsam
          rerum, ratione, amet excepturi aut a vero dicta consequuntur corrupti
          id?
        </Message>
        <Message position={'left'} date={'21:48'}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione quae
          iste cupiditate molestias! Numquam aliquid iusto aut ex repellat iste
          similique officiis facilis qui? Voluptatibus possimus cum atque
          maiores adipisci!
        </Message>
      </Wrapper>
      <div className={styles.input}>
        <MessageForm messages={messages} setMessages={setMessages} />
      </div>
    </>
  )
}

export default PageChat
