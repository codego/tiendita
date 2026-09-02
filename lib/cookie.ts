import { COOKIE_KEY } from "@/lib/edges";

type Listener = () => void;

const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function getCookieAccepted(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem(COOKIE_KEY) === "1";
  } catch {
    return true;
  }
}

export function getServerCookieAccepted(): boolean {
  return true;
}

export function subscribeCookie(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function markCookieAccepted(): void {
  try {
    window.localStorage.setItem(COOKIE_KEY, "1");
  } catch {
    // Private mode — still hide for this session.
  }
  emit();
}
