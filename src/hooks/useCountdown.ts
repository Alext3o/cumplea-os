import { useState, useEffect, useCallback } from 'react'

export interface CountdownValues {
  days: number
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
  totalSeconds: number
}

export function useCountdown(targetDate: Date | null): CountdownValues {
  const calculate = useCallback((): CountdownValues => {
    if (!targetDate) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false, totalSeconds: 0 }
    }

    const now = Date.now()
    const target = targetDate.getTime()
    const diff = target - now

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true, totalSeconds: 0 }
    }

    const totalSeconds = Math.floor(diff / 1000)
    const days    = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    return { days, hours, minutes, seconds, isExpired: false, totalSeconds }
  }, [targetDate])

  const [values, setValues] = useState<CountdownValues>(calculate)

  useEffect(() => {
    if (!targetDate) return

    const tick = () => setValues(calculate())
    tick()

    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [targetDate, calculate])

  return values
}
