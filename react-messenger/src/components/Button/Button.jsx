import styles from './Button.module.scss'

const Button = ({ children, className, onClick, variant = 'default' }) => {
  return (
    <button
      onClick={onClick}
      children={children}
      className={`${styles[variant]} ${className}`}
    />
  )
}

export default Button
