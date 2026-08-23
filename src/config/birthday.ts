// ============================================================
// CONFIGURACIÓN CENTRAL — modifica todo desde aquí
// ============================================================

export const birthdayConfig = {
  // Nombre de tu novia — aparece en mensajes y título final
  girlfriendName: "mi bonita",

  // Fecha en que comenzó su historia (YYYY-MM-DD)
  // Esta es la clave secreta para desbloquear la experiencia
  storyStartDate: "2022-02-03",

  // Fecha de cumpleaños (YYYY-MM-DD) — solo informativa
  birthdayDate: "2026-08-23",

  // ─── MÚSICA ────────────────────────────────────────────────
  // Coloca el archivo en: /public/audio/a-donde-vamos.mp3
  music: {
    src: "/audio/cancion.mp3",
    title: "A Dónde Vamos",
    artist: "Morat",
  },

  // ─── DURACIÓN DE AVENTURA ──────────────────────────────────
  adventure: {
    minDays: 3,
    maxDays: 7,
    defaultDays: 4,
    options: [3, 4, 5, 6, 7],
  },

  // ─── COLORES ───────────────────────────────────────────────
  colors: {
    bg: "#0a0a0a",
    surface: "#111111",
    accent: "#c9a96e",      // dorado cálido
    accentSoft: "#e8d5b0",  // dorado claro
    text: "#f0ece4",        // blanco cálido
    textMuted: "#8a8070",   // gris cálido
    glow: "rgba(201, 169, 110, 0.15)",
  },

  // ─── TEXTOS DE PANTALLAS ───────────────────────────────────
  copy: {
    lockScreen: {
      title: "Esta sorpresa está bloqueada.",
      subtitle: "Pero tú sabes cómo desbloquearla...",
      question: "¿Cuándo empezó nuestra historia?",
      wrongDate: ["mmm... esa no es 👀", "Piensa un poquito más ❤️", "Casi... pero no 😌", "Sigue intentando 🔑"],
    },
    introduction: {
      line1: "Entonces sí te acordabas... ❤️",
      line2: "Ahora sí.",
    },
    musicPrompt: "Reproducir nuestra canción 🎵",
    invitation: {
      line1: "Ahora sí, vamos al cumpleaños.",
      line2: "Quiero pasar unos días contigo ❤️",
      line3: "Pero necesito que tú elijas cuándo.",
    },
    dateSelector: {
      question: "¿Cuándo quieres que empiece nuestra aventura?",
      hint: "Elige el día.",
    },
    durationSelector: {
      question: "¿Cuántos días quieres que dure nuestra aventura?",
      tooShort: "Eso es demasiado poquito 😌",
    },
    confirmation: {
      line1: "Tenemos una cita. ❤️",
      line2: "Guárdala bien.",
    },
    waiting: {
      line1: "Y eso es todo lo que necesitas saber...",
      line2: "Por ahora. 👀",
      line3: "Espera más instrucciones.",
      line4: "No preguntes. 😌",
    },
    reveal: {
      line1: "Ya llegó el momento...",
      line2: "Ahora sí. ❤️",
    },
    final: {
      line1: "Y todavía nos quedan muchos recuerdos por hacer.",
      line2: "Te amo ❤️",
      line3: "Feliz cumpleaños, mi bonita.",
    },
  },

  // ─── FOTOS DE LA PANTALLA DEL CANDADO (fondo sutil) ───────
  lockPhotos: [
    "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502777/IMG_20240831_124422_2.jpg",
    "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502775/20260620_184631_2.jpg",
  ],

  // ─── FOTOS DEL SLIDESHOW DE LA CUENTA REGRESIVA ────────────
  countdownPhotos: [
    "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502779/IMG-20220119-WA0044_2.jpg",
    "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502778/IMG_20241019_223135_2.jpg",
    "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502777/IMG_20230204_202919_2.jpg",
    "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502776/IMG_20240407_131728_2.jpg",
    "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502774/20260409_130509_2.jpg",
    "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502778/IMG_20241020_114029_2.jpg",
  ],

  // ─── PRIMERA GALERÍA — ANTES DE LA INVITACIÓN ──────────────
  introPhotos: [
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502779/IMG-20220119-WA0044_2.jpg", text: "Y pensar que todo empezó ese día..." },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502778/IMG_20241019_223135_2.jpg", text: "" },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502777/IMG_20230204_202919_2.jpg", text: "Cuántas cosas han pasado desde entonces." },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502776/IMG_20240407_131728_2.jpg", text: "" },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502774/20260409_130509_2.jpg",     text: "Y todavía me encanta compartirlas contigo." },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502778/IMG_20241020_114029_2.jpg", text: "" },
  ],

  // ─── GALERÍA FINAL — MUCHOS RECUERDOS ─────────────────────
  // layouts disponibles: "large" | "small" | "fullscreen" | "left" | "right" | "centered" | "polaroid"
  memories: [
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502779/IMG-20220119-WA0044_2.jpg",   text: "Desde aquel día...",                           layout: "fullscreen" },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502778/IMG_20241019_223135_2.jpg",   text: "",                                              layout: "large"      },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502777/IMG_20230204_202919_2.jpg",   text: "",                                              layout: "right"      },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502776/IMG_20240407_131728_2.jpg",   text: "Cuántas cosas hemos vivido.",                   layout: "left"       },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502774/20260409_130509_2.jpg",       text: "",                                              layout: "polaroid"   },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502778/IMG_20241020_114029_2.jpg",   text: "",                                              layout: "small"      },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502777/IMG_20240831_124422_2.jpg",   text: "Y todavía quedan muchas por vivir.",            layout: "centered"   },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502775/20260620_184631_2.jpg",       text: "",                                              layout: "large"      },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502777/IMG_20240831_124422_2.jpg",   text: "",                                              layout: "polaroid"   },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502778/IMG_20241019_223135_2.jpg",   text: "No cambiaría ninguno de estos momentos.",       layout: "fullscreen" },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502776/IMG_20240407_131728_2.jpg",   text: "",                                              layout: "right"      },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502777/IMG_20230204_202919_2.jpg",   text: "",                                              layout: "left"       },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502774/20260409_130509_2.jpg",       text: "",                                              layout: "polaroid"   },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502778/IMG_20241020_114029_2.jpg",   text: "Cada momento contigo vale todo.",               layout: "large"      },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502775/20260620_184631_2.jpg",       text: "",                                              layout: "small"      },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502777/IMG_20240831_124422_2.jpg",   text: "",                                              layout: "right"      },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502779/IMG-20220119-WA0044_2.jpg",   text: "Qué bueno que estás en mi vida.",               layout: "centered"   },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502778/IMG_20241019_223135_2.jpg",   text: "",                                              layout: "large"      },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502774/20260409_130509_2.jpg",       text: "",                                              layout: "left"       },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502778/IMG_20241020_114029_2.jpg",   text: "El tiempo contigo siempre es poco.",            layout: "fullscreen" },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502777/IMG_20230204_202919_2.jpg",   text: "",                                              layout: "right"      },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502776/IMG_20240407_131728_2.jpg",   text: "",                                              layout: "small"      },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502775/20260620_184631_2.jpg",       text: "Siempre quiero más de estos momentos.",         layout: "large"      },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502777/IMG_20240831_124422_2.jpg",   text: "",                                              layout: "polaroid"   },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502779/IMG-20220119-WA0044_2.jpg",   text: "",                                              layout: "left"       },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502778/IMG_20241019_223135_2.jpg",   text: "Y todavía quedan muchos más.",                  layout: "fullscreen" },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502774/20260409_130509_2.jpg",       text: "",                                              layout: "large"      },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502778/IMG_20241020_114029_2.jpg",   text: "",                                              layout: "polaroid"   },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502777/IMG_20230204_202919_2.jpg",   text: "Gracias por cada uno de estos momentos.",       layout: "centered"   },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502775/20260620_184631_2.jpg",       text: "",                                              layout: "right"      },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502777/IMG_20240831_124422_2.jpg",   text: "",                                              layout: "small"      },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502776/IMG_20240407_131728_2.jpg",   text: "",                                              layout: "large"      },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/v1787502775/20260620_184631_2.jpg",       text: "",                                              layout: "fullscreen" },
  ],
} as const;

// ─── TIPOS ─────────────────────────────────────────────────
export type MemoryLayout =
  | "large"
  | "small"
  | "fullscreen"
  | "left"
  | "right"
  | "centered"
  | "polaroid";

export type Memory = {
  src: string;
  text: string;
  layout: MemoryLayout;
};

export type AppStage =
  | "lock"
  | "unlocking"
  | "intro"
  | "memories-intro"
  | "invitation"
  | "date-select"
  | "duration-select"
  | "summary"
  | "confirmed"
  | "countdown"
  | "revealing"
  | "gallery"
  | "final";

// Estados del servidor (controlados desde /admin)
export type ExperienceState = "WAITING" | "REVEAL" | "FINAL";
