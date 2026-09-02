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

export const HOME_RAIL = [
  {
    id: "llego",
    src: "/banner-llego.png",
    alt: "Llegó.",
    daytimeOnly: false,
  },
  {
    id: "esta-semana",
    src: "/banner-esta-semana.png",
    alt: "De esta semana.",
    daytimeOnly: false,
  },
  {
    id: "look",
    src: "/banner-look.png",
    alt: "Lo que lleva el look.",
    chip: "carteras",
    daytimeOnly: false,
  },
  {
    id: "las21",
    src: "/banner-las21.png",
    alt: "Hoy a las 21.",
    href: "/las21",
    daytimeOnly: true,
  },
] as const;

export function visibleHomeRail(dropLive: boolean) {
  return HOME_RAIL.filter((item) => !item.daytimeOnly || !dropLive);
}
