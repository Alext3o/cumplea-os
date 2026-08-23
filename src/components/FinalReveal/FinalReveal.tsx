import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { birthdayConfig } from '@/config/birthday'
import styles from './FinalReveal.module.css'

interface FinalRevealProps {
  onComplete: () => void
}

export default function FinalReveal({ onComplete }: FinalRevealProps) {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0)
  const { reveal } = birthdayConfig.copy

  useEffect(() => {
    // Secuencia cinematográfica
    const t0 = setTimeout(() => setPhase(1), 600)   // oscurecer
    const t1 = setTimeout(() => setPhase(2), 2000)  // primera línea
    const t2 = setTimeout(() => setPhase(3), 4200)  // segunda línea
    const t3 = setTimeout(() => onComplete(), 6500) // avanzar a galería

    return () => {
      clearTimeout(t0)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [onComplete])

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Overlay oscuro que cubre gradualmente */}
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
      />

      <div className={styles.content}>
        <AnimatePresence mode="wait">
          {phase === 2 && (
            <motion.h2
              key="line1"
              className={styles.line}
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {reveal.line1}
            </motion.h2>
          )}

          {phase === 3 && (
            <motion.h2
              key="line2"
              className={`${styles.line} ${styles.lineAccent}`}
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {reveal.line2}
            </motion.h2>
          )}
        </AnimatePresence>
      </div>

      {/* Línea de luz inferior */}
      <motion.div
        className={styles.lightLine}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: phase >= 2 ? 1 : 0,
          opacity: phase >= 2 ? 1 : 0,
        }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}
