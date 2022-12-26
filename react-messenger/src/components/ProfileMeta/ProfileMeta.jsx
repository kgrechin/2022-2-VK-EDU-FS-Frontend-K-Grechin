import parseEmojis from '../../utils/parseEmojis'
import styles from './ProfileMeta.module.scss'

const ProfileMeta = ({ avatar, name, activity }) => {
  return (
    <div className={styles.meta}>
      <img src={avatar} alt={''} className={styles.image} />
      <div className={styles.data}>
        <span className={styles.name}>{name}</span>
        <span className={styles.activity}>{parseEmojis(activity)}</span>
      </div>
    </div>
  )
}

export default ProfileMeta
