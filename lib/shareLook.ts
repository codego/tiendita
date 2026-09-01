import { shareCopy } from "@/lib/brand";
import { routes } from "@/lib/routes";

export function lookPath(): string {
  return routes.coleccion;
}

export function lookUrl(origin: string): string {
  return `${origin}${lookPath()}`;
}

export function lookShareText(url: string): string {
  return [shareCopy.kit, shareCopy.lookTitle, url].join("\n");
}

export function whatsappShareHref(url: string): string {
  return `https://wa.me/?text=${encodeURIComponent(lookShareText(url))}`;
}
