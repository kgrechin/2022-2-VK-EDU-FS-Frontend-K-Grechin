import styles from './HistoryRecord.module.scss'

const HistoryRecord = ({ sourceLang, targetLang, sourceText, targetText }) => {
  return (
    <div className={styles.container}>
      <div className={styles.lang}>{sourceLang + ' -> ' + targetLang}</div>
      <div className={styles.source}>{sourceText}</div>
      <div className={styles.target}>{targetText}</div>
    </div>
  )
}

export default HistoryRecord
