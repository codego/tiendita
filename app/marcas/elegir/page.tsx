import { cookies } from "next/headers";
import { BrandPicker } from "@/components/BrandPicker";
import { elegirCopy } from "@/lib/brand";
import { getTiendaNubeProducts, getTiendaNubeStore } from "@/lib/tiendanube";
import {
  TN_SESSION_COOKIE,
  decodeTnSession,
  fetchTnProducts,
  fetchTnStore,
} from "@/lib/tiendanube-oauth";
import type { TiendaNubeProduct, TiendaNubeStore } from "@/lib/types";

export const metadata = {
  title: "Elegí qué publicar — Curadario",
  description: elegirCopy.title,
};

export default async function MarcasElegirPage() {
  const jar = await cookies();
  const session = decodeTnSession(jar.get(TN_SESSION_COOKIE)?.value);

  if (session) {
    let live: { store: TiendaNubeStore; products: TiendaNubeProduct[] } | null =
      null;
    try {
      const [store, products] = await Promise.all([
        fetchTnStore(session),
        fetchTnProducts(session),
      ]);
      live = { store, products };
    } catch {
      // Fall through to the labeled mock so the brand is not stuck.
    }
    if (live) {
      return (
        <BrandPicker
          store={{ ...live.store, syncedCount: live.products.length }}
          products={live.products}
          source="live"
        />
      );
    }
  }

  return (
    <BrandPicker
      store={getTiendaNubeStore()}
      products={getTiendaNubeProducts()}
      source="mock"
    />
  );
}
