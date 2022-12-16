import { useContext } from 'react'

import Button from '../Button'
import Wrapper from '../Wrapper'

import HighlightOffIcon from '@mui/icons-material/HighlightOff'

import { AttachmentContext } from '../../contexts/AttachmentContext'

import styles from './ImagesPreview.module.scss'

const ImagesPreview = () => {
  const { images, setImages } = useContext(AttachmentContext)

  const renderImages = () =>
    images.map((image) => (
      <div className={styles.imageContainer} key={URL.createObjectURL(image)}>
        <img src={URL.createObjectURL(image)} alt={''} />
        <Button
          className={styles.imageButton}
          onClick={() => removeImage(image)}
        >
          <HighlightOffIcon />
        </Button>
      </div>
    ))

  const removeImage = (image) => {
    const index = images.indexOf(image)
    const imagesCopy = [...images]
    imagesCopy.splice(index, 1)
    setImages(imagesCopy)
  }

  return (
    <Wrapper
      className={styles.modal}
      classNameContainer={styles.modalContainer}
    >
      {renderImages()}
    </Wrapper>
  )
}

export default ImagesPreview
