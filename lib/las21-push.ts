import { LAS21_PING_DAY_KEY, LAS21_PUSH_KEY, LAS21_PUSH_OFF_KEY } from "@/lib/edges";
import {
  PUSH_BODY,
  PUSH_TAG,
  PUSH_TITLE,
  PUSH_URL,
  isForcePingParam,
  isInPingWindow,
  msUntilNextPing,
  nextPingMs,
  pingDayKey,
} from "@/lib/las21";
import { isIosDevice, isStandaloneDisplay } from "@/lib/pwa";

type Listener = () => void;

const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function subscribeLas21Push(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function notificationsSupported(): boolean {
  if (typeof window === "undefined") return false;
  if (!("Notification" in window)) return false;
  if (isIosDevice() && !isStandaloneDisplay()) return false;
  return true;
}

export function notificationPermission(): NotificationPermission | "unsupported" {
  if (!notificationsSupported()) return "unsupported";
  try {
    return Notification.permission;
  } catch {
    return "unsupported";
  }
}

export function hasNotificationPermission(): boolean {
  return notificationPermission() === "granted";
}

export function getPushSheetDismissed(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem(LAS21_PUSH_KEY) === "1";
  } catch {
    return true;
  }
}

export function forceSheetFromLocation(
  search: string = typeof window === "undefined" ? "" : window.location.search,
): boolean {
  return new URLSearchParams(search).get("avisame") === "1";
}

export function getPushSheetHidden(): boolean {
  if (typeof window === "undefined") return true;
  if (getPushSheetDismissed()) return true;
  if (forceSheetFromLocation()) return false;
  if (!notificationsSupported()) return true;
  return notificationPermission() !== "default";
}

export function getServerPushSheetHidden(): boolean {
  return true;
}

export function markPushSheetDismissed(): void {
  try {
    window.localStorage.setItem(LAS21_PUSH_KEY, "1");
  } catch {
    // Private mode — still hide for this session.
  }
  emit();
}

export function clearPushSheetDismissed(): void {
  try {
    window.localStorage.removeItem(LAS21_PUSH_KEY);
  } catch {
    // Private mode — still treat as cleared this session.
  }
  emit();
}

export function isLas21OptedOut(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(LAS21_PUSH_OFF_KEY) === "1";
  } catch {
    return false;
  }
}

export function getLas21PingEnabled(): boolean {
  return hasNotificationPermission() && !isLas21OptedOut();
}

export function getServerLas21PingEnabled(): boolean {
  return false;
}

export function getLas21PingBlocked(): boolean {
  const permission = notificationPermission();
  return permission === "denied" || permission === "unsupported";
}

export function getServerLas21PingBlocked(): boolean {
  return false;
}

export function optOutLas21Ping(): void {
  try {
    window.localStorage.setItem(LAS21_PUSH_OFF_KEY, "1");
    window.localStorage.setItem(LAS21_PUSH_KEY, "1");
  } catch {
    // Private mode — still stop the ping this session.
  }
  emit();
}

export async function optInLas21Ping(): Promise<
  NotificationPermission | "unsupported"
> {
  if (!notificationsSupported()) {
    try {
      window.localStorage.removeItem(LAS21_PUSH_OFF_KEY);
    } catch {
      // Private mode — still report the honest unsupported state.
    }
    clearPushSheetDismissed();
    return "unsupported";
  }
  let permission: NotificationPermission = Notification.permission;
  try {
    if (permission === "default") {
      permission = await Notification.requestPermission();
    }
  } catch {
    // OS prompt unavailable — leave the toggle honest.
  }
  try {
    window.localStorage.removeItem(LAS21_PUSH_OFF_KEY);
  } catch {
    // Private mode — still emit so the scheduler re-plans.
  }
  clearPushSheetDismissed();
  return permission;
}

export function hasFiredPingToday(now: number = Date.now()): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem(LAS21_PING_DAY_KEY) === pingDayKey(now);
  } catch {
    return true;
  }
}

export function markPingFired(now: number = Date.now()): void {
  try {
    window.localStorage.setItem(LAS21_PING_DAY_KEY, pingDayKey(now));
  } catch {
    // Private mode — still treat as fired this session.
  }
}

export function vapidPublicKey(): string {
  return (process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? "").trim();
}

function urlBase64ToUint8Array(base64: string): BufferSource {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const raw = atob((base64 + padding).replace(/-/g, "+").replace(/_/g, "/"));
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i += 1) {
    out[i] = raw.charCodeAt(i);
  }
  return out;
}

export async function registerLas21Worker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) {
    return null;
  }
  try {
    const reg = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    });
    if (hasNotificationPermission() && vapidPublicKey() && "PushManager" in window) {
      try {
        await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidPublicKey()),
        });
      } catch {
        // No VAPID private key / server store — local 20:55 still works.
      }
    }
    return reg;
  } catch {
    return null;
  }
}

export async function showLas21Notification(
  force = false,
): Promise<boolean> {
  if (!hasNotificationPermission()) return false;
  const now = Date.now();
  if (!force && hasFiredPingToday(now)) return false;

  const options: NotificationOptions = {
    body: PUSH_BODY,
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    tag: PUSH_TAG,
    data: { url: PUSH_URL },
  };

  try {
    const ready = navigator.serviceWorker
      ? await navigator.serviceWorker.ready.catch(() => null)
      : null;
    if (ready) {
      await ready.showNotification(PUSH_TITLE, options);
    } else {
      new Notification(PUSH_TITLE, options);
    }
    if (!force) markPingFired(now);
    return true;
  } catch {
    return false;
  }
}

export async function requestLas21Permission(): Promise<NotificationPermission | "unsupported"> {
  if (!notificationsSupported()) {
    markPushSheetDismissed();
    return "unsupported";
  }
  let permission: NotificationPermission = Notification.permission;
  try {
    if (permission === "default") {
      permission = await Notification.requestPermission();
    }
  } catch {
    // OS prompt unavailable — still remember so we don't spam the sheet.
  }
  markPushSheetDismissed();
  return permission;
}

export function forcePingFromLocation(
  search: string = typeof window === "undefined" ? "" : window.location.search,
): boolean {
  return isForcePingParam(new URLSearchParams(search).get("ping") ?? undefined);
}

export function armLas21LocalPing(): () => void {
  if (typeof window === "undefined") return () => {};

  let timeout = 0;

  function plan() {
    window.clearTimeout(timeout);
    if (!hasNotificationPermission() || isLas21OptedOut()) return;
    if (forcePingFromLocation()) {
      void showLas21Notification(true);
      return;
    }
    const now = Date.now();
    if (hasFiredPingToday(now)) {
      timeout = window.setTimeout(() => {
        void showLas21Notification();
      }, Math.max(1_000, nextPingMs(now) - now));
      return;
    }
    const wait = msUntilNextPing(now);
    if (wait === 0 && isInPingWindow(now)) {
      void showLas21Notification();
      return;
    }
    timeout = window.setTimeout(() => {
      void showLas21Notification();
    }, Math.max(1_000, wait));
  }

  plan();
  const onVis = () => plan();
  document.addEventListener("visibilitychange", onVis);
  const unsub = subscribeLas21Push(plan);
  return () => {
    window.clearTimeout(timeout);
    document.removeEventListener("visibilitychange", onVis);
    unsub();
  };
}
