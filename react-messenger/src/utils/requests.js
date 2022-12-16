import axios from 'axios'

const API_URL = process.env.REACT_APP_BACKEND_URL

export const getTokens = async (googleToken) => {
  const response = await fetch(`${API_URL}/auth/convert-token/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      grant_type: process.env.REACT_APP_GRAND_TYPE,
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      backend: process.env.REACT_APP_BACKEND,
      token: googleToken
    })
  })
  return await response.json()
}

export const getCentrifugeToken = (url, ctx, access_token) =>
  new Promise((resolve, reject) =>
    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + access_token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ctx)
    })
      .then((response) => response.json())
      .then((data) => resolve(data.token))
      .catch((error) => reject(error))
  )

export const getUser = async (access_token) => {
  const response = await fetch(`${API_URL}/api/user/`, {
    headers: {
      Authorization: 'Bearer ' + access_token
    }
  })
  return await response.json()
}

export const getChats = async (access_token) => {
  const response = await fetch(`${API_URL}/api/chats/`, {
    headers: {
      Authorization: 'Bearer ' + access_token
    }
  })
  return await response.json()
}

export const getChatMessages = async (access_token, chat_id) => {
  const response = await fetch(`${API_URL}/api/messages/${chat_id}/`, {
    headers: {
      Authorization: 'Bearer ' + access_token
    }
  })
  return await response.json()
}

export const sendMessageToChat = async (access_token, chat_id, body) => {
  axios
    .post(`${API_URL}/api/messages/${chat_id}/`, body, {
      headers: {
        Authorization: 'Bearer ' + access_token,
        'content-type': 'multipart/form-data'
      }
    })
    .then((res) => res.data)
    .catch((err) => console.log(err))
}
