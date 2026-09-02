import { isThisWeek } from "@/lib/analytics";

export type SharePayload = {
  sku_id: string;
};

export type ShareEvent = {
  event: "share";
  payload: SharePayload;
  ts: number;
};

const STORAGE_KEY = "curadario:shares";
const EMPTY: ShareEvent[] = [];
const EMPTY_MAP: Record<string, number> = {};

type Listener = () => void;

const listeners = new Set<Listener>();
let cachedRaw = "";
let cachedEvents: ShareEvent[] = EMPTY;
let cachedWeekMap: Record<string, number> = EMPTY_MAP;

function parse(raw: string): ShareEvent[] {
  try {
    const value = JSON.parse(raw) as unknown;
    if (!Array.isArray(value)) return EMPTY;
    const events = value.filter(
      (entry): entry is ShareEvent =>
        Boolean(entry) &&
        typeof entry === "object" &&
        (entry as ShareEvent).event === "share" &&
        typeof (entry as ShareEvent).payload?.sku_id === "string" &&
        typeof (entry as ShareEvent).ts === "number",
    );
    return events.length === 0 ? EMPTY : events;
  } catch {
    return EMPTY;
  }
}

function weekShareMapFrom(
  events: ShareEvent[],
  now = Date.now(),
): Record<string, number> {
  if (events.length === 0) return EMPTY_MAP;
  const counts: Record<string, number> = {};
  let any = false;
  for (const entry of events) {
    if (!isThisWeek(entry.ts, now)) continue;
    const id = entry.payload.sku_id;
    counts[id] = (counts[id] ?? 0) + 1;
    any = true;
  }
  return any ? counts : EMPTY_MAP;
}

function hydrate(raw: string) {
  if (raw === cachedRaw) return;
  cachedRaw = raw;
  cachedEvents = parse(raw);
  cachedWeekMap = weekShareMapFrom(cachedEvents);
}

function readRaw(): string {
  if (typeof window === "undefined") return "[]";
  return window.localStorage.getItem(STORAGE_KEY) || "[]";
}

function emit() {
  listeners.forEach((listener) => listener());
}

export function trackShare(skuId: string): void {
  if (typeof window === "undefined" || !skuId) return;
  const entry: ShareEvent = {
    event: "share",
    payload: { sku_id: skuId },
    ts: Date.now(),
  };
  try {
    const existing = [...getStoredShares(), entry];
    const raw = JSON.stringify(existing);
    window.localStorage.setItem(STORAGE_KEY, raw);
    hydrate(raw);
  } catch {
    // Shares must never block the shopper.
  }
  window.dispatchEvent(new CustomEvent("curadario:share", { detail: entry }));
  emit();
}

export function getStoredShares(): ShareEvent[] {
  hydrate(readRaw());
  return cachedEvents;
}

export function getWeekShareMap(): Record<string, number> {
  hydrate(readRaw());
  return cachedWeekMap;
}

export function getServerShareMap(): Record<string, number> {
  return EMPTY_MAP;
}

export function countSharesThisWeek(skuId?: string): number {
  const map = getWeekShareMap();
  if (skuId) return map[skuId] ?? 0;
  let total = 0;
  for (const value of Object.values(map)) total += value;
  return total;
}

export function subscribeShares(listener: Listener): () => void {
  listeners.add(listener);
  const onShare = () => listener();
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) listener();
  };
  window.addEventListener("curadario:share", onShare);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("curadario:share", onShare);
    window.removeEventListener("storage", onStorage);
  };
}
