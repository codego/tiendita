export const HISTORY_FALLBACK = "/";

export function hasInAppHistory(state, referrer = "", origin = "") {
  const idx = state && typeof state === "object" ? state.idx : undefined;
  if (typeof idx === "number" && idx > 0) return true;
  if (!referrer || !origin) return false;
  try {
    return new URL(referrer).origin === origin;
  } catch {
    return false;
  }
}

export function goBackInApp(router, snapshot = {}) {
  const inApp = hasInAppHistory(
    snapshot.state,
    snapshot.referrer,
    snapshot.origin,
  );
  if (inApp) {
    router.back();
    return;
  }
  router.replace(HISTORY_FALLBACK);
}
