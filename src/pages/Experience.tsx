import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { parse } from 'date-fns'

import LockScreen from '@/components/LockScreen/LockScreen'
import Introduction from '@/components/Introduction/Introduction'
import IntroMemories from '@/components/IntroMemories/IntroMemories'
import AdventureSelector from '@/components/AdventureSelector/AdventureSelector'
import Confirmation from '@/components/Confirmation/Confirmation'
import Countdown from '@/components/Countdown/Countdown'
import FinalReveal from '@/components/FinalReveal/FinalReveal'
import MemoriesGallery from '@/components/MemoriesGallery/MemoriesGallery'
import FinalMessage from '@/components/FinalMessage/FinalMessage'
import MusicPlayer from '@/components/MusicPlayer/MusicPlayer'

import { useBirthdayState } from '@/hooks/useBirthdayState'
import type { AppStage } from '@/config/birthday'

// Clave para persistir el estado entre recargas
const STORAGE_KEY = 'bday_state'

interface PersistedState {
  stage: AppStage
  startDate: string | null
  endDate: string | null
  duration: number | null
}

function loadPersistedState(): PersistedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as PersistedState
  } catch {
    return null
  }
}

function persistState(state: PersistedState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // localStorage puede no estar disponible en algunos contextos
  }
}

export default function Experience() {
  // Cargar estado previo si existe
  const saved = loadPersistedState()

  const [stage, setStage] = useState<AppStage>(
    // Si ya pasó el lock, retomar desde donde estaba
    saved?.stage && saved.stage !== 'lock' && saved.stage !== 'unlocking'
      ? saved.stage
      : 'lock'
  )

  const [musicActive, setMusicActive] = useState(
    saved?.stage ? saved.stage !== 'lock' && saved.stage !== 'unlocking' : false
  )

  const [adventureStart, setAdventureStart] = useState<Date | null>(
    saved?.startDate ? parse(saved.startDate, 'yyyy-MM-dd', new Date()) : null
  )
  const [adventureEnd, setAdventureEnd] = useState<Date | null>(
    saved?.endDate ? parse(saved.endDate, 'yyyy-MM-dd', new Date()) : null
  )
  const [adventureDuration, setAdventureDuration] = useState<number>(
    saved?.duration ?? 4
  )

  const { experienceState, message: adminMessage } = useBirthdayState()

  // Persistir cambios de etapa
  useEffect(() => {
    persistState({
      stage,
      startDate: adventureStart ? adventureStart.toISOString().split('T')[0] : null,
      endDate: adventureEnd ? adventureEnd.toISOString().split('T')[0] : null,
      duration: adventureDuration,
    })
  }, [stage, adventureStart, adventureEnd, adventureDuration])

  // Transiciones
  const goTo = useCallback((next: AppStage) => {
    setStage(next)
  }, [])

  const handleUnlock = useCallback(() => {
    goTo('intro')
    setMusicActive(true)
  }, [goTo])

  const handleIntroComplete = useCallback(() => {
    goTo('memories-intro')
  }, [goTo])

  const handleMemoriesIntroComplete = useCallback(() => {
    goTo('invitation')
  }, [goTo])

  const handleConfirm = useCallback((start: Date, end: Date, duration: number) => {
    setAdventureStart(start)
    setAdventureEnd(end)
    setAdventureDuration(duration)
    goTo('confirmed')
  }, [goTo])

  const handleConfirmationComplete = useCallback(() => {
    goTo('countdown')
  }, [goTo])

  const handleReveal = useCallback(() => {
    goTo('revealing')
  }, [goTo])

  const handleRevealComplete = useCallback(() => {
    goTo('gallery')
  }, [goTo])

  const handleGalleryComplete = useCallback(() => {
    goTo('final')
  }, [goTo])

  // Transición de página entre etapas
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit:    { opacity: 0 },
  }

  const pageTransition = { duration: 0.7, ease: 'easeInOut' }

  return (
    <>
      <AnimatePresence mode="wait">

        {/* ─── 1. PANTALLA DE CANDADO ─── */}
        {stage === 'lock' && (
          <motion.div key="lock" {...pageVariants} transition={pageTransition} style={{ position: 'fixed', inset: 0 }}>
            <LockScreen onUnlock={handleUnlock} />
          </motion.div>
        )}

        {/* ─── 2. INTRODUCCIÓN ─── */}
        {stage === 'intro' && (
          <motion.div key="intro" {...pageVariants} transition={pageTransition} style={{ position: 'fixed', inset: 0 }}>
            <Introduction onComplete={handleIntroComplete} />
          </motion.div>
        )}

        {/* ─── 3. PRIMEROS RECUERDOS (scroll) ─── */}
        {stage === 'memories-intro' && (
          <motion.div key="memories-intro" {...pageVariants} transition={pageTransition}>
            <IntroMemories onComplete={handleMemoriesIntroComplete} />
          </motion.div>
        )}

        {/* ─── 4. INVITACIÓN + SELECCIÓN ─── */}
        {stage === 'invitation' && (
          <motion.div key="invitation" {...pageVariants} transition={pageTransition}>
            <AdventureSelector onConfirm={handleConfirm} />
          </motion.div>
        )}

        {/* ─── 5. CONFIRMACIÓN ─── */}
        {stage === 'confirmed' && adventureStart && adventureEnd && (
          <motion.div key="confirmed" {...pageVariants} transition={pageTransition}>
            <Confirmation
              startDate={adventureStart}
              endDate={adventureEnd}
              duration={adventureDuration}
              onComplete={handleConfirmationComplete}
            />
          </motion.div>
        )}

        {/* ─── 6. CUENTA REGRESIVA + ESPERA ─── */}
        {stage === 'countdown' && adventureStart && adventureEnd && (
          <motion.div key="countdown" {...pageVariants} transition={pageTransition}>
            <Countdown
              startDate={adventureStart}
              endDate={adventureEnd}
              duration={adventureDuration}
              experienceState={experienceState}
              extraMessage={adminMessage}
              onReveal={handleReveal}
            />
          </motion.div>
        )}

        {/* ─── 7. TRANSICIÓN DE REVELACIÓN ─── */}
        {stage === 'revealing' && (
          <motion.div key="revealing" {...pageVariants} transition={pageTransition} style={{ position: 'fixed', inset: 0, zIndex: 80 }}>
            <FinalReveal onComplete={handleRevealComplete} />
          </motion.div>
        )}

        {/* ─── 8. GALERÍA CINEMATOGRÁFICA ─── */}
        {stage === 'gallery' && (
          <motion.div key="gallery" {...pageVariants} transition={pageTransition}>
            <MemoriesGallery onComplete={handleGalleryComplete} />
          </motion.div>
        )}

        {/* ─── 9. MENSAJE FINAL ─── */}
        {stage === 'final' && (
          <motion.div key="final" {...pageVariants} transition={pageTransition}>
            <FinalMessage />
          </motion.div>
        )}

      </AnimatePresence>

      {/* ─── REPRODUCTOR DE MÚSICA (persistente entre etapas) ─── */}
      {musicActive && (
        <MusicPlayer autoPlay={musicActive} />
      )}
    </>
  )
}
