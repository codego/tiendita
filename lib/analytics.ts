export type CtaToStorePayload = {
  sku_id: string;
  collection_id: string;
  store_url: string;
};

export type AnalyticsEvent = {
  event: "cta_to_store";
  payload: CtaToStorePayload;
  ts: number;
};

const STORAGE_KEY = "curadario:events";

export function trackCtaToStore(payload: CtaToStorePayload): void {
  const entry: AnalyticsEvent = {
    event: "cta_to_store",
    payload,
    ts: Date.now(),
  };

  if (typeof window === "undefined") return;

  console.info("[curadario]", entry.event, payload);

  try {
    const existing = JSON.parse(
      window.localStorage.getItem(STORAGE_KEY) || "[]",
    ) as AnalyticsEvent[];
    existing.push(entry);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // Analytics must never block the store CTA.
  }

  window.dispatchEvent(new CustomEvent("curadario:event", { detail: entry }));
}
