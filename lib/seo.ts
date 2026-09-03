import type { Metadata } from "next";
import { shareCopy } from "@/lib/brand";
import { getSiteUrl } from "@/lib/env";
import { homeCopy } from "@/lib/home";
import { LIVE_SHARE_COPY } from "@/lib/las21";
import { PRODUCT_NAME } from "@/lib/name";
import { routes } from "@/lib/routes";
import { hasProductImage } from "@/lib/product-image.mjs";
import type { Sku } from "@/lib/types";

export const OG_FINDING_TITLE = "Lo vi en Con pinta.";
export const OG_DROP_TITLE = "Está pasando en Con pinta. 20 minutos.";
export const OG_ESTA_TITLE = "¿Esta o esta? En Con pinta.";
export const OG_SITE = PRODUCT_NAME;
export const HOME_OG_IMAGE = "/images/tapado-coppola.jpg";
export const LAS21_OG_IMAGE = "/las21/opengraph-image";

export function siteOrigin(): string {
  return getSiteUrl();
}

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${siteOrigin()}${path.startsWith("/") ? path : `/${path}`}`;
}

export function homeMetadata(): Metadata {
  const description = homeCopy.hero;
  return {
    title: `${PRODUCT_NAME} — Marcas de TiendaNube`,
    description,
    alternates: { canonical: routes.landing },
    openGraph: {
      type: "website",
      locale: "es_AR",
      siteName: OG_SITE,
      title: OG_FINDING_TITLE,
      description: OG_FINDING_TITLE,
      url: routes.landing,
      images: [{ url: HOME_OG_IMAGE, alt: OG_FINDING_TITLE }],
    },
    twitter: {
      card: "summary_large_image",
      title: OG_FINDING_TITLE,
      description: OG_FINDING_TITLE,
      images: [HOME_OG_IMAGE],
    },
  };
}

export function findingMetadata(sku: Sku): Metadata {
  const description = sku.description || shareCopy.kit;
  const url = routes.pieza(sku.id);
  const images = hasProductImage(sku.image)
    ? [{ url: sku.image, alt: `${sku.brand} — ${sku.name}` }]
    : undefined;
  return {
    title: `${sku.name} — ${sku.brand} · ${PRODUCT_NAME}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "es_AR",
      siteName: OG_SITE,
      title: OG_FINDING_TITLE,
      description: OG_FINDING_TITLE,
      url,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: OG_FINDING_TITLE,
      description: OG_FINDING_TITLE,
      ...(images ? { images: [sku.image] } : {}),
    },
  };
}

export function dropMetadata(): Metadata {
  return {
    title: `${LIVE_SHARE_COPY} — ${PRODUCT_NAME}`,
    description: LIVE_SHARE_COPY,
    alternates: { canonical: routes.las21 },
    openGraph: {
      type: "website",
      locale: "es_AR",
      siteName: OG_SITE,
      title: OG_DROP_TITLE,
      description: LIVE_SHARE_COPY,
      url: routes.las21,
      images: [{ url: LAS21_OG_IMAGE, alt: "LAS 21" }],
    },
    twitter: {
      card: "summary_large_image",
      title: OG_DROP_TITLE,
      description: LIVE_SHARE_COPY,
      images: [LAS21_OG_IMAGE],
    },
  };
}
