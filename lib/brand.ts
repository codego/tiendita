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
} as const;

export const elegirCopy = {
  title: "Elegí qué publicar.",
  search: "Buscar productos",
  noteHidden: "Lo no elegido no aparece en Curadario.",
  noteCheckout: "El checkout sigue en tu tienda.",
  empty: "No hay prendas con eso.",
} as const;

export function publishCta(count: number): string {
  const noun = count === 1 ? "pieza" : "piezas";
  return `Publicar ${count} ${noun} →`;
}

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
  title: "Esta semana",
  ranking: "Piezas que más mandan a tu TiendaNube",
  edit: "Editar selección",
  vitrina: "Ver mi vitrina →",
  footer: "Curadario no vende. El clic es el resultado.",
  visitsLabel: "visitas",
  clicksLabel: "clics a la tienda",
  publishedLabel: "piezas publicadas",
} as const;

export const dashboardMetrics = {
  visits: 1284,
  storeClicks: 312,
  published: 12,
} as const;

export const dashboardRanking = [
  { skuId: "tapado-coppola", clicks: 48 },
  { skuId: "saco-frances", clicks: 32 },
  { skuId: "pantalon-pinza", clicks: 27 },
] as const;

export const legalCopy = {
  vitrina:
    "Curadario es una vitrina. No es una tienda, no cobra y no procesa pagos.",
  noCheckout:
    "No hay carrito ni checkout propio. El CTA del shopper es Ir a la tienda →: te lleva al checkout de la marca.",
} as const;
