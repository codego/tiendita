import { defaultSelectedIds } from "@/lib/tiendanube";

const STORAGE_KEY = "curadario:published";
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
      : defaultSelectedIds();
  } catch {
    return defaultSelectedIds();
  }
}

function emit() {
  listeners.forEach((listener) => listener());
}

export function getPublishedIds(): string[] {
  const raw = readRaw();
  if (raw === null) {
    cachedRaw = "";
    cachedIds = defaultSelectedIds();
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
  emit();
}
