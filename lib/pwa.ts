import { PWA_KEY } from "@/lib/edges";

type Listener = () => void;

const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function getPwaDismissed(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem(PWA_KEY) === "1";
  } catch {
    return true;
  }
}

export function getServerPwaDismissed(): boolean {
  return true;
}

export function subscribePwa(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function markPwaDismissed(): void {
  try {
    window.localStorage.setItem(PWA_KEY, "1");
  } catch {
    // Private mode — still hide for this session.
  }
  emit();
}
