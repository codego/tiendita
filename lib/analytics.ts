export type CtaToStorePayload = {
  sku_id: string;
  collection_id: string;
  store_url: string;
};

export type AnalyticsEvent = {
  event: "cta_to_store";
  payload: CtaToStorePayload;
  ts: number;
};

const STORAGE_KEY = "curadario:events";
const EMPTY_EVENTS: AnalyticsEvent[] = [];
const EMPTY_MAP: Record<string, number> = {};

let cachedRaw = "";
let cachedEvents: AnalyticsEvent[] = EMPTY_EVENTS;
let cachedMap: Record<string, number> = EMPTY_MAP;

function parseEvents(raw: string): AnalyticsEvent[] {
  try {
    const value = JSON.parse(raw) as unknown;
    if (!Array.isArray(value)) return EMPTY_EVENTS;
    const events = value.filter(
      (entry): entry is AnalyticsEvent =>
        Boolean(entry) &&
        typeof entry === "object" &&
        (entry as AnalyticsEvent).event === "cta_to_store" &&
        typeof (entry as AnalyticsEvent).payload?.sku_id === "string",
    );
    return events.length === 0 ? EMPTY_EVENTS : events;
  } catch {
    return EMPTY_EVENTS;
  }
}

function clickMapFrom(events: AnalyticsEvent[]): Record<string, number> {
  if (events.length === 0) return EMPTY_MAP;
  const counts: Record<string, number> = {};
  for (const entry of events) {
    const id = entry.payload.sku_id;
    counts[id] = (counts[id] ?? 0) + 1;
  }
  return counts;
}

function hydrate(raw: string) {
  if (raw === cachedRaw) return;
  cachedRaw = raw;
  cachedEvents = parseEvents(raw);
  cachedMap = clickMapFrom(cachedEvents);
}

function readRaw(): string {
  if (typeof window === "undefined") return "[]";
  return window.localStorage.getItem(STORAGE_KEY) || "[]";
}

export function trackCtaToStore(payload: CtaToStorePayload): void {
  const entry: AnalyticsEvent = {
    event: "cta_to_store",
    payload,
    ts: Date.now(),
  };

  if (typeof window === "undefined") return;

  console.info("[curadario]", entry.event, payload);

  try {
    const existing = [...getStoredEvents(), entry];
    const raw = JSON.stringify(existing);
    window.localStorage.setItem(STORAGE_KEY, raw);
    hydrate(raw);
  } catch {
    // Analytics must never block the store CTA.
  }

  window.dispatchEvent(new CustomEvent("curadario:event", { detail: entry }));
}

export function getStoredEvents(): AnalyticsEvent[] {
  hydrate(readRaw());
  return cachedEvents;
}

export function getServerStoredEvents(): AnalyticsEvent[] {
  return EMPTY_EVENTS;
}

export function getClickMap(): Record<string, number> {
  hydrate(readRaw());
  return cachedMap;
}

export function getServerClickMap(): Record<string, number> {
  return EMPTY_MAP;
}

export function countStoreClicks(skuId?: string): number {
  if (!skuId) return getStoredEvents().length;
  return getClickMap()[skuId] ?? 0;
}

export function subscribeAnalytics(listener: () => void): () => void {
  const onEvent = () => listener();
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) listener();
  };
  window.addEventListener("curadario:event", onEvent);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener("curadario:event", onEvent);
    window.removeEventListener("storage", onStorage);
  };
}
