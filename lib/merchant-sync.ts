import { getTiendaNubeProducts, getTiendaNubeStore } from "@/lib/tiendanube";
import {
  fetchTnProducts,
  fetchTnStore,
  type TnSession,
} from "@/lib/tiendanube-oauth";
import type { TiendaNubeProduct, TiendaNubeStore } from "@/lib/types";

export const SYNC_FAIL_PARAM = "sync";
export const SYNC_FAIL_VALUE = "fail";
export const SYNC_OK_VALUE = "ok";

export function isSyncFailQuery(value: string | undefined): boolean {
  return value === SYNC_FAIL_VALUE;
}

export function isSyncOkQuery(value: string | undefined): boolean {
  return value === SYNC_OK_VALUE;
}

export type MerchantCatalog = {
  store: TiendaNubeStore;
  products: TiendaNubeProduct[];
};

export function mockCatalog(): MerchantCatalog {
  return {
    store: getTiendaNubeStore(),
    products: getTiendaNubeProducts(),
  };
}

export async function syncLiveCatalog(
  session: TnSession,
): Promise<MerchantCatalog> {
  const [store, products] = await Promise.all([
    fetchTnStore(session),
    fetchTnProducts(session),
  ]);
  return { store: { ...store, syncedCount: products.length }, products };
}
