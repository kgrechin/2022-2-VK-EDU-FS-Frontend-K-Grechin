import styles from './Wrapper.module.scss'

const Wrapper = ({ children, className, classNameContainer, dragProps }) => {
  return (
    <div className={`${styles.container} ${classNameContainer}`} {...dragProps}>
      <div children={children} className={`${styles.wrapper} ${className}`} />
    </div>
  )
}

export default Wrapper
