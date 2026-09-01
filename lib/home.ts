export const homeCopy = {
  hero: "Marcas de TiendaNube. Tocás, vas a su tienda.",
  banner: "Todas las marcas. Un solo lugar.",
  bannerCta: "Ir a las marcas →",
  search: "Buscar marcas, prendas y más",
  recient: "Recién publicadas",
  recientBadge: "RECIéN",
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
