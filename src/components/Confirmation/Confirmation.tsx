import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { birthdayConfig } from '@/config/birthday'
import { saveBirthdayResponse } from '@/lib/supabase'
import styles from './Confirmation.module.css'

interface ConfirmationProps {
  startDate: Date
  endDate: Date
  duration: number
  onComplete: () => void
}

export default function Confirmation({ startDate, endDate, duration, onComplete }: ConfirmationProps) {
  const [phase, setPhase] = useState<'saving' | 'confirmed' | 'error'>('saving')
  const { confirmation } = birthdayConfig.copy

  const formatDate = (d: Date) => format(d, "d 'de' MMMM", { locale: es })

  useEffect(() => {
    const save = async () => {
      const startStr = format(startDate, 'yyyy-MM-dd')
      const endStr   = format(endDate,   'yyyy-MM-dd')

      console.log('[Supabase] Intentando guardar:', { startStr, endStr, duration })
      console.log('[Supabase] URL:', import.meta.env.VITE_SUPABASE_URL)
      console.log('[Supabase] Key (primeros 20 chars):', import.meta.env.VITE_SUPABASE_ANON_KEY?.slice(0, 20))

      const { error } = await saveBirthdayResponse(startStr, endStr, duration)

      if (error) {
        console.error('[Supabase] ERROR al guardar:', error)
      } else {
        console.log('[Supabase] ✓ Guardado correctamente')
      }

      setTimeout(() => setPhase('confirmed'), 800)
    }

    save()
  }, [startDate, endDate, duration])

  return (
    <div className={styles.wrapper}>
      {phase === 'saving' && (
        <motion.div
          className={styles.saving}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className={styles.spinner} />
        </motion.div>
      )}

      {phase === 'confirmed' && (
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Ícono de corazón animado */}
          <motion.div
            className={styles.heart}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.3, 1] }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            ❤️
          </motion.div>

          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {confirmation.line1}
          </motion.h2>

          <motion.div
            className={styles.dateCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <span className={styles.dateText}>
              {formatDate(startDate)} → {formatDate(endDate)}
            </span>
            <span className={styles.durationText}>
              {duration} días
            </span>
          </motion.div>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            {confirmation.line2}
          </motion.p>

          <motion.button
            className={styles.btn}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={onComplete}
          >
            Ver cuenta regresiva →
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}
