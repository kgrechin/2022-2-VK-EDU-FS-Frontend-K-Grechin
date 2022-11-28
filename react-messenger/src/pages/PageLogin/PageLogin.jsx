import { useGoogleLogin } from '@react-oauth/google'
import { useContext } from 'react'

import { LoginContext } from '../../contexts/LoginContext'

import { getTokens, getUser } from '../../utils/requests'

import Button from '../../components/Button'
import Wrapper from '../../components/Wrapper'

import styles from './PageLogin.module.scss'

const PageLogin = () => {
  const { setTokens, setUser } = useContext(LoginContext)

  const login = useGoogleLogin({
    onSuccess: async (tokensResponse) => {
      const tokens = await getTokens(tokensResponse.access_token)
      setTokens(tokens)

      const user = await getUser(tokens.access_token)
      setUser(user)
    },
  })

  return (
    <>
      <Wrapper className={styles.wrapper}>
        <Button onClick={login} className={styles.button}>
          <img src={'/img/login.png'} alt={''} />
        </Button>
      </Wrapper>
    </>
  )
}

export default PageLogin
