import { createContext, useEffect, useState } from 'react'

export const LoginContext = createContext()

export const LoginProvider = ({ children }) => {
  const [tokens, setTokens] = useState(
    () => JSON.parse(localStorage.getItem('tokens')) || null
  )

  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem('user')) || null
  )

  useEffect(() => {
    localStorage.setItem('tokens', JSON.stringify(tokens))
  }, [tokens])

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  return (
    <LoginContext.Provider
      children={children}
      value={{ tokens, setTokens, user, setUser }}
    />
  )
}
