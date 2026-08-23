# ✨ Sorpresa de Cumpleaños

Experiencia web interactiva y privada construida con React + TypeScript + Vite + Framer Motion + Supabase.

---

## Flujo de la experiencia

```
🔒 Candado  →  Pregunta secreta  →  Desbloqueo  →  🎵 Música
  →  Introducción  →  Fotos iniciales  →  Invitación
  →  Selección de fecha  →  Selección de duración  →  Confirmación
  →  Cuenta regresiva  →  Espera  →  Revelación  →  Galería  →  Mensaje final
```

---

## 1. Requisitos previos

- Node.js 18+ (tienes v26 — perfecto)
- Cuenta en [Supabase](https://supabase.com) (gratis)
- Cuenta en [Vercel](https://vercel.com) (gratis)
- Repositorio en GitHub

---

## 2. Instalación local

```bash
# Clona el repo
git clone https://github.com/tu-usuario/cumplea-os.git
cd cumplea-os

# Instala dependencias
npm install

# Copia el archivo de variables de entorno
cp .env.example .env
```

---

## 3. Crear proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) → **New project**
2. Elige nombre, contraseña y región (la más cercana a ti)
3. Espera a que termine de configurarse (~2 min)

---

## 4. Crear las tablas (SQL)

1. En tu proyecto de Supabase → **SQL Editor** → **New query**
2. Copia y pega el contenido completo de `supabase/schema.sql`
3. Haz clic en **Run**

Esto crea:
- `birthday_responses` — guarda la fecha que ella elija
- `experience_config` — controla el estado de la experiencia (WAITING / REVEAL / FINAL)

---

## 5. Verificar RLS (Row Level Security)

El SQL ya configura las políticas correctas, pero verifica:

En **Table Editor** → `birthday_responses`:
- ✅ Política `anon_insert_responses` — permite INSERT a visitantes
- ✅ Política `auth_select_responses` — solo tú (autenticado) puedes leer

En **Table Editor** → `experience_config`:
- ✅ Política `anon_select_config` — visitantes pueden leer el estado
- ✅ Política `auth_update_config` — solo tú puedes actualizar

---

## 6. Configurar autenticación (para el panel /admin)

1. En Supabase → **Authentication** → **Users** → **Add user**
2. Ingresa tu email y una contraseña segura
3. Este será el único usuario con acceso al panel `/admin`

> Tu novia **no puede** acceder al panel porque no tiene credenciales.
> Intentar entrar a `/admin` sin autenticarse solo muestra un formulario de login.

---

## 7. Obtener las credenciales de Supabase

1. En tu proyecto → **Settings** → **API**
2. Copia:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon / public key** → `VITE_SUPABASE_ANON_KEY`

> ⚠️ Nunca uses la `service_role` key en el frontend. Solo la `anon` key.

---

## 8. Configurar `.env`

Edita el archivo `.env` que copiaste:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...tu-clave-anon...
```

---

## 9. Colocar la canción 🎵

Coloca el archivo de audio aquí:

```
public/audio/a-donde-vamos.mp3
```

- El archivo **no está incluido** en el proyecto por derechos de autor.
- Descarga "A Dónde Vamos" de Morat en MP3 y nómbralo exactamente así.
- La canción comienza automáticamente después del desbloqueo.
- Si el navegador bloquea el autoplay, aparece un botón: "Reproducir nuestra canción 🎵"

---

## 10. Colocar las fotografías 📸

### Fotos iniciales (antes de la invitación)
```
public/images/intro/
  photo-01.jpg
  photo-02.jpg
  photo-03.jpg
  photo-04.jpg
  photo-05.jpg
  photo-06.jpg
```

### Galería final (muchos recuerdos)
```
public/images/memories/
  photo-01.jpg
  photo-02.jpg
  ...
  photo-15.jpg   ← (o más, puedes agregar todas las que quieras)
```

Para agregar más fotos a la galería final, edita `src/config/birthday.ts` y añade entradas al array `memories`:

```ts
memories: [
  { src: "/images/memories/photo-01.jpg", text: "Desde aquel día...", layout: "fullscreen" },
  { src: "/images/memories/photo-16.jpg", text: "", layout: "polaroid" },
  // ...
]
```

**Layouts disponibles:** `large` | `small` | `fullscreen` | `left` | `right` | `centered` | `polaroid`

---

## 11. Personalizar el contenido

Todo está centralizado en `src/config/birthday.ts`. Puedes modificar:

- `girlfriendName` — nombre de tu novia
- `storyStartDate` — fecha secreta para desbloquear (formato YYYY-MM-DD)
- `birthdayDate` — fecha de cumpleaños
- `music` — canción (src, título, artista)
- `copy` — todos los textos de la experiencia
- `introPhotos` — fotos y textos de la galería inicial
- `memories` — fotos y textos de la galería final
- `colors` — colores de la paleta

---

## 12. Ejecutar localmente

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173)

Para ver el panel admin: [http://localhost:5173/admin](http://localhost:5173/admin)

---

## 13. Build de producción

```bash
npm run build
```

Los archivos quedan en `dist/`. Verifica que no haya errores.

---

## 14. Subir a GitHub

```bash
git add .
git commit -m "✨ sorpresa lista"
git push origin main
```

---

## 15. Conectar con Vercel

1. Ve a [vercel.com](https://vercel.com) → **New Project**
2. Importa tu repositorio de GitHub
3. Framework: **Vite** (se detecta automáticamente)
4. Haz clic en **Deploy**

---

## 16. Configurar variables de entorno en Vercel

En tu proyecto de Vercel → **Settings** → **Environment Variables**:

| Key | Value |
|-----|-------|
| `VITE_SUPABASE_URL` | `https://tu-proyecto.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJ...tu-clave-anon...` |

Después de agregarlas → **Redeploy**

---

## 17. Deployment final

Cada `git push` a `main` despliega automáticamente en Vercel.

Tu URL quedará algo como: `https://cumplea-os.vercel.app`

---

## 18. Usar el panel /admin

Entra a `tu-url.vercel.app/admin` con tu email y contraseña de Supabase.

Desde ahí puedes:

| Estado | Qué ve ella |
|--------|-------------|
| `WAITING` | Cuenta regresiva + "Espera más instrucciones 👀" |
| `REVEAL` | Transición cinematográfica → galería de fotos |
| `FINAL` | Mensaje final |

También puedes agregar mensajes, instrucciones y revelar el destino del viaje desde el panel.

---

## Estructura del proyecto

```
src/
  components/
    LockScreen/          — Pantalla de candado + date picker
    Introduction/        — "Entonces sí te acordabas..."
    IntroMemories/       — Primera galería estilo polaroid
    AdventureSelector/   — Invitación + selección de fecha y duración
    Confirmation/        — Guarda en Supabase + animación
    Countdown/           — Cuenta regresiva en tiempo real
    FinalReveal/         — Transición cinematográfica
    MemoriesGallery/     — Galería con scroll (8 layouts)
    FinalMessage/        — Última foto + mensaje final
    MusicPlayer/         — Reproductor discreto persistente

  config/
    birthday.ts          — ← MODIFICA TODO AQUÍ

  hooks/
    useCountdown.ts      — Lógica del contador
    useBirthdayState.ts  — Polling del estado desde Supabase

  lib/
    supabase.ts          — Cliente y helpers

  pages/
    Experience.tsx       — Orquesta toda la experiencia
    Admin.tsx            — Panel privado

  styles/
    globals.css          — Variables CSS, tipografía, base

public/
  audio/
    a-donde-vamos.mp3    — ← COLOCA TU CANCIÓN AQUÍ
  images/
    intro/               — ← 6 fotos iniciales
    memories/            — ← todas las fotos de recuerdos

supabase/
  schema.sql             — SQL completo para ejecutar en Supabase
```

---

## Notas de seguridad

- Solo la `anon key` de Supabase está expuesta en el frontend. Es seguro.
- Las respuestas de la invitación solo las puede leer un usuario autenticado (tú).
- El panel `/admin` está protegido por Supabase Auth — no hay bypass.
- Nunca subas el archivo `.env` a GitHub (está en `.gitignore`).

---

*Hecho con ❤️*
