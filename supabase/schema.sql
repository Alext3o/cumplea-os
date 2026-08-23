-- ============================================================
-- SCHEMA COMPLETO — ejecuta esto en Supabase SQL Editor
-- ============================================================

-- ─── 1. Tabla: birthday_responses ────────────────────────────
CREATE TABLE IF NOT EXISTS public.birthday_responses (
  id                  uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  selected_start_date date         NOT NULL,
  selected_end_date   date         NOT NULL,
  duration_days       int          NOT NULL CHECK (duration_days >= 3),
  selected_at         timestamptz  NOT NULL DEFAULT now(),
  created_at          timestamptz  NOT NULL DEFAULT now()
);

-- Índice para consultas por fecha de creación
CREATE INDEX IF NOT EXISTS idx_birthday_responses_created_at
  ON public.birthday_responses (created_at DESC);

-- ─── 2. Tabla: experience_config ─────────────────────────────
-- Una sola fila que controla el estado de la experiencia
CREATE TABLE IF NOT EXISTS public.experience_config (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  state         text         NOT NULL DEFAULT 'WAITING'
                             CHECK (state IN ('WAITING', 'REVEAL', 'FINAL')),
  title         text,
  subtitle      text,
  message       text,
  destination   text,
  instructions  text,
  extra_content jsonb,
  updated_at    timestamptz  NOT NULL DEFAULT now()
);

-- Insertar fila inicial de configuración
INSERT INTO public.experience_config (state)
VALUES ('WAITING')
ON CONFLICT DO NOTHING;

-- ─── 3. Row Level Security (RLS) ─────────────────────────────

-- Habilitar RLS en ambas tablas
ALTER TABLE public.birthday_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_config   ENABLE ROW LEVEL SECURITY;

-- birthday_responses:
--   - Cualquier visitante (anon) puede INSERT (guardar su respuesta)
--   - Solo usuarios autenticados (admin) pueden SELECT
CREATE POLICY "anon_insert_responses"
  ON public.birthday_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "auth_select_responses"
  ON public.birthday_responses
  FOR SELECT
  TO authenticated
  USING (true);

-- experience_config:
--   - Cualquier visitante puede leer el estado (para mostrar la UI correcta)
--   - Solo usuarios autenticados pueden actualizar
CREATE POLICY "anon_select_config"
  ON public.experience_config
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "auth_update_config"
  ON public.experience_config
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "auth_select_config"
  ON public.experience_config
  FOR SELECT
  TO authenticated
  USING (true);

-- ─── 4. Función helper: limpiar respuestas duplicadas ─────────
-- Mantiene solo la respuesta más reciente (opcional, correr manualmente si necesario)
-- DELETE FROM public.birthday_responses
-- WHERE id NOT IN (
--   SELECT id FROM public.birthday_responses ORDER BY created_at DESC LIMIT 1
-- );
