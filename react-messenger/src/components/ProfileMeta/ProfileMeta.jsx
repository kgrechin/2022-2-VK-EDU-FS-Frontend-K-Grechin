import logo from '../../images/account.png'

import styles from './ProfileMeta.module.scss'

const ProfileMeta = ({ avatar, name, activity }) => {
  return (
    <div className={styles.meta}>
      {avatar ? (
        <img src={avatar} alt={''} className={styles.image} />
      ) : (
        <img src={logo} alt={''} className={styles.image} />
      )}
      <div className={styles.data}>
        <span className={styles.name}>{name}</span>
        <span className={styles.activity}>{activity}</span>
      </div>
    </div>
  )
}

export default ProfileMeta
