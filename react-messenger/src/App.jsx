import { HashRouter, Routes, Route } from 'react-router-dom'

import PageChat from './pages/PageChat'
import PageChatList from './pages/PageChatList'
import PageProfile from './pages/PageProfile'

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<PageChatList />} />
        <Route path="chat/:id" element={<PageChat />} />
        <Route path="profile" element={<PageProfile />} />
      </Routes>
    </HashRouter>
  )
}

export default App
