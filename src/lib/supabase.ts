import { createClient } from '@supabase/supabase-js'
import type { ExperienceState } from '@/config/birthday'

// ─── Tipos de la base de datos ────────────────────────────────
export interface BirthdayResponse {
  id: string
  selected_start_date: string   // ISO date string: "2026-09-10"
  selected_end_date: string     // ISO date string: "2026-09-14"
  duration_days: number
  selected_at: string           // ISO timestamp
  created_at: string            // ISO timestamp
}

export interface ExperienceConfig {
  id: string
  state: ExperienceState        // "WAITING" | "REVEAL" | "FINAL"
  title: string | null
  subtitle: string | null
  message: string | null
  destination: string | null
  instructions: string | null
  extra_content: Record<string, unknown> | null
  updated_at: string
}

// ─── Cliente Supabase ─────────────────────────────────────────
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[Supabase] Faltan variables de entorno. Copia .env.example → .env y agrega tus credenciales.'
  )
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '')

// ─── Helpers públicos (anon key — solo insert/select de config) ──

/** Guarda la respuesta de la invitación */
export async function saveBirthdayResponse(
  startDate: string,
  endDate: string,
  durationDays: number
): Promise<{ data: BirthdayResponse | null; error: string | null }> {
  const { data, error } = await supabase
    .from('birthday_responses')
    .insert([
      {
        selected_start_date: startDate,
        selected_end_date: endDate,
        duration_days: durationDays,
        selected_at: new Date().toISOString(),
      },
    ])
    .select()
    .single()

  if (error) {
    console.error('[Supabase] Error guardando respuesta:', error.message)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

/** Lee la configuración pública de la experiencia */
export async function getExperienceConfig(): Promise<ExperienceConfig | null> {
  const { data, error } = await supabase
    .from('experience_config')
    .select('*')
    .order('updated_at', { ascending: false })
    .limit(1)
    .single()

  if (error) {
    // Si la tabla no existe aún (desarrollo sin Supabase) retornar config por defecto
    return null
  }

  return data as ExperienceConfig
}

/** Lee la última respuesta guardada (para el admin) */
export async function getBirthdayResponse(): Promise<BirthdayResponse | null> {
  const { data, error } = await supabase
    .from('birthday_responses')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error) return null
  return data as BirthdayResponse
}

/** Actualiza el estado de la experiencia (solo desde admin autenticado) */
export async function updateExperienceState(
  state: ExperienceState,
  extraFields?: Partial<Omit<ExperienceConfig, 'id' | 'state' | 'updated_at'>>
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from('experience_config')
    .update({
      state,
      ...extraFields,
      updated_at: new Date().toISOString(),
    })
    .neq('id', '')   // update all rows (solo hay una fila de config)

  if (error) {
    console.error('[Supabase] Error actualizando estado:', error.message)
    return { error: error.message }
  }

  return { error: null }
}
