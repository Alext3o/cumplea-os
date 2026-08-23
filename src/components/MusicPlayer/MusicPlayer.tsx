import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { birthdayConfig } from '@/config/birthday'
import styles from './MusicPlayer.module.css'

interface MusicPlayerProps {
  autoPlay?: boolean
}

export default function MusicPlayer({ autoPlay = false }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [needsPrompt, setNeedsPrompt] = useState(false)
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Mostrar el player con un pequeño delay
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500)
    return () => clearTimeout(t)
  }, [])

  const startProgress = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      const audio = audioRef.current
      if (audio && audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }
    }, 500)
  }, [])

  const stopProgress = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }, [])

  useEffect(() => {
    const audio = new Audio(birthdayConfig.music.src)
    audio.loop = true
    audio.volume = 0.55
    audio.preload = 'auto'
    audioRef.current = audio

    audio.addEventListener('play', startProgress)
    audio.addEventListener('pause', stopProgress)
    audio.addEventListener('ended', stopProgress)

    if (autoPlay) {
      audio.play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch(() => {
          // El navegador bloqueó el autoplay — mostrar prompt
          setNeedsPrompt(true)
        })
    }

    return () => {
      audio.pause()
      audio.removeEventListener('play', startProgress)
      audio.removeEventListener('pause', stopProgress)
      audio.removeEventListener('ended', stopProgress)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [autoPlay, startProgress, stopProgress])

  const handlePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play()
        .then(() => {
          setIsPlaying(true)
          setNeedsPrompt(false)
        })
        .catch(console.error)
    }
  }

  const handleMute = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !isMuted
    setIsMuted(m => !m)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.player}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          aria-label="Reproductor de música"
        >
          {needsPrompt && !isPlaying ? (
            <motion.button
              className={styles.promptBtn}
              onClick={handlePlayPause}
              whileTap={{ scale: 0.96 }}
            >
              {birthdayConfig.copy.musicPrompt}
            </motion.button>
          ) : (
            <div className={styles.controls}>
              {/* Barra de progreso */}
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className={styles.row}>
                {/* Info */}
                <div className={styles.info}>
                  <span className={styles.dot} aria-hidden="true">
                    {isPlaying ? (
                      <span className={styles.equalizer}>
                        <span /><span /><span />
                      </span>
                    ) : '♪'}
                  </span>
                  <div className={styles.trackInfo}>
                    <span className={styles.trackTitle}>{birthdayConfig.music.title}</span>
                    <span className={styles.trackArtist}>{birthdayConfig.music.artist}</span>
                  </div>
                </div>

                {/* Botones */}
                <div className={styles.buttons}>
                  <button
                    className={styles.iconBtn}
                    onClick={handlePlayPause}
                    aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                  >
                    {isPlaying ? (
                      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>

                  <button
                    className={styles.iconBtn}
                    onClick={handleMute}
                    aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                  >
                    {isMuted ? (
                      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
