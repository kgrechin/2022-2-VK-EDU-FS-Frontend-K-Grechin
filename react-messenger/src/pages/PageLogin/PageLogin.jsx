import { useGoogleLogin } from '@react-oauth/google'
import { connect } from 'react-redux'

import Button from '../../components/Button'
import Wrapper from '../../components/Wrapper'

import { getAuthData } from '../../actions/auth'
import { MEDIA_URL } from '../../constants/api'

import styles from './PageLogin.module.scss'

const PageLogin = (props) => {
  const login = useGoogleLogin({
    onSuccess: ({ access_token }) => {
      props.getAuthData(access_token)
    }
  })

  return (
    <>
      <Wrapper className={styles.wrapper}>
        <Button onClick={login} className={styles.button}>
          <img src={`${MEDIA_URL}/login.png`} alt={''} />
        </Button>
      </Wrapper>
    </>
  )
}

export default connect(null, {
  getAuthData
})(PageLogin)
