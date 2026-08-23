import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { birthdayConfig } from '@/config/birthday'
import styles from './IntroMemories.module.css'

interface IntroMemoriesProps {
  onComplete: () => void
}

// Rotaciones sutiles alternadas para las fotos
const ROTATIONS = [-2.5, 1.8, -1.2, 2.8, -0.8, 1.5]

export default function IntroMemories({ onComplete }: IntroMemoriesProps) {
  const photos = birthdayConfig.introPhotos
  const endRef = useRef<HTMLDivElement>(null)
  const endInView = useInView(endRef, { once: true, margin: '-100px' })

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <span className={styles.headerLine} />
        <p className={styles.headerText}>antes de continuar...</p>
        <span className={styles.headerLine} />
      </motion.div>

      {/* Fotos */}
      <div className={styles.photoGrid}>
        {photos.map((photo, i) => (
          <PhotoItem key={i} photo={photo} index={i} rotation={ROTATIONS[i % ROTATIONS.length]} />
        ))}
      </div>

      {/* CTA para continuar */}
      <div ref={endRef} className={styles.cta}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={endInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          <motion.button
            className={styles.continueBtn}
            onClick={onComplete}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Continuar →
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

// ─── Componente individual de foto ───────────────────────────
interface PhotoItemProps {
  photo: (typeof birthdayConfig.introPhotos)[number]
  index: number
  rotation: number
}

function PhotoItem({ photo, index, rotation }: PhotoItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      className={`${styles.photoItem} ${isEven ? styles.photoLeft : styles.photoRight}`}
      initial={{ opacity: 0, y: 50, rotate: rotation * 0.5 }}
      animate={inView ? { opacity: 1, y: 0, rotate: rotation } : {}}
      transition={{ duration: 1, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className={styles.photoFrame}>
        <img
          src={photo.src}
          alt={`Recuerdo ${index + 1}`}
          loading="lazy"
          className={styles.photo}
        />
      </div>

      {photo.text && (
        <motion.p
          className={styles.caption}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {photo.text}
        </motion.p>
      )}
    </motion.div>
  )
}
