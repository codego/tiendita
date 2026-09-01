export const homeCopy = {
  hero: "Marcas de TiendaNube. Tocás, vas a su tienda.",
  marcasRow: "Marcas de TiendaNube",
  recient: "Recién publicadas",
  recientBadge: "RECIéN",
  search: "Buscar",
} as const;

export const HOME_CHIPS = [
  { id: "todas", label: "Todas" },
  { id: "mujer", label: "Mujer" },
  { id: "hombre", label: "Hombre" },
  { id: "accesorios", label: "Accesorios" },
  { id: "deporte", label: "Deporte" },
  { id: "joyas", label: "Joyas" },
] as const;

export type HomeChipId = (typeof HOME_CHIPS)[number]["id"];
