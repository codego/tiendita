const STORAGE_KEY = "curadario:saved";
const EMPTY: string[] = [];

type Listener = () => void;

const listeners = new Set<Listener>();
let cachedRaw = "";
let cachedIds: string[] = [];

function readRaw(): string {
  if (typeof window === "undefined") return "[]";
  return window.localStorage.getItem(STORAGE_KEY) || "[]";
}

function parse(raw: string): string[] {
  try {
    const value = JSON.parse(raw) as unknown;
    return Array.isArray(value)
      ? value.filter((id): id is string => typeof id === "string")
      : [];
  } catch {
    return [];
  }
}

function emit() {
  listeners.forEach((listener) => listener());
}

export function getSavedIds(): string[] {
  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedIds = parse(raw);
  }
  return cachedIds;
}

export function getServerSavedIds(): string[] {
  return EMPTY;
}

export function subscribeSaved(listener: Listener): () => void {
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

export function toggleSaved(skuId: string): void {
  const next = new Set(getSavedIds());
  if (next.has(skuId)) next.delete(skuId);
  else next.add(skuId);
  const raw = JSON.stringify([...next]);
  window.localStorage.setItem(STORAGE_KEY, raw);
  cachedRaw = raw;
  cachedIds = [...next];
  emit();
}

export function isSaved(skuId: string, ids = getSavedIds()): boolean {
  return ids.includes(skuId);
}
