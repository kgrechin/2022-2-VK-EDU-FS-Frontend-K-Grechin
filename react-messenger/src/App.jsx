import { HashRouter, Route, Routes } from 'react-router-dom'

import PageChat from './pages/PageChat'
import PageChatList from './pages/PageChatList'
import PageLogin from './pages/PageLogin'
import PageProfile from './pages/PageProfile'

import PrivateRoute from './utils/PrivateRoute'

import { ToastContainer } from 'react-toastify'

import { AttachmentProvider } from './contexts/AttachmentContext'
import { CentrifugoProvider } from './contexts/CentrifugoContext'
import { LoginProvider } from './contexts/LoginContext'

const App = () => {
  return (
    <HashRouter>
      <LoginProvider>
        <CentrifugoProvider>
          <Routes>
            <Route
              path={'/'}
              element={
                <PrivateRoute>
                  <PageChatList />
                </PrivateRoute>
              }
            />
            <Route
              path="/:uuid"
              element={
                <PrivateRoute>
                  <AttachmentProvider>
                    <PageChat />
                  </AttachmentProvider>
                </PrivateRoute>
              }
            />
            <Route
              path={'/login'}
              element={
                <PrivateRoute loginPage={true}>
                  <PageLogin />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <PageProfile />
                </PrivateRoute>
              }
            />
          </Routes>
          <ToastContainer />
        </CentrifugoProvider>
      </LoginProvider>
    </HashRouter>
  )
}

export default App
