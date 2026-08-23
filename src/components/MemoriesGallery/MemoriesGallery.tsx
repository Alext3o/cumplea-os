import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { birthdayConfig } from '@/config/birthday'
import type { Memory, MemoryLayout } from '@/config/birthday'
import styles from './MemoriesGallery.module.css'

interface MemoriesGalleryProps {
  onComplete: () => void
}

export default function MemoriesGallery({ onComplete }: MemoriesGalleryProps) {
  const memories = birthdayConfig.memories
  const endRef = useRef<HTMLDivElement>(null)
  const endInView = useInView(endRef, { once: true, margin: '-80px' })

  return (
    <div className={styles.wrapper}>
      {/* Intro de la galería */}
      <motion.div
        className={styles.galleryIntro}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      >
        <div className={styles.introLine} />
        <p className={styles.introText}>nuestros recuerdos</p>
        <div className={styles.introLine} />
      </motion.div>

      {/* Fotos */}
      <div className={styles.gallery}>
        {memories.map((memory, i) => (
          <MemoryItem key={i} memory={memory} index={i} />
        ))}
      </div>

      {/* Sección de cierre antes del mensaje final */}
      <div ref={endRef} className={styles.endSection}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={endInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <motion.button
            className={styles.continueBtn}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={onComplete}
          >
            Continuar →
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

// ─── Componente individual de recuerdo ───────────────────────
interface MemoryItemProps {
  memory: Memory
  index: number
}

// Rotaciones por layout para que parezca orgánico
const ROTATIONS: Record<MemoryLayout, number[]> = {
  polaroid:   [-3, 2, -1.5, 3, -2.5],
  large:      [0, 0, 0, 0],
  small:      [-1.5, 2, -2, 1],
  fullscreen: [0, 0],
  left:       [-1, 1.5, -0.5],
  right:      [1, -1.5, 0.5],
  centered:   [0, 0],
}

// Delays escalonados para grupos de fotos
function getDelay(index: number): number {
  return (index % 3) * 0.1
}

function MemoryItem({ memory, index }: MemoryItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  // Parallax sutil solo en desktop
  const y = useTransform(scrollYProgress, [0, 1], [30, -30])

  const rotations = ROTATIONS[memory.layout]
  const rotation = rotations[index % rotations.length]
  const delay = getDelay(index)

  const wrapperClass = `${styles.memoryItem} ${styles[`layout_${memory.layout}`]}`

  // Variantes de animación según layout
  const variants = {
    hidden: getHiddenVariant(memory.layout),
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      filter: 'blur(0px)',
      rotate: rotation,
      transition: {
        duration: 1.1,
        delay,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={wrapperClass}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
    >
      {memory.layout === 'fullscreen' ? (
        /* Fullscreen con parallax */
        <div className={styles.fullscreenFrame}>
          <motion.img
            src={memory.src}
            alt={`Recuerdo ${index + 1}`}
            loading="lazy"
            className={styles.fullscreenImg}
            style={{ y }}
          />
          {memory.text && (
            <div className={styles.fullscreenCaption}>
              <motion.p
                className={styles.captionText}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: delay + 0.5, duration: 0.9 }}
              >
                {memory.text}
              </motion.p>
            </div>
          )}
        </div>
      ) : memory.layout === 'polaroid' ? (
        /* Polaroid */
        <div className={styles.polaroidFrame}>
          <img
            src={memory.src}
            alt={`Recuerdo ${index + 1}`}
            loading="lazy"
            className={styles.polaroidImg}
          />
          <div className={styles.polaroidBottom}>
            {memory.text && (
              <p className={styles.polaroidCaption}>{memory.text}</p>
            )}
          </div>
        </div>
      ) : (
        /* Todos los demás layouts */
        <div className={styles.standardFrame}>
          <img
            src={memory.src}
            alt={`Recuerdo ${index + 1}`}
            loading="lazy"
            className={styles.standardImg}
          />
          {memory.text && (
            <motion.p
              className={styles.standardCaption}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: delay + 0.6, duration: 0.8 }}
            >
              {memory.text}
            </motion.p>
          )}
        </div>
      )}
    </motion.div>
  )
}

function getHiddenVariant(layout: MemoryLayout) {
  switch (layout) {
    case 'left':
      return { opacity: 0, x: -40, y: 0, scale: 1, filter: 'blur(4px)', rotate: 0 }
    case 'right':
      return { opacity: 0, x: 40, y: 0, scale: 1, filter: 'blur(4px)', rotate: 0 }
    case 'fullscreen':
      return { opacity: 0, x: 0, y: 0, scale: 1.03, filter: 'blur(6px)', rotate: 0 }
    case 'polaroid':
      return { opacity: 0, x: 0, y: 50, scale: 0.92, filter: 'blur(4px)', rotate: 0 }
    default:
      return { opacity: 0, x: 0, y: 40, scale: 0.96, filter: 'blur(4px)', rotate: 0 }
  }
}
