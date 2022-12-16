import React, { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'

import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import Button from '../Button'

import styles from './VoiceMessage.module.scss'

const convertSeconds = (seconds) =>
  seconds / 3600 >= 1
    ? new Date(seconds * 1000).toISOString().slice(11, 19)
    : new Date(seconds * 1000).toISOString().slice(14, 19)

const VoiceMessage = ({ audioFile, url, style }) => {
  const waveformRef = useRef()

  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [waveSurfer, setWaveSurfer] = useState(null)

  useEffect(() => {
    if (waveformRef.current) {
      const surfer = WaveSurfer.create({
        container: waveformRef.current,
        backend: 'WebAudio',
        height: 40,
        progressColor: '#046945',
        responsive: true,
        waveColor: '#aaaaaa',
        cursorColor: 'transparent',
        hideScrollbar: true,
        barWidth: 2,
        barMinHeight: 2,
        barRadius: 2,
        barGap: 2
      })
      surfer.on('play', () => {
        surfer.setProgressColor('#046945')
      })
      surfer.on('finish', () => {
        setIsPlaying(false)
        surfer.setProgressColor('#aaaaaa')
      })
      surfer.on('ready', () => {
        setDuration(convertSeconds(surfer.getDuration()))
      })
      surfer.on('audioprocess', () => {
        setTime(convertSeconds(surfer.getCurrentTime()))
      })
      setWaveSurfer(surfer)
    }
  }, [])

  useEffect(() => {
    if (waveSurfer) {
      url ? waveSurfer.load(url) : waveSurfer.loadBlob(audioFile)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waveSurfer])

  const togglePlayPause = () => {
    waveSurfer.playPause()
    setIsPlaying(!isPlaying)
  }

  return (
    <div className={styles.wrapper} style={style}>
      <Button onClick={() => togglePlayPause()}>
        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      </Button>
      <div className={styles.time}>{!isPlaying ? duration : time}</div>
      <div ref={waveformRef} className={styles.wave}></div>
    </div>
  )
}

export default VoiceMessage
