import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { LoginContext } from '../contexts/LoginContext'

const PrivateRoute = ({ children, loginPage = false }) => {
  const { tokens, user } = useContext(LoginContext)
  if (loginPage) {
    return tokens && user ? <Navigate to={'/'} /> : children
  }
  return tokens && user ? children : <Navigate to={'/login'} />
}

export default PrivateRoute
