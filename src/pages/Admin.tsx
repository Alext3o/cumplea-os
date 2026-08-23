import { useState, useEffect, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import {
  supabase,
  getBirthdayResponse,
  getExperienceConfig,
  updateExperienceState,
} from '@/lib/supabase'
import type { BirthdayResponse, ExperienceConfig } from '@/lib/supabase'
import type { ExperienceState } from '@/config/birthday'
import styles from './Admin.module.css'

// ─── Tipos ────────────────────────────────────────────────────
type AuthState = 'checking' | 'unauthenticated' | 'authenticated'

export default function Admin() {
  const [authState, setAuthState] = useState<AuthState>('checking')
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [authError, setAuthError] = useState<string | null>(null)
  const [authLoading, setAuthLoading] = useState(false)

  const [response, setResponse]     = useState<BirthdayResponse | null>(null)
  const [config, setConfig]         = useState<ExperienceConfig | null>(null)
  const [dataLoading, setDataLoading] = useState(false)
  const [saveMsg, setSaveMsg]       = useState<string | null>(null)

  // Form fields
  const [newState, setNewState]           = useState<ExperienceState>('WAITING')
  const [newTitle, setNewTitle]           = useState('')
  const [newSubtitle, setNewSubtitle]     = useState('')
  const [newMessage, setNewMessage]       = useState('')
  const [newDestination, setNewDestination] = useState('')
  const [newInstructions, setNewInstructions] = useState('')

  // ─── Verificar sesión ─────────────────────────────────────
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      setAuthState(data.session ? 'authenticated' : 'unauthenticated')
    }
    checkSession()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthState(session ? 'authenticated' : 'unauthenticated')
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  // ─── Cargar datos cuando está autenticado ────────────────
  useEffect(() => {
    if (authState !== 'authenticated') return

    const load = async () => {
      setDataLoading(true)
      const [res, cfg] = await Promise.all([getBirthdayResponse(), getExperienceConfig()])
      setResponse(res)
      setConfig(cfg)

      if (cfg) {
        setNewState(cfg.state)
        setNewTitle(cfg.title ?? '')
        setNewSubtitle(cfg.subtitle ?? '')
        setNewMessage(cfg.message ?? '')
        setNewDestination(cfg.destination ?? '')
        setNewInstructions(cfg.instructions ?? '')
      }

      setDataLoading(false)
    }

    load()
  }, [authState])

  // ─── Login ────────────────────────────────────────────────
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setAuthLoading(true)
    setAuthError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setAuthError(error.message)
    }

    setAuthLoading(false)
  }

  // ─── Logout ───────────────────────────────────────────────
  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  // ─── Guardar config ───────────────────────────────────────
  const handleSave = async (e: FormEvent) => {
    e.preventDefault()
    setSaveMsg(null)

    const { error } = await updateExperienceState(newState, {
      title:        newTitle        || null,
      subtitle:     newSubtitle     || null,
      message:      newMessage      || null,
      destination:  newDestination  || null,
      instructions: newInstructions || null,
    })

    if (error) {
      setSaveMsg(`Error: ${error}`)
    } else {
      setSaveMsg('Guardado ✓')
      // Refrescar config
      const cfg = await getExperienceConfig()
      setConfig(cfg)
    }

    setTimeout(() => setSaveMsg(null), 3000)
  }

  const formatDate = (d: string) => {
    try {
      return format(new Date(d + 'T12:00:00'), "d 'de' MMMM, yyyy", { locale: es })
    } catch {
      return d
    }
  }

  const formatTs = (ts: string) => {
    try {
      return format(new Date(ts), "d 'de' MMMM 'a las' HH:mm", { locale: es })
    } catch {
      return ts
    }
  }

  // ─── Render ───────────────────────────────────────────────

  if (authState === 'checking') {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
      </div>
    )
  }

  if (authState === 'unauthenticated') {
    return (
      <div className={styles.loginWrapper}>
        <motion.div
          className={styles.loginCard}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className={styles.loginTitle}>Panel privado</h1>
          <p className={styles.loginSubtitle}>Solo para ti. 🔒</p>

          <form className={styles.loginForm} onSubmit={handleLogin}>
            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={styles.input}
                autoComplete="email"
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={styles.input}
                autoComplete="current-password"
                required
              />
            </div>

            <AnimatePresence>
              {authError && (
                <motion.p
                  className={styles.error}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {authError}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              className={styles.loginBtn}
              disabled={authLoading}
            >
              {authLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  // ─── Panel autenticado ────────────────────────────────────
  return (
    <div className={styles.adminWrapper}>
      <div className={styles.adminInner}>
        {/* Header */}
        <div className={styles.adminHeader}>
          <h1 className={styles.adminTitle}>Panel de Control</h1>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Salir
          </button>
        </div>

        {dataLoading ? (
          <div className={styles.loading}>
            <div className={styles.spinner} />
          </div>
        ) : (
          <div className={styles.grid}>
            {/* ─── Respuesta ─── */}
            <section className={styles.card}>
              <h2 className={styles.cardTitle}>Respuesta de la invitación</h2>

              {response ? (
                <dl className={styles.dl}>
                  <div className={styles.dlRow}>
                    <dt>Fecha de inicio</dt>
                    <dd>{formatDate(response.selected_start_date)}</dd>
                  </div>
                  <div className={styles.dlRow}>
                    <dt>Fecha de fin</dt>
                    <dd>{formatDate(response.selected_end_date)}</dd>
                  </div>
                  <div className={styles.dlRow}>
                    <dt>Duración</dt>
                    <dd>{response.duration_days} días</dd>
                  </div>
                  <div className={styles.dlRow}>
                    <dt>Seleccionado el</dt>
                    <dd>{formatTs(response.selected_at)}</dd>
                  </div>
                </dl>
              ) : (
                <p className={styles.noData}>
                  Ella todavía no ha seleccionado una fecha.
                </p>
              )}
            </section>

            {/* ─── Estado actual ─── */}
            <section className={styles.card}>
              <h2 className={styles.cardTitle}>Estado actual</h2>
              <div className={`${styles.stateBadge} ${styles[`state_${config?.state ?? 'WAITING'}`]}`}>
                {config?.state ?? 'WAITING'}
              </div>
              {config?.updated_at && (
                <p className={styles.updatedAt}>
                  Actualizado: {formatTs(config.updated_at)}
                </p>
              )}
            </section>

            {/* ─── Formulario de configuración ─── */}
            <section className={`${styles.card} ${styles.cardFull}`}>
              <h2 className={styles.cardTitle}>Actualizar experiencia</h2>

              <form className={styles.configForm} onSubmit={handleSave}>
                {/* Estado */}
                <div className={styles.field}>
                  <label className={styles.label}>Estado</label>
                  <div className={styles.stateButtons}>
                    {(['WAITING', 'REVEAL', 'FINAL'] as ExperienceState[]).map(s => (
                      <button
                        key={s}
                        type="button"
                        className={`${styles.stateBtn} ${newState === s ? styles.stateBtnActive : ''}`}
                        onClick={() => setNewState(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <p className={styles.stateHint}>
                    {newState === 'WAITING' && 'Ella verá la cuenta regresiva y el mensaje de espera.'}
                    {newState === 'REVEAL'  && 'Se activará la transición de revelación y la galería.'}
                    {newState === 'FINAL'   && 'Muestra el mensaje final.'}
                  </p>
                </div>

                {/* Título */}
                <div className={styles.field}>
                  <label className={styles.label}>Título (opcional)</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    className={styles.input}
                    placeholder="ej: Ya falta poquito..."
                  />
                </div>

                {/* Subtítulo */}
                <div className={styles.field}>
                  <label className={styles.label}>Subtítulo (opcional)</label>
                  <input
                    type="text"
                    value={newSubtitle}
                    onChange={e => setNewSubtitle(e.target.value)}
                    className={styles.input}
                    placeholder="ej: Prepara una maleta pequeña."
                  />
                </div>

                {/* Mensaje */}
                <div className={styles.field}>
                  <label className={styles.label}>Mensaje visible para ella (opcional)</label>
                  <textarea
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    className={`${styles.input} ${styles.textarea}`}
                    placeholder="ej: Ahora sí... ya puedo contarte todo."
                    rows={3}
                  />
                </div>

                {/* Destino */}
                <div className={styles.field}>
                  <label className={styles.label}>Destino (opcional)</label>
                  <input
                    type="text"
                    value={newDestination}
                    onChange={e => setNewDestination(e.target.value)}
                    className={styles.input}
                    placeholder="ej: Cartagena, Colombia 🌊"
                  />
                </div>

                {/* Instrucciones */}
                <div className={styles.field}>
                  <label className={styles.label}>Instrucciones (opcional)</label>
                  <textarea
                    value={newInstructions}
                    onChange={e => setNewInstructions(e.target.value)}
                    className={`${styles.input} ${styles.textarea}`}
                    placeholder="ej: Salimos el viernes a las 6am. Te recojo en tu casa."
                    rows={3}
                  />
                </div>

                <div className={styles.formFooter}>
                  <button type="submit" className={styles.saveBtn}>
                    Guardar cambios
                  </button>

                  <AnimatePresence>
                    {saveMsg && (
                      <motion.span
                        className={saveMsg.startsWith('Error') ? styles.errorMsg : styles.successMsg}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        {saveMsg}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </section>

            {/* ─── Nota de futuras etapas ─── */}
            <section className={styles.card}>
              <h2 className={styles.cardTitle}>Futuras revelaciones</h2>
              <div className={styles.stages}>
                <div className={styles.stage}>
                  <span className={styles.stageNum}>01</span>
                  <span className={styles.stageText}>Espera más instrucciones 👀</span>
                </div>
                <div className={styles.stage}>
                  <span className={styles.stageNum}>02</span>
                  <span className={styles.stageText}>Ya falta poquito...</span>
                </div>
                <div className={styles.stage}>
                  <span className={styles.stageNum}>03</span>
                  <span className={styles.stageText}>Prepara una maleta pequeña.</span>
                </div>
                <div className={styles.stage}>
                  <span className={styles.stageNum}>04</span>
                  <span className={styles.stageText}>📍 Destino / 🏨 Hotel / 🗺️ Itinerario</span>
                </div>
              </div>
              <p className={styles.stageNote}>
                Usa el campo "Mensaje" y "Instrucciones" para revelar cada etapa desde aquí.
              </p>
            </section>
          </div>
        )}
      </div>
    </div>
  )
}
