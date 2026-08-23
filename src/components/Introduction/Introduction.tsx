import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { birthdayConfig } from '@/config/birthday'
import styles from './Introduction.module.css'

interface IntroductionProps {
  onComplete: () => void
}

export default function Introduction({ onComplete }: IntroductionProps) {
  const [step, setStep] = useState<0 | 1 | 2>(0)

  useEffect(() => {
    // Secuencia de aparición
    const t1 = setTimeout(() => setStep(1), 800)
    const t2 = setTimeout(() => setStep(2), 3000)
    const t3 = setTimeout(() => onComplete(), 5200)

    return () => {
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
      <div className={styles.content}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.h2
              key="line1"
              className={styles.line}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {birthdayConfig.copy.introduction.line1}
            </motion.h2>
          )}

          {step === 2 && (
            <motion.h2
              key="line2"
              className={`${styles.line} ${styles.lineBold}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {birthdayConfig.copy.introduction.line2}
            </motion.h2>
          )}
        </AnimatePresence>
      </div>

      {/* Línea decorativa */}
      <motion.div
        className={styles.line_deco}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 1.2 }}
      />
    </motion.div>
  )
}
