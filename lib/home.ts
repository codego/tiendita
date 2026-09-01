export const homeCopy = {
  hero: "Veinte minutos. Una pieza por tienda. Se acaba.",
  banner: "Veinte minutos. Una pieza por tienda.",
  bannerCta: "Ir a Las 21 →",
  las21: "LAS 21",
  live: "LIVE",
  shareLive: "Está pasando en Curadario. 20 minutos.",
  brandTease: "hoy a las 21, esta.",
  rail: "Más drops llegando",
  dayLine: "Veinte minutos. Una pieza por tienda. Se acaba.",
  remind: "Avisame a las 20:55",
  reminded: "Te avisamos a las 20:55.",
  esta: "¿Esta o esta?",
  anoche: "Lo más reenviado anoche",
  verTodo: "Ver todo",
  recient: "Recién publicadas",
  recientBadge: "RECIéN",
  search: "Buscar marcas, prendas y más",
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
