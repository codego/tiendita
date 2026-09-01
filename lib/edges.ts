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

export const loadErrorCopy = {
  title: "No pudimos cargar.",
  body: "Probá de nuevo. Si sigue, la tienda puede estar caída.",
  retry: "Reintentar",
  home: "Ir al inicio",
  footerLead: "Marcas de TiendaNube.",
  footerSub: "Tocás, vas a su tienda.",
} as const;

export const onboardingSlides = [
  { title: "Marcas de TiendaNube" },
  { title: "Tocás, vas a su tienda" },
  { title: "Guardá y compartí el hallazgo." },
] as const;

export const ONBOARDING_KEY = "curadario-onboarding-v1";
