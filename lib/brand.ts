export const brandCopy = {
  label: "PARA MARCAS",
  headlineLead: "Publicá tu selección.",
  headlineRest: "No tu tienda entera.",
  headline: "Publicá tu selección. No tu tienda entera.",
  sub: "Cualquier TiendaNube. Elegís qué sale. Ellos compran en tu checkout.",
  primary: "Continuar con TiendaNube →",
  secondary: "Ya tengo cuenta",
  accept: "Al continuar aceptás",
  terms: "Términos",
  privacy: "Privacidad",
  landingCta: "¿Tenés TiendaNube? Publicá tu tienda.",
  landingLine: "Entrás, elegís qué sale, y tu marca entra en el look.",
  tease: "hoy a las 21, esta.",
  mockLabel: "Mock · TiendaNube OAuth no está configurado.",
  mockPicker: "Mock · seed local. No es OAuth vivo.",
} as const;

export const elegirCopy = {
  title: "Qué publicás",
  sub: "Lo que prendes entra al feed. El checkout sigue en tu TiendaNube.",
  search: "Buscar productos",
  noteHidden: "Lo no elegido no aparece en Curadario.",
  noteCheckout: "El checkout sigue en tu tienda.",
  empty: "No hay prendas con eso.",
  emptyFeed: "Elegí al menos una pieza para aparecer en el feed.",
  emptyTitle: "Todavía no hay nada en Curadario.",
} as const;

export function publishCta(count: number): string {
  const noun = count === 1 ? "pieza" : "piezas";
  return `Publicar ${count} ${noun} →`;
}

export function listoCta(count: number): string {
  return `Listo · ${count} publicadas`;
}

export const publishCopy = {
  title: "Listo.",
  sub: "Ya está en Curadario.",
  feed: "Ver el feed",
} as const;

export function syncBanner(count: number): string {
  return `Sincronizado • ${count} productos de tu TiendaNube`;
}

export const shareCopy = {
  kit: "Mirá lo que encontré en Curadario.",
  headline: "Mirá lo que encontré en Curadario.",
  sub: "Una pieza. La tienda de la marca.",
  copyLink: "Copiar enlace",
  stories: "Instagram Stories",
  whatsapp: "WhatsApp",
  more: "Más",
  cta: "Compartir hallazgo →",
  copied: "Enlace copiado.",
  storiesHint: "Enlace copiado. Pegalo en Stories.",
} as const;

export const dashboardCopy = {
  kicker: "Curadario · tu tienda",
  kickerAccent: "tu tienda",
  title: "Esta semana",
  list: "En Curadario",
  clicksWeek: "Clics esta semana",
  hidden: "Oculta",
  sync: "Sincronizar",
  connected: "Conectada a TiendaNube",
  lastSyncPrefix: "última sync",
  more: "Elegir más piezas",
  pick: "Elegir piezas",
  edit: "Elegir piezas",
  vitrina: "Ver mi vitrina",
  logout: "Cerrar sesión",
  footer: "Curadario no vende. El clic es el resultado.",
  visitsLabel: "Visitas",
  clicksLabel: "Clics a la tienda",
  publishedLabel: "Publicadas",
  clickNotice: "Alguien salió de Curadario a tu ficha.",
} as const;

export function lastSyncLine(relative: string): string {
  return `${dashboardCopy.connected} · ${dashboardCopy.lastSyncPrefix} ${relative}`;
}

export const legalCopy = {
  vitrina:
    "Curadario es una vitrina. No es una tienda, no cobra y no procesa pagos.",
  noCheckout:
    "No hay carrito ni checkout propio. El CTA del shopper es Ir a la tienda →: te lleva al checkout de la marca.",
} as const;
