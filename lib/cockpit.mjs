import { todayWindowStartMs } from "./las21-time.mjs";

export const LAST_DROP_AVISO_SEED = 47;
export const AVISO_QUERY_PARAM = "aviso";

export function parseAvisoQuery(value) {
  if (value == null || value === "") return null;
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0) return null;
  return Math.floor(n);
}

/** Opens of the 20:55 / Las 21 aviso for the last drop only. Seeded until real push-open analytics exist. */
export function lastDropAvisoCount(queryValue, seed = LAST_DROP_AVISO_SEED) {
  const override = parseAvisoQuery(queryValue);
  return override ?? seed;
}

export function avisoXor(count) {
  const n = Math.max(0, Math.floor(Number(count) || 0));
  const showCount = n > 0;
  return {
    showCount,
    showEmpty: !showCount,
  };
}

export function lastDropRelativeKind(now = Date.now()) {
  return now >= todayWindowStartMs(now) ? "hoy" : "anoche";
}

export function tonightXor(piece) {
  return {
    showCard: Boolean(piece),
    showEmpty: !piece,
  };
}

export function rankForwarded(items, limit = 3) {
  return [...items]
    .filter((item) => (item?.count ?? 0) > 0)
    .sort(
      (a, b) =>
        b.count - a.count ||
        String(a.name ?? "").localeCompare(String(b.name ?? ""), "es"),
    )
    .slice(0, limit);
}

export function pickTonightPiece(storeName, drop) {
  if (!storeName || !Array.isArray(drop)) return null;
  return drop.find((sku) => sku?.brand === storeName) ?? null;
}
