import { isThisWeek } from "@/lib/analytics";

export type VisitPayload = {
  sku_id?: string;
  brand?: string;
};

export type VisitEvent = {
  event: "visit";
  payload: VisitPayload;
  ts: number;
};

const STORAGE_KEY = "curadario:visits";
const EMPTY: VisitEvent[] = [];

type Listener = () => void;

const listeners = new Set<Listener>();
let cachedRaw = "";
let cachedEvents: VisitEvent[] = EMPTY;

function parse(raw: string): VisitEvent[] {
  try {
    const value = JSON.parse(raw) as unknown;
    if (!Array.isArray(value)) return EMPTY;
    const events = value.filter(
      (entry): entry is VisitEvent =>
        Boolean(entry) &&
        typeof entry === "object" &&
        (entry as VisitEvent).event === "visit" &&
        typeof (entry as VisitEvent).ts === "number",
    );
    return events.length === 0 ? EMPTY : events;
  } catch {
    return EMPTY;
  }
}

function hydrate(raw: string) {
  if (raw === cachedRaw) return;
  cachedRaw = raw;
  cachedEvents = parse(raw);
}

function readRaw(): string {
  if (typeof window === "undefined") return "[]";
  return window.localStorage.getItem(STORAGE_KEY) || "[]";
}

function emit() {
  listeners.forEach((listener) => listener());
}

export function trackVisit(payload: VisitPayload): void {
  if (typeof window === "undefined") return;
  const entry: VisitEvent = {
    event: "visit",
    payload,
    ts: Date.now(),
  };
  try {
    const existing = [...getStoredVisits(), entry];
    const raw = JSON.stringify(existing);
    window.localStorage.setItem(STORAGE_KEY, raw);
    hydrate(raw);
  } catch {
    // Visits must never block the shopper.
  }
  window.dispatchEvent(new CustomEvent("curadario:visit", { detail: entry }));
  emit();
}

export function getStoredVisits(): VisitEvent[] {
  hydrate(readRaw());
  return cachedEvents;
}

export function countVisitsThisWeek(now = Date.now()): number {
  return getStoredVisits().filter((entry) => isThisWeek(entry.ts, now)).length;
}

export function subscribeVisits(listener: Listener): () => void {
  listeners.add(listener);
  const onVisit = () => listener();
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) listener();
  };
  window.addEventListener("curadario:visit", onVisit);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("curadario:visit", onVisit);
    window.removeEventListener("storage", onStorage);
  };
}
