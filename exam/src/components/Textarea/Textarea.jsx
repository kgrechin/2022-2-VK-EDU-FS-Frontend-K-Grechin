import styles from './Textarea.module.scss'

const Textarea = ({ variant = 'default', setInput, text }) => {
  const placeholder = variant === 'default' ? 'Введите текст' : ''

  return (
    <div className={`${styles.container} ${styles[variant]}`}>
      <textarea
        disabled={variant !== 'default'}
        value={text}
        onChange={(e) => setInput(e.target.value)}
        className={styles.textarea}
        placeholder={placeholder}
      />
    </div>
  )
}

export default Textarea
