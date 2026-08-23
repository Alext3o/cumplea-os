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
    src: "/audio/Morat - A Dónde Vamos (Video Oficial).mp3",
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

  // ─── PRIMERA GALERÍA — ANTES DE LA INVITACIÓN ──────────────
  // Las URLs incluyen q_auto,f_auto para optimización automática (WebP + compresión)
  introPhotos: [
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/IMG_20220119-WA0044_2.jpg", text: "Y pensar que todo empezó ese día..." },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/IMG_20220312_211736_2.jpg", text: "" },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/IMG_20220603_163819_2.jpg", text: "Cuántas cosas han pasado desde entonces." },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/IMG_20221015_143113_2.jpg", text: "" },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/IMG_20221016_120654_2.jpg", text: "Y todavía me encanta compartirlas contigo." },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/IMG_20230204_202919_2.jpg", text: "" },
  ],

  // ─── GALERÍA FINAL — MUCHOS RECUERDOS ─────────────────────
  // layouts disponibles: "large" | "small" | "fullscreen" | "left" | "right" | "centered" | "polaroid"
  memories: [
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/IMG_20220119-WA0044_2.jpg",   text: "Desde aquel día...",                           layout: "fullscreen" },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/IMG_20220312_211736_2.jpg",   text: "",                                              layout: "large"      },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/IMG_20220603_163819_2.jpg",   text: "",                                              layout: "right"      },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/IMG_20221015_143113_2.jpg",   text: "Cuántas cosas hemos vivido.",                   layout: "left"       },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/IMG_20221016_120654_2.jpg",   text: "",                                              layout: "polaroid"   },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/IMG_20230204_202919_2.jpg",   text: "",                                              layout: "small"      },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/IMG_20230506_124018_2.jpg",   text: "Y todavía quedan muchas por vivir.",            layout: "centered"   },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/IMG-20230603-WA0019_2.jpg",   text: "",                                              layout: "large"      },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/IMG_20230902_155541_2.jpg",   text: "",                                              layout: "polaroid"   },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/IMG_20240203_213738_2.jpg",   text: "No cambiaría ninguno de estos momentos.",       layout: "fullscreen" },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/IMG_20240203_215233_2.jpg",   text: "",                                              layout: "right"      },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/IMG_20240407_131728_2.jpg",   text: "",                                              layout: "left"       },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/IMG_20240504_201649_1_2.jpg", text: "",                                              layout: "polaroid"   },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/IMG_20240803_205757_2.jpg",   text: "Cada momento contigo vale todo.",               layout: "large"      },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/IMG_20240824_194005_2.jpg",   text: "",                                              layout: "small"      },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/IMG_20240831_124422_2.jpg",   text: "",                                              layout: "right"      },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/IMG_20240831_124536_2.jpg",   text: "",                                              layout: "polaroid"   },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/IMG_20241012_112729_2.jpg",   text: "Qué bueno que estás en mi vida.",               layout: "centered"   },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/IMG_20241012_143148_2.jpg",   text: "",                                              layout: "large"      },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/IMG_20241019_223135_2.jpg",   text: "",                                              layout: "left"       },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/IMG_20241020_114029_2.jpg",   text: "",                                              layout: "polaroid"   },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/20251101_214848_2.jpg",       text: "El tiempo contigo siempre es poco.",            layout: "fullscreen" },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/20251104_180107_2.jpg",       text: "",                                              layout: "right"      },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/IMG_20250203_223719_2.jpg",   text: "",                                              layout: "small"      },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/IMG_20250222_092426_2.jpg",   text: "",                                              layout: "large"      },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/IMG_20250308_210123_2.jpg",   text: "Siempre quiero más de estos momentos.",         layout: "centered"   },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/IMG_20250426_124049_2.jpg",   text: "",                                              layout: "polaroid"   },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/IMG_20250426_141028_2.jpg",   text: "",                                              layout: "left"       },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/20260227_092909_2.jpg",       text: "",                                              layout: "right"      },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/IMG-20260227-WA0006_2.jpg",   text: "Y todavía quedan muchos más.",                  layout: "fullscreen" },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/20260407_181136_2.jpg",       text: "",                                              layout: "large"      },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/20260408_173452_2.jpg",       text: "",                                              layout: "polaroid"   },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/20260409_130509_2.jpg",       text: "",                                              layout: "small"      },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/20260409_134138_2.jpg",       text: "",                                              layout: "left"       },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/20260410_175014_2.jpg",       text: "Gracias por cada uno de estos momentos.",       layout: "centered"   },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/20260531_112134_2.jpg",       text: "",                                              layout: "right"      },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/20260531_112201_2.jpg",       text: "",                                              layout: "polaroid"   },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/20260620_184607_2.jpg",       text: "",                                              layout: "large"      },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/20260620_184623_2.jpg",       text: "",                                              layout: "small"      },
    { src: "https://res.cloudinary.com/u2yxol4t/image/upload/q_auto,f_auto/20260620_184631_2.jpg",       text: "",                                              layout: "fullscreen" },
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
