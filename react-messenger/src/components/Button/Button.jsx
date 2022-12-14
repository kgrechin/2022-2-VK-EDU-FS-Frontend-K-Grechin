import styles from './Button.module.scss'

const Button = ({
  children,
  className,
  onClick,
  disabled,
  variant = 'default'
}) => {
  return (
    <button
      aria-label={'button_component'}
      onClick={onClick}
      disabled={disabled}
      children={children}
      className={`${styles[variant]} ${className}`}
    />
  )
}

export default Button
