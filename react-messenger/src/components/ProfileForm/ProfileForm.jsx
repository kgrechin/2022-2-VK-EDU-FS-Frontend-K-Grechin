import styles from './ProfileForm.module.scss'

const ProfileForm = ({ profile, changeProfile }) => {
  const { image, name, username, bio } = profile

  return (
    <div className={styles.form}>
      <img src={image} alt={''} className={styles.image} />
      <div className={styles.inputblock}>
        <label>Имя</label>
        <input
          className={styles.input}
          type="text"
          value={name}
          onChange={(event) => changeProfile('name', event.target.value)}
        />
      </div>
      <div className={styles.inputblock}>
        <label>Имя пользователя</label>
        <input
          className={styles.input}
          type="text"
          value={username}
          onChange={(event) => changeProfile('username', event.target.value)}
        />
      </div>
      <div className={styles.inputblock}>
        <label>О себе</label>
        <textarea
          className={styles.textarea}
          type="text"
          value={bio}
          onChange={(event) => changeProfile('bio', event.target.value)}
        />
      </div>
    </div>
  )
}

export default ProfileForm
