const STORAGE_KEY = "curadario:last-sync";

type Listener = () => void;

const listeners = new Set<Listener>();
let cachedAt: number | null = null;

function emit() {
  listeners.forEach((listener) => listener());
}

export function getLastSyncAt(now = Date.now()): number {
  if (typeof window === "undefined") return now;
  if (cachedAt != null) return cachedAt;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  const parsed = raw ? Number(raw) : NaN;
  cachedAt = Number.isFinite(parsed) ? parsed : now;
  return cachedAt;
}

export function setLastSyncAt(at = Date.now()): number {
  cachedAt = at;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, String(at));
  }
  emit();
  return at;
}

export function subscribeLastSync(listener: Listener): () => void {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      cachedAt = null;
      listener();
    }
  };
  if (typeof window !== "undefined") {
    window.addEventListener("storage", onStorage);
  }
  return () => {
    listeners.delete(listener);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", onStorage);
    }
  };
}
