export const NETWORK_FAIL_EVENT = "curadario:network-fail";

export function reportNetworkFail(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(NETWORK_FAIL_EVENT));
}

export function isBrowserOffline(): boolean {
  return typeof navigator !== "undefined" && navigator.onLine === false;
}

export function subscribeOnlineStatus(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("online", onStoreChange);
  window.addEventListener("offline", onStoreChange);
  return () => {
    window.removeEventListener("online", onStoreChange);
    window.removeEventListener("offline", onStoreChange);
  };
}
