import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { birthdayConfig } from '@/config/birthday'
import styles from './FinalMessage.module.css'

export default function FinalMessage() {
  const lastMemory = birthdayConfig.memories[birthdayConfig.memories.length - 1]
  const msgRef = useRef<HTMLDivElement>(null)
  const msgInView = useInView(msgRef, { once: true, margin: '-60px' })
  const { final } = birthdayConfig.copy

  return (
    <div className={styles.wrapper}>
      {/* Última fotografía especial */}
      <motion.div
        className={styles.lastPhotoSection}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      >
        <div className={styles.lastPhotoFrame}>
          <img
            src={lastMemory?.src ?? '/images/memories/photo-01.jpg'}
            alt="Nuestra última foto"
            loading="lazy"
            className={styles.lastPhoto}
          />
          {/* Overlay gradiente */}
          <div className={styles.photoOverlay} />
        </div>
      </motion.div>

      {/* Mensaje final */}
      <div ref={msgRef} className={styles.messageSection}>
        <motion.p
          className={styles.line1}
          initial={{ opacity: 0, y: 30 }}
          animate={msgInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {final.line1}
        </motion.p>

        {/* Línea dorada */}
        <motion.div
          className={styles.goldenLine}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={msgInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.8 }}
        />

        <motion.p
          className={styles.line2}
          initial={{ opacity: 0, y: 30 }}
          animate={msgInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.3 }}
        >
          {final.line2}
        </motion.p>

        <motion.h1
          className={styles.finalTitle}
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          animate={msgInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1.4, delay: 2 }}
        >
          {final.line3}
        </motion.h1>

        {/* Decoración final sutil */}
        <motion.div
          className={styles.finalDeco}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={msgInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 3 }}
        >
          <div className={styles.decoLine} />
          <span className={styles.decoHeart}>♡</span>
          <div className={styles.decoLine} />
        </motion.div>
      </div>
    </div>
  )
}
