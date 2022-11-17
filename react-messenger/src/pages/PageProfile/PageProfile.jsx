import { useState } from 'react'
import { Link } from 'react-router-dom'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckIcon from '@mui/icons-material/Check'

import Button from '../../components/Button'
import Header from '../../components/Header'
import ProfileForm from '../../components/ProfileForm'
import Wrapper from '../../components/Wrapper'

import styles from './PageProfile.module.scss'

const user = {
  image: '',
  name: 'Jony',
  username: 'jjjony',
  bio: 'ya jony',
}

const PageProfile = () => {
  const [profile, setProfile] = useState(user)

  const applyProfileChanges = () => {
    // тут потом POST наверна
  }

  const changeProfile = (key, value) => {
    const newProfile = { ...profile }
    newProfile[key] = value
    setProfile(newProfile)
  }

  return (
    <>
      <Header className={styles.header}>
        <Link to="/">
          <Button>
            <ArrowBackIcon />
          </Button>
        </Link>
        <Button onClick={applyProfileChanges}>
          <CheckIcon />
        </Button>
      </Header>
      <Wrapper className={styles.wrapper}>
        <ProfileForm profile={profile} changeProfile={changeProfile} />
      </Wrapper>
    </>
  )
}

export default PageProfile
