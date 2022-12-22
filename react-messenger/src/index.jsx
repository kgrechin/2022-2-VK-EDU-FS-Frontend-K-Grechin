import { GoogleOAuthProvider } from '@react-oauth/google'
import { GOOGLE_CLIENT_ID } from './constants/api'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import AuthManager from './AuthManager'
import store from './store'

import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthManager />
    </GoogleOAuthProvider>
  </Provider>
)
