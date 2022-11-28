import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import styles from './ProfileForm.module.scss'

const ProfileForm = ({ profile, changeProfile }) => {
  const { image, name, username, bio } = profile

  return (
    <div className={styles.form}>
      {image ? (
        <img src={image} alt={''} className={styles.image} />
      ) : (
        <img src={'/img/account.png'} alt={''} className={styles.image} />
      )}
      <div className={styles.inputblock}>
        <label>Имя</label>
        <input
          type="text"
          value={name}
          onChange={(event) => changeProfile('name', event.target.value)}
        />
      </div>
      <div className={styles.inputblock}>
        <label>Имя пользователя</label>
        <input
          type="text"
          value={username}
          onChange={(event) => changeProfile('username', event.target.value)}
        />
      </div>
      <div className={styles.inputblock}>
        <label>О себе</label>
        <textarea
          type="text"
          value={bio}
          onChange={(event) => changeProfile('bio', event.target.value)}
        />
      </div>
    </div>
  )
}

export default ProfileForm
