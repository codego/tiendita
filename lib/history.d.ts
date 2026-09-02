export const HISTORY_FALLBACK: "/";

export function hasInAppHistory(
  state?: { idx?: unknown } | null,
  referrer?: string,
  origin?: string,
): boolean;

export function goBackInApp(
  router: { back: () => void; replace: (href: string) => void },
  snapshot?: {
    state?: { idx?: unknown } | null;
    referrer?: string;
    origin?: string;
  },
): void;
