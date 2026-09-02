import { catalogIdsFromTn, TN_TO_SKU } from "@/lib/recien";

const STORAGE_KEY = "curadario:published";
const ONCE_KEY = "curadario:published-once";
const EMPTY: string[] = [];

type Listener = () => void;

const listeners = new Set<Listener>();
let cachedRaw = "";
let cachedIds: string[] | null = null;

function readRaw(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(STORAGE_KEY);
}

function parse(raw: string): string[] {
  try {
    const value = JSON.parse(raw) as unknown;
    return Array.isArray(value)
      ? value.filter((id): id is string => typeof id === "string")
      : EMPTY;
  } catch {
    return EMPTY;
  }
}

function emit() {
  listeners.forEach((listener) => listener());
}

export function hasPublishedOverride(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEY) !== null;
}

export function hasPublishedOnce(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(ONCE_KEY) === "1";
}

export function markPublishedOnce(): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ONCE_KEY, "1");
}

export function getPublishedIds(): string[] {
  const raw = readRaw();
  if (raw === null) {
    cachedRaw = "";
    cachedIds = EMPTY;
    return cachedIds;
  }
  if (raw !== cachedRaw || cachedIds === null) {
    cachedRaw = raw;
    cachedIds = parse(raw);
  }
  return cachedIds;
}

export function getServerPublishedIds(): string[] {
  return EMPTY;
}

export function subscribePublished(listener: Listener): () => void {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function setPublishedIds(ids: string[]): void {
  const raw = JSON.stringify(ids);
  window.localStorage.setItem(STORAGE_KEY, raw);
  cachedRaw = raw;
  cachedIds = [...ids];
  if (ids.length > 0) markPublishedOnce();
  emit();
}

export function filterFeedSkus<T extends { id: string }>(
  skus: T[],
  publishedIds: string[] = getPublishedIds(),
  override = hasPublishedOverride(),
): T[] {
  if (!override) return skus;
  const allowed = new Set(catalogIdsFromTn(publishedIds));
  const merchant = new Set(Object.values(TN_TO_SKU));
  return skus.filter((sku) => !merchant.has(sku.id) || allowed.has(sku.id));
}
