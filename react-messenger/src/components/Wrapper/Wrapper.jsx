import styles from './Wrapper.module.scss'

const Wrapper = ({ children, className }) => {
  return (
    <div className={styles.container}>
      <div children={children} className={`${styles.wrapper} ${className}`} />
    </div>
  )
}

export default Wrapper
