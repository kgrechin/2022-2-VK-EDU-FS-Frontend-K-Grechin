import { useState } from 'react'

import PageChat from './pages/PageChat'
import PageChatList from './pages/PageChatList'

const App = () => {
  const [page, setPage] = useState('chat')

  const changePage = (name) => {
    setPage(name)
  }

  return (
    <>
      {page === 'chat' && <PageChat setPage={changePage} />}
      {page === 'chatlist' && <PageChatList setPage={changePage} />}
    </>
  )
}

export default App
