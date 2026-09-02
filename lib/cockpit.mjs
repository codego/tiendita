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
