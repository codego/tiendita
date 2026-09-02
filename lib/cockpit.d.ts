export function tonightXor(piece: unknown): {
  showCard: boolean;
  showEmpty: boolean;
};

export function rankForwarded<T extends { count: number; name?: string }>(
  items: readonly T[],
  limit?: number,
): T[];

export function pickTonightPiece<T extends { brand: string }>(
  storeName: string,
  drop: readonly T[],
): T | null;
