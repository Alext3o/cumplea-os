import { useEffect, useRef } from 'react'
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

export default function Countdown({
  startDate,
  experienceState,
  extraMessage,
  onReveal,
}: CountdownProps) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(startDate)
  const { waiting } = birthdayConfig.copy
  const hasTriggeredReveal = useRef(false)

  const formatDate = (d: Date) => format(d, "d 'de' MMMM, yyyy", { locale: es })

  // Cuando el estado es REVEAL o FINAL (activado desde admin), o el timer llegó a 0
  useEffect(() => {
    if (hasTriggeredReveal.current) return

    if (isExpired && (experienceState === 'REVEAL' || experienceState === 'FINAL')) {
      hasTriggeredReveal.current = true
      setTimeout(() => onReveal?.(), 2000)
    } else if (experienceState === 'REVEAL' || experienceState === 'FINAL') {
      // Admin activó la revelación antes de que llegue la fecha
      hasTriggeredReveal.current = true
      setTimeout(() => onReveal?.(), 1500)
    }
  }, [isExpired, experienceState, onReveal])

  return (
    <div className={styles.wrapper}>
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

      {/* Fondo decorativo */}
      <div className={styles.bgDeco} aria-hidden="true" />
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
