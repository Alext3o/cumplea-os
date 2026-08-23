import { useState, useEffect } from 'react'
import { getExperienceConfig } from '@/lib/supabase'
import type { ExperienceState } from '@/config/birthday'

interface BirthdayState {
  experienceState: ExperienceState
  title: string | null
  subtitle: string | null
  message: string | null
  destination: string | null
  instructions: string | null
  loading: boolean
}

export function useBirthdayState(): BirthdayState {
  const [state, setState] = useState<BirthdayState>({
    experienceState: 'WAITING',
    title: null,
    subtitle: null,
    message: null,
    destination: null,
    instructions: null,
    loading: true,
  })

  useEffect(() => {
    const load = async () => {
      const config = await getExperienceConfig()

      if (!config) {
        // Sin Supabase configurado → usar WAITING por defecto
        setState(s => ({ ...s, loading: false }))
        return
      }

      setState({
        experienceState: config.state,
        title: config.title,
        subtitle: config.subtitle,
        message: config.message,
        destination: config.destination,
        instructions: config.instructions,
        loading: false,
      })
    }

    load()

    // Polling cada 30s para detectar cambios de estado desde el admin
    const interval = setInterval(load, 30_000)
    return () => clearInterval(interval)
  }, [])

  return state
}
