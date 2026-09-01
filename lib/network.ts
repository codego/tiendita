export const NETWORK_FAIL_EVENT = "curadario:network-fail";

export function reportNetworkFail(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(NETWORK_FAIL_EVENT));
}

export function isBrowserOffline(): boolean {
  return typeof navigator !== "undefined" && navigator.onLine === false;
}
