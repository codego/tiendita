import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BrandPicker } from "@/components/BrandPicker";
import { elegirCopy } from "@/lib/brand";
import { routes } from "@/lib/routes";
import { getTiendaNubeProducts, getTiendaNubeStore } from "@/lib/tiendanube";
import {
  fetchTnProducts,
  fetchTnStore,
  readMerchantGate,
} from "@/lib/tiendanube-oauth";
import type { TiendaNubeProduct, TiendaNubeStore } from "@/lib/types";

export const metadata = {
  title: "Qué publicás — Curadario",
  description: elegirCopy.sub,
};

async function loadLiveCatalog(session: {
  access_token: string;
  user_id: string;
}): Promise<{ store: TiendaNubeStore; products: TiendaNubeProduct[] } | null> {
  try {
    const [store, products] = await Promise.all([
      fetchTnStore(session),
      fetchTnProducts(session),
    ]);
    return { store: { ...store, syncedCount: products.length }, products };
  } catch {
    return null;
  }
}

export default async function MarcasElegirPage() {
  const jar = await cookies();
  const gate = readMerchantGate((name) => jar.get(name)?.value);
  if (gate.source === "none") {
    redirect(routes.marcas);
  }

  if (gate.source === "live") {
    const live = await loadLiveCatalog(gate.session);
    if (live) {
      return (
        <BrandPicker
          store={live.store}
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
