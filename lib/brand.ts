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
  headline: "Armé mi parte del look.",
  sub: "Está en Curadario, no en cinco tiendas.",
  lookTitle: "Sastrería de agosto",
  meta: "Look completo • 5 productos",
  byline: "por Sofía • 2 min",
  copyLink: "Copiar enlace",
  stories: "Instagram Stories",
  whatsapp: "WhatsApp",
  more: "Más",
  cta: "Compartir el look →",
  copied: "Enlace copiado.",
  storiesHint: "Enlace copiado. Pegalo en Stories.",
} as const;

export const legalCopy = {
  vitrina:
    "Curadario es una vitrina. No es una tienda, no cobra y no procesa pagos.",
  noCheckout:
    "No hay carrito ni checkout propio. El CTA del shopper es Ir a la tienda →: te lleva al checkout de la marca.",
} as const;
