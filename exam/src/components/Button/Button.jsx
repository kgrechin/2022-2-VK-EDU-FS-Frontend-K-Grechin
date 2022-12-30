import styles from './Button.module.scss'

const Button = (props) => {
  const { children } = props
  return (
    <button {...props} className={styles.button}>
      {children}
    </button>
  )
}

export default Button
