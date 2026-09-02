import { PWA_IOS_KEY, PWA_KEY } from "@/lib/edges";

type Listener = () => void;
type SafariNavigator = Navigator & { standalone?: boolean };

const listeners = new Set<Listener>();
const iosListeners = new Set<Listener>();

const OTHER_IOS_BROWSERS =
  /CriOS|FxiOS|EdgiOS|OPiOS|OPT\/|DuckDuckGo|GSA\/|FBAN|FBAV|Instagram/i;

function emit() {
  listeners.forEach((listener) => listener());
}

function emitIos() {
  iosListeners.forEach((listener) => listener());
}

export function isStandaloneDisplay(): boolean {
  if (typeof window === "undefined") return false;
  const nav = window.navigator as SafariNavigator;
  if (nav.standalone === true) return true;
  try {
    if (window.matchMedia("(display-mode: standalone)").matches) return true;
  } catch {
    // matchMedia can throw in odd webviews.
  }
  return false;
}

export function isIosDevice(
  ua: string = typeof navigator === "undefined" ? "" : navigator.userAgent,
): boolean {
  if (/iPhone|iPad|iPod/i.test(ua)) return true;
  if (
    typeof navigator !== "undefined" &&
    navigator.platform === "MacIntel" &&
    navigator.maxTouchPoints > 1
  ) {
    return true;
  }
  return false;
}

export function isIosSafari(
  ua: string = typeof navigator === "undefined" ? "" : navigator.userAgent,
): boolean {
  if (!isIosDevice(ua)) return false;
  return !OTHER_IOS_BROWSERS.test(ua);
}

export function getPwaDismissed(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem(PWA_KEY) === "1";
  } catch {
    return true;
  }
}

export function getPwaAndroidHidden(): boolean {
  if (typeof window === "undefined") return true;
  if (isStandaloneDisplay()) return true;
  if (isIosDevice()) return true;
  return getPwaDismissed();
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

export function getPwaIosDismissed(): boolean {
  if (typeof window === "undefined") return true;
  if (isStandaloneDisplay()) return true;
  if (!isIosSafari()) return true;
  try {
    return window.localStorage.getItem(PWA_IOS_KEY) === "1";
  } catch {
    return true;
  }
}

export function getServerPwaIosDismissed(): boolean {
  return true;
}

export function subscribePwaIos(listener: Listener): () => void {
  iosListeners.add(listener);
  return () => {
    iosListeners.delete(listener);
  };
}

export function markPwaIosDismissed(): void {
  try {
    window.localStorage.setItem(PWA_IOS_KEY, "1");
  } catch {
    // Private mode — still hide for this session.
  }
  emitIos();
}
