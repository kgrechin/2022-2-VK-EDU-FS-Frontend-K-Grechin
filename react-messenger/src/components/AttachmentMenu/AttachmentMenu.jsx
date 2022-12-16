import HeadphonesIcon from '@mui/icons-material/Headphones'
import ImageIcon from '@mui/icons-material/Image'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import PersonIcon from '@mui/icons-material/Person'
import PlaceIcon from '@mui/icons-material/Place'

import { useContext, useRef } from 'react'
import { AttachmentContext } from '../../contexts/AttachmentContext'

import Button from '../Button'
import Wrapper from '../Wrapper'

import styles from './AttachmentMenu.module.scss'

const AttachmentMenu = () => {
  const hiddenImageInput = useRef(null)
  const { setInput, setImages, setAttachmentMenu } = useContext(AttachmentContext)

  const setGeolocation = () => {
    const success = ({ coords }) => {
      const url = `https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}`
      setInput((prev) => prev.trim() + ' ' + url)
    }
    navigator.geolocation.getCurrentPosition(success, () => alert('error'))
    setAttachmentMenu(false)
  }

  return (
    <Wrapper
      className={styles.modal}
      classNameContainer={styles.modalContainer}
    >
      <Button onClick={() => hiddenImageInput.current.click()}>
        <ImageIcon />
      </Button>
      <input
        type="file"
        ref={hiddenImageInput}
        style={{ display: 'none' }}
        multiple={true}
        accept={'image/png, image/jpeg'}
        onChange={(event) => {
          setImages((prev) => [...prev, ...event.target.files])
          setAttachmentMenu(false)
        }}
      />
      <Button onClick={setGeolocation}>
        <PlaceIcon />
      </Button>
      <Button>
        <InsertDriveFileIcon />
      </Button>
      <Button>
        <HeadphonesIcon />
      </Button>
      <Button>
        <PersonIcon />
      </Button>
    </Wrapper>
  )
}

export default AttachmentMenu
