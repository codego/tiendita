export const homeCopy = {
  hero: "Marcas de TiendaNube. Tocás, vas a su tienda.",
  banner: "Todas las marcas. Un solo lugar.",
  bannerCta: "Ir a las marcas →",
  search: "Buscar marcas, prendas y más",
  recient: "Recién publicadas",
  recientBadge: "RECIéN",
  las21: "LAS 21",
  live: "LIVE",
  shareCard: "Mirá lo que encontré en Curadario.",
  shareLive: "Está pasando. 20 minutos.",
  brandTease: "hoy a las 21, esta.",
  rail: "Más drops llegando",
  dayLine: "Veinte minutos. Una pieza por tienda. Se acaba.",
  remind: "Avisame a las 20:55",
  reminded: "Te avisamos a las 20:55.",
  esta: "¿Esta o esta?",
  anoche: "Lo más reenviado",
  verTodo: "Ver todo",
} as const;

export const HOME_CHIPS = [
  { id: "todas", label: "Todas" },
  { id: "ropa", label: "Ropa" },
  { id: "deportiva", label: "Deportiva" },
  { id: "carteras", label: "Carteras" },
  { id: "accesorios", label: "Accesorios" },
  { id: "trajes-de-bano", label: "Trajes de baño" },
  { id: "sastreria", label: "Sastrería" },
  { id: "calzado", label: "Calzado" },
] as const;

export type HomeChipId = (typeof HOME_CHIPS)[number]["id"];
