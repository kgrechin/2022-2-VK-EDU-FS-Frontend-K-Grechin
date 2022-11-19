import styles from './Header.module.scss'

const Header = ({ children, className }) => {
  return <div children={children} className={`${styles.header} ${className}`} />
}

export default Header
