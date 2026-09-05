export const LAST_DROP_AVISO_SEED: 47;
export const AVISO_QUERY_PARAM: "aviso";

export function parseAvisoQuery(value: unknown): number | null;

export function lastDropAvisoCount(queryValue?: unknown, seed?: number): number;

export function avisoXor(count: number): {
  showCount: boolean;
  showEmpty: boolean;
};

export function lastDropRelativeKind(now?: number): "anoche" | "hoy";

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
