import { createContext, useState } from 'react'
import { useDropzone } from 'react-dropzone'

export const AttachmentContext = createContext()

export const AttachmentProvider = ({ children }) => {
  const [input, setInput] = useState('')
  const [images, setImages] = useState([])
  const [attachmentMenu, setAttachmentMenu] = useState(false)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': ['.png', '.gif', '.jpeg', '.jpg'] },
    onDrop: (files) => setImages((prev) => [...prev, ...files]),
    noClick: true
  })

  const toggleAttachmentMenu = () => setAttachmentMenu((prev) => !prev)

  return (
    <AttachmentContext.Provider
      children={children}
      value={{
        input,
        setInput,
        images,
        setImages,
        attachmentMenu,
        setAttachmentMenu,
        toggleAttachmentMenu,
        getRootProps,
        getInputProps,
        isDragActive
      }}
    />
  )
}
