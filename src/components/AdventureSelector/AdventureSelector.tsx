import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DayPicker } from 'react-day-picker'
import { format, addDays, isBefore, startOfDay } from 'date-fns'
import { es } from 'date-fns/locale'
import { birthdayConfig } from '@/config/birthday'
import 'react-day-picker/dist/style.css'
import styles from './AdventureSelector.module.css'

interface AdventureSelectorProps {
  onConfirm: (startDate: Date, endDate: Date, duration: number) => void
}

type Step = 'invitation' | 'date' | 'duration' | 'summary'

export default function AdventureSelector({ onConfirm }: AdventureSelectorProps) {
  const [step, setStep] = useState<Step>('invitation')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null)
  const [tooShortWarning, setTooShortWarning] = useState(false)

  const today = startOfDay(new Date())
  const { options, minDays } = birthdayConfig.adventure
  const { invitation, dateSelector, durationSelector } = birthdayConfig.copy

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return
    if (isBefore(date, today)) return
    setSelectedDate(date)
    setTimeout(() => setStep('duration'), 600)
  }

  const handleDurationSelect = (days: number) => {
    if (days < minDays) {
      setTooShortWarning(true)
      setTimeout(() => setTooShortWarning(false), 2000)
      return
    }
    setSelectedDuration(days)
    setTimeout(() => setStep('summary'), 500)
  }

  const endDate = selectedDate && selectedDuration
    ? addDays(selectedDate, selectedDuration)
    : null

  const formatDate = (date: Date) =>
    format(date, "d 'de' MMMM", { locale: es })

  return (
    <div className={styles.wrapper}>
      <AnimatePresence mode="wait">

        {/* ─── INVITACIÓN ─── */}
        {step === 'invitation' && (
          <motion.div
            key="invitation"
            className={styles.section}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.9 }}
          >
            <motion.p
              className={styles.overline}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {invitation.line1}
            </motion.p>
            <motion.h2
              className={styles.headline}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.9 }}
            >
              {invitation.line2}
            </motion.h2>
            <motion.p
              className={styles.subtext}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {invitation.line3}
            </motion.p>
            <motion.button
              className={styles.primaryBtn}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setStep('date')}
            >
              Elegir fecha →
            </motion.button>
          </motion.div>
        )}

        {/* ─── SELECCIÓN DE FECHA ─── */}
        {step === 'date' && (
          <motion.div
            key="date"
            className={styles.section}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.9 }}
          >
            <h2 className={styles.question}>{dateSelector.question}</h2>
            <p className={styles.hint}>{dateSelector.hint}</p>

            <div className={styles.calendarWrapper}>
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                locale={es}
                disabled={{ before: today }}
                captionLayout="dropdown"
                fromYear={2026}
                toYear={2028}
                showOutsideDays
              />
            </div>

            {selectedDate && (
              <motion.p
                className={styles.selectedInfo}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {formatDate(selectedDate)} ✓
              </motion.p>
            )}
          </motion.div>
        )}

        {/* ─── SELECCIÓN DE DURACIÓN ─── */}
        {step === 'duration' && (
          <motion.div
            key="duration"
            className={styles.section}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.9 }}
          >
            <h2 className={styles.question}>{durationSelector.question}</h2>

            {selectedDate && (
              <p className={styles.hint}>
                A partir del {formatDate(selectedDate)}
              </p>
            )}

            <div className={styles.durationGrid}>
              {options.map((days) => (
                <motion.button
                  key={days}
                  className={`${styles.durationBtn} ${selectedDuration === days ? styles.durationBtnSelected : ''}`}
                  onClick={() => handleDurationSelect(days)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className={styles.daysNum}>{days}</span>
                  <span className={styles.daysLabel}>días</span>
                </motion.button>
              ))}
            </div>

            <AnimatePresence>
              {tooShortWarning && (
                <motion.p
                  className={styles.warning}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {durationSelector.tooShort}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ─── RESUMEN ─── */}
        {step === 'summary' && selectedDate && selectedDuration && endDate && (
          <motion.div
            key="summary"
            className={styles.section}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
          >
            <p className={styles.overline}>Entonces...</p>

            <div className={styles.summaryCard}>
              <div className={styles.summaryDates}>
                <span className={styles.summaryDate}>{formatDate(selectedDate)}</span>
                <span className={styles.summaryArrow}>→</span>
                <span className={styles.summaryDate}>{formatDate(endDate)}</span>
              </div>
              <p className={styles.summaryDuration}>
                por {selectedDuration} días ❤️
              </p>
            </div>

            <motion.button
              className={styles.confirmBtn}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onConfirm(selectedDate, endDate, selectedDuration)}
            >
              Me parece perfecto ✨
            </motion.button>

            <button
              className={styles.backBtn}
              onClick={() => { setSelectedDuration(null); setStep('duration') }}
            >
              ← Cambiar duración
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
