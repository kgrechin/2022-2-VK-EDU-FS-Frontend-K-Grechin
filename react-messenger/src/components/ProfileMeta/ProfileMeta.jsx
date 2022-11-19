import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import styles from './ProfileMeta.module.scss'

const ProfileMeta = ({ image, name, activity }) => {
  return (
    <div className={styles.meta}>
      {image ? (
        <img src={image} alt={''} className={styles.image} />
      ) : (
        <AccountCircleIcon className={styles.image} />
      )}
      <div className={styles.data}>
        <span className={styles.name}>{name}</span>
        <span className={styles.activity}>{activity}</span>
      </div>
    </div>
  )
}

export default ProfileMeta
