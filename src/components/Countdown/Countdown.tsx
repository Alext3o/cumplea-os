import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useCountdown } from '@/hooks/useCountdown'
import { birthdayConfig } from '@/config/birthday'
import type { ExperienceState } from '@/config/birthday'
import styles from './Countdown.module.css'

interface CountdownProps {
  startDate: Date
  endDate: Date
  duration: number
  experienceState: ExperienceState
  extraMessage?: string | null
  onReveal?: () => void
}

// Fotos para el slideshow del fondo — usa las de memories
const SLIDESHOW_PHOTOS = birthdayConfig.memories.map(m => m.src)

export default function Countdown({
  startDate,
  experienceState,
  extraMessage,
  onReveal,
}: CountdownProps) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(startDate)
  const { waiting } = birthdayConfig.copy
  const hasTriggeredReveal = useRef(false)
  const [slideIndex, setSlideIndex] = useState(0)

  const formatDate = (d: Date) => format(d, "d 'de' MMMM, yyyy", { locale: es })

  // Slideshow — cambia foto cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex(i => (i + 1) % SLIDESHOW_PHOTOS.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Reveal logic
  useEffect(() => {
    if (hasTriggeredReveal.current) return
    if (isExpired && (experienceState === 'REVEAL' || experienceState === 'FINAL')) {
      hasTriggeredReveal.current = true
      setTimeout(() => onReveal?.(), 2000)
    } else if (experienceState === 'REVEAL' || experienceState === 'FINAL') {
      hasTriggeredReveal.current = true
      setTimeout(() => onReveal?.(), 1500)
    }
  }, [isExpired, experienceState, onReveal])

  return (
    <div className={styles.wrapper}>

      {/* ─── Slideshow de fondo ─── */}
      <div className={styles.slideshow} aria-hidden="true">
        <AnimatePresence mode="sync">
          <motion.img
            key={slideIndex}
            src={SLIDESHOW_PHOTOS[slideIndex]}
            alt=""
            className={styles.slideImg}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />
        </AnimatePresence>
        {/* Overlay oscuro para que el texto sea legible */}
        <div className={styles.slideOverlay} />
      </div>

      {/* ─── Contenido sobre el slideshow ─── */}
      <div className={styles.content}>

        {/* Línea de fecha destino */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9 }}
        >
          <span className={styles.headerLabel}>nuestra aventura comienza el</span>
          <span className={styles.headerDate}>{formatDate(startDate)}</span>
        </motion.div>

        {/* Contador */}
        <motion.div
          className={styles.counter}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
        >
          <p className={styles.faltan}>Faltan</p>

          <div className={styles.units}>
            <CountUnit value={days}    label="días"    />
            <span className={styles.sep}>:</span>
            <CountUnit value={hours}   label="horas"   />
            <span className={styles.sep}>:</span>
            <CountUnit value={minutes} label="min"     />
            <span className={styles.sep}>:</span>
            <CountUnit value={seconds} label="seg"     />
          </div>

          <p className={styles.forLabel}>para nuestra aventura.</p>
        </motion.div>

        {/* Indicadores del slideshow */}
        <div className={styles.dots}>
          {SLIDESHOW_PHOTOS.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === slideIndex ? styles.dotActive : ''}`}
              onClick={() => setSlideIndex(i)}
              aria-label={`Foto ${i + 1}`}
            />
          ))}
        </div>

        {/* Mensaje de espera */}
        <AnimatePresence>
          {experienceState === 'WAITING' && (
            <motion.div
              className={styles.waitingBlock}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1, duration: 0.9 }}
            >
              <p className={styles.waitLine}>{waiting.line1}</p>
              <p className={styles.waitLine}>{waiting.line2}</p>

              <div className={styles.divider} />

              <p className={styles.waitInstruction}>{waiting.line3}</p>
              <p className={styles.waitSmall}>{waiting.line4}</p>

              {extraMessage && (
                <motion.div
                  className={styles.extraMsg}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {extraMessage}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}

// ─── Unidad individual del contador ──────────────────────────
interface CountUnitProps {
  value: number
  label: string
}

function CountUnit({ value, label }: CountUnitProps) {
  const display = String(value).padStart(2, '0')

  return (
    <div className={styles.unit}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={display}
          className={styles.unitValue}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          {display}
        </motion.span>
      </AnimatePresence>
      <span className={styles.unitLabel}>{label}</span>
    </div>
  )
}
