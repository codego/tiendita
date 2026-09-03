export const emptyGuardados = {
  title: "Todavía no guardaste nada.",
  body: "Tocá el corazón en una pieza. Cuando quieras, volvés acá.",
  cta: "Ir al feed →",
} as const;

export const emptyLooks = {
  line: "Todavía no hay looks. Volvé más tarde.",
} as const;

export const emptySearch = {
  title: "No encontramos eso.",
  cta: "Ir al feed →",
} as const;

export const emptyRecien = {
  title: "Nadie publicó todavía.",
  body: "Cuando una tienda publique, aparece acá.",
  line: "Nadie publicó todavía. Cuando una tienda publique, aparece acá.",
  cta: "Ir al feed →",
} as const;

export const emptyMarca = {
  title: "Todavía no hay piezas de esta marca.",
  body: "Cuando publique, aparecen acá.",
  cta: "Ir al feed →",
} as const;

export const cookieCopy = {
  line: "Usamos lo mínimo para que funcione.",
  privacy: "Privacidad →",
  accept: "Entendido",
} as const;

export const COOKIE_KEY = "curadario:cookie-ok";

export const pwaCopy = {
  title: "Abrí Con pinta desde el home",
  body: "Instalá la app en tu pantalla de inicio para acceder más rápido.",
  add: "Agregar",
  later: "Ahora no",
} as const;

export const PWA_KEY = "curadario:pwa-later";

export const pwaIosCopy = {
  title: "Abrí Con pinta desde el home.",
  sub: "En iPhone, Safari no instala solo.",
  share: "Tocá Compartir",
  home: "Agregar a inicio",
  add: "Agregar",
  later: "Ahora no",
} as const;

export const PWA_IOS_KEY = "curadario:pwa-ios-dismissed";

export function marcaCountLine(count: number): string {
  const noun = count === 1 ? "pieza" : "piezas";
  return `TiendaNube · ${count} ${noun} en Con pinta`;
}

export const marcaCta = "Ir a su tienda";

export const loadErrorCopy = {
  title: "No pudimos cargar.",
  body: "Probá de nuevo. Si sigue, la tienda puede estar caída.",
  retry: "Reintentar",
  home: "Ir al inicio",
  footerLead: "Marcas de TiendaNube.",
  footerSub: "Tocás, vas a su tienda.",
} as const;

export const onboardingSlides = [
  { title: "Marcas de TiendaNube." },
  { title: "Tocás, vas a su tienda." },
  { title: "Guardá y reenviá. Lo vi en Con pinta." },
] as const;

export const onboardingCopy = {
  next: "Siguiente",
  start: "Empezar",
  skip: "Saltar",
} as const;

export const ONBOARDING_KEY = "curadario-onboarding-v1";
