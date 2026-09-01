import { getSku } from "@/lib/catalog";
import type { Sku } from "@/lib/types";

const STORAGE_KEY = "curadario:recien";

export type RecienBump = { id: string; at: number };
export type RecienEntry = { sku: Sku; at: number };

const EMPTY_IDS: string[] = [];
const EMPTY_ENTRIES: RecienEntry[] = [];

export const TN_TO_SKU: Record<string, string> = {
  "tn-tapado-coppola": "tapado-coppola",
  "tn-saco-frances": "saco-frances",
  "tn-pantalon-pinza": "pantalon-pinza",
  "tn-camisa-oxford": "camisa-oxford",
  "tn-mocasin-goma": "mocasin-goma",
  "tn-blazer-lino": "blazer-crudo",
  "tn-pollera-midi": "pollera-midi",
  "tn-sweater-canale": "sweater-punto",
  "tn-vestido-camisero": "vestido-liniers",
  "tn-campera-pano": "campera-gabardina",
  "tn-chaleco-sastre": "chaleco-sastre",
  "tn-jean-recto": "pantalon-vestir",
  "tn-remera-oversize": "remera-hilo",
  "tn-short-sastre": "short-cancha",
  "tn-trench-beige": "tapado-corto",
  "tn-cardigan-lana": "jumper-lana",
};

type Listener = () => void;

const listeners = new Set<Listener>();
let cachedRaw = "";
let cachedBumps: RecienBump[] = [];
let cachedIds: string[] = EMPTY_IDS;
let cachedEntries: RecienEntry[] = EMPTY_ENTRIES;
let cachedIdsRaw = "";
let cachedEntriesRaw = "";

function emit() {
  listeners.forEach((listener) => listener());
}

function readRaw(): string {
  if (typeof window === "undefined") return "[]";
  return window.localStorage.getItem(STORAGE_KEY) || "[]";
}

function parse(raw: string): RecienBump[] {
  try {
    const value = JSON.parse(raw) as unknown;
    if (!Array.isArray(value)) return [];
    return value.filter(
      (entry): entry is RecienBump =>
        Boolean(entry) &&
        typeof entry === "object" &&
        typeof (entry as RecienBump).id === "string" &&
        typeof (entry as RecienBump).at === "number",
    );
  } catch {
    return [];
  }
}

export function catalogIdsFromTn(tnIds: string[]): string[] {
  const ids: string[] = [];
  const seen = new Set<string>();
  for (const tnId of tnIds) {
    const skuId = TN_TO_SKU[tnId] ?? tnId.replace(/^tn-/, "");
    if (!getSku(skuId) || seen.has(skuId)) continue;
    seen.add(skuId);
    ids.push(skuId);
  }
  return ids;
}

export function seedRecienIds(): string[] {
  return EMPTY_IDS;
}

export function mergeRecienOrder(
  _seedIds: string[],
  bumps: RecienBump[],
): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const bump of [...bumps].sort((a, b) => b.at - a.at)) {
    if (seen.has(bump.id) || !getSku(bump.id)) continue;
    seen.add(bump.id);
    out.push(bump.id);
  }
  return out.length === 0 ? EMPTY_IDS : out;
}

export function getRecienBumps(): RecienBump[] {
  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedBumps = parse(raw);
  }
  return cachedBumps;
}

export function getServerRecienIds(): string[] {
  return EMPTY_IDS;
}

export function getRecienIds(): string[] {
  const raw = readRaw();
  if (raw !== cachedIdsRaw) {
    cachedIdsRaw = raw;
    cachedIds = mergeRecienOrder(EMPTY_IDS, getRecienBumps());
  }
  return cachedIds;
}

export function getRecienSkus(limit = 16): Sku[] {
  return getRecienIds()
    .map((id) => getSku(id))
    .filter((sku): sku is Sku => sku != null)
    .slice(0, limit);
}

export function getRecienEntries(): RecienEntry[] {
  const raw = readRaw();
  if (raw !== cachedEntriesRaw) {
    cachedEntriesRaw = raw;
    const entries = getRecienBumps()
      .slice()
      .sort((a, b) => b.at - a.at)
      .flatMap((bump) => {
        const sku = getSku(bump.id);
        return sku ? [{ sku, at: bump.at }] : [];
      });
    cachedEntries = entries.length === 0 ? EMPTY_ENTRIES : entries;
  }
  return cachedEntries;
}

export function getServerRecienEntries(): RecienEntry[] {
  return EMPTY_ENTRIES;
}

export function subscribeRecien(listener: Listener): () => void {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) listener();
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

export function bumpRecien(skuIds: string[], at = Date.now()): string[] {
  const next = [...getRecienBumps()];
  for (const id of [...skuIds].reverse()) {
    if (!getSku(id)) continue;
    const index = next.findIndex((entry) => entry.id === id);
    if (index >= 0) next.splice(index, 1);
    next.unshift({ id, at });
  }
  const raw = JSON.stringify(next);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, raw);
  }
  cachedRaw = raw;
  cachedBumps = next;
  cachedIdsRaw = raw;
  cachedEntriesRaw = raw;
  cachedIds = mergeRecienOrder(EMPTY_IDS, next);
  cachedEntries = getRecienBumps()
    .slice()
    .sort((a, b) => b.at - a.at)
    .flatMap((bump) => {
      const sku = getSku(bump.id);
      return sku ? [{ sku, at: bump.at }] : [];
    });
  if (cachedEntries.length === 0) cachedEntries = EMPTY_ENTRIES;
  emit();
  return cachedIds;
}
