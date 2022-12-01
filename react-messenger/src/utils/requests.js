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
  const response = await fetch(`${API_URL}/api/messages/${chat_id}/`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Authorization: 'Bearer ' + access_token,
      'Content-Type': 'application/json'
    }
  })
  return await response.json()
}
