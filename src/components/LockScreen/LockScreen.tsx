import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DayPicker } from 'react-day-picker'
import { format, isSameDay } from 'date-fns'
import { es } from 'date-fns/locale'
import { birthdayConfig } from '@/config/birthday'
import 'react-day-picker/dist/style.css'
import styles from './LockScreen.module.css'

interface LockScreenProps {
  onUnlock: () => void
}

const CORRECT_DATE = new Date(birthdayConfig.storyStartDate + 'T12:00:00')
const WRONG_MESSAGES = birthdayConfig.copy.lockScreen.wrongDate
const LOCK_PHOTOS = birthdayConfig.lockPhotos as unknown as string[]

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const [selected, setSelected] = useState<Date | undefined>(undefined)
  const [wrongCount, setWrongCount] = useState(0)
  const [showWrong, setShowWrong] = useState(false)
  const [unlocking, setUnlocking] = useState(false)
  const wrongTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleSelect = (date: Date | undefined) => {
    if (!date || unlocking) return
    setSelected(date)

    if (isSameDay(date, CORRECT_DATE)) {
      // ¡Correcto!
      setUnlocking(true)
      setTimeout(() => onUnlock(), 1800)
    } else {
      // Incorrecto
      if (wrongTimeout.current) clearTimeout(wrongTimeout.current)
      setShowWrong(true)
      setWrongCount(c => c + 1)
      wrongTimeout.current = setTimeout(() => setShowWrong(false), 2800)
    }
  }

  const wrongMsg = WRONG_MESSAGES[wrongCount % WRONG_MESSAGES.length]

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {/* Fondo con fotos + partículas */}
      <div className={styles.bg} aria-hidden="true">
        {/* Fotos de fondo */}
        {LOCK_PHOTOS.map((src, i) => (
          <motion.img
            key={i}
            src={src}
            alt=""
            className={`${styles.bgPhoto} ${i === 0 ? styles.bgPhotoLeft : styles.bgPhotoRight}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.3, duration: 1.2 }}
          />
        ))}
        {/* Overlay oscuro sobre las fotos */}
        <div className={styles.bgOverlay} />
        {/* Partículas */}
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={`p${i}`} className={styles.particle} style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 6}s`,
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
          }} />
        ))}
      </div>

      <div className={styles.content}>
        {/* Candado */}
        <motion.div
          className={styles.lockIcon}
          animate={
            unlocking
              ? { scale: [1, 1.25, 0.9, 1.1, 1], rotate: [0, -8, 8, -4, 0] }
              : showWrong
              ? { x: [0, -6, 6, -4, 4, 0] }
              : {}
          }
          transition={{ duration: 0.5 }}
        >
          <motion.span
            animate={unlocking ? { opacity: 0 } : { opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className={styles.lockEmoji}
          >
            {unlocking ? '🔓' : '🔒'}
          </motion.span>

          {/* Resplandor al desbloquear */}
          <AnimatePresence>
            {unlocking && (
              <motion.div
                className={styles.glow}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 2.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Texto principal */}
        <motion.div
          className={styles.textBlock}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className={styles.title}>{birthdayConfig.copy.lockScreen.title}</h1>
          <p className={styles.subtitle}>{birthdayConfig.copy.lockScreen.subtitle}</p>
        </motion.div>

        {/* Pregunta */}
        <motion.div
          className={styles.questionBlock}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p className={styles.question}>{birthdayConfig.copy.lockScreen.question}</p>
        </motion.div>

        {/* Date Picker */}
        <motion.div
          className={styles.pickerWrapper}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            locale={es}
            captionLayout="dropdown"
            fromYear={2018}
            toYear={2026}
            showOutsideDays
            disabled={unlocking}
            formatters={{
              formatCaption: (date) =>
                format(date, 'MMMM yyyy', { locale: es }),
            }}
          />
        </motion.div>

        {/* Mensaje de fecha incorrecta */}
        <AnimatePresence>
          {showWrong && (
            <motion.p
              key={wrongCount}
              className={styles.wrongMsg}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
            >
              {wrongMsg}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Texto mientras desbloquea */}
        <AnimatePresence>
          {unlocking && (
            <motion.p
              className={styles.unlockingMsg}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              ✨
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
