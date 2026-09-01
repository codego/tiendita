import { getSku } from "@/lib/catalog";
import type { Sku } from "@/lib/types";

export {
  ANOCHE_LABEL,
  DAY_LINE,
  ESTA_LABEL,
  LAS21_DURATION_MINUTES,
  LAS21_HOUR,
  LAS21_LABEL,
  LAS21_TIMEZONE,
  LIVE_LABEL,
  LIVE_SHARE_COPY,
  RAIL_LABEL,
  RECIEN_STAMP,
  REMIND_CTA,
  REMIND_DONE,
  VER_TODO,
  formatDayCountdown,
  formatLiveCountdown,
  isForceDropParam,
  isInLas21Window,
  isJustDropped,
  isLas21Live,
  liveRemainingMs,
  msUntilNextLas21,
  nextLas21StartMs,
  stageIndex,
  todayWindowStartMs,
  zonedDateToUtcMs,
  zonedParts,
} from "./las21-time.mjs";

export const TONIGHT_DROP_IDS = [
  "tapado-coppola",
  "saco-frances",
  "pantalon-pinza",
  "camisa-oxford",
  "mocasin-goma",
  "tote-lona",
  "baguette-napa",
] as const;

export const ESTA_O_ESTA_IDS = ["tapado-coppola", "saco-frances"] as const;

export const ANOCHE_IDS = [
  "tote-lona",
  "baguette-napa",
  "enteriza-canale",
  "camisa-oxford",
] as const;

function skusFromIds(ids: readonly string[]): Sku[] {
  return ids.map((id) => {
    const sku = getSku(id);
    if (!sku) {
      throw new Error(`Missing Las 21 sku: ${id}`);
    }
    return sku;
  });
}

function assertOnePerStore(skus: Sku[], label: string): void {
  const brands = new Set(skus.map((sku) => sku.brand));
  if (brands.size !== skus.length) {
    throw new Error(`${label} must be one piece per store`);
  }
}

export function getTonightDrop(): Sku[] {
  const skus = skusFromIds(TONIGHT_DROP_IDS);
  assertOnePerStore(skus, "Tonight");
  return skus;
}

export function getEstaOEsta(): Sku[] {
  const skus = skusFromIds(ESTA_O_ESTA_IDS);
  assertOnePerStore(skus, "¿Esta o esta?");
  return skus;
}

export function getAnocheForwarded(): Sku[] {
  const skus = skusFromIds(ANOCHE_IDS);
  assertOnePerStore(skus, "Anoche");
  return skus;
}

export function splitStageAndRail(skus: Sku[]): {
  stage: Sku;
  rail: Sku[];
} {
  const stage = skus[0];
  return {
    stage,
    rail: skus.slice(1),
  };
}
