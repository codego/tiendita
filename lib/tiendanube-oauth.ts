import {
  getContactTo,
  getTnClientId,
  getTnClientSecret,
  getTnRedirectUri,
  isTnOAuthConfigured,
} from "@/lib/env";
import { isForbiddenInbox } from "@/lib/send-contact";
import type { TiendaNubeProduct, TiendaNubeStore } from "@/lib/types";

export const TN_SESSION_COOKIE = "curadario_tn";
export const TN_STATE_COOKIE = "curadario_tn_state";

export type TnSession = {
  access_token: string;
  user_id: string;
};

const TOKEN_URL = "https://www.tiendanube.com/apps/authorize/token";
const API_ROOT = "https://api.tiendanube.com/v1";

export { isTnOAuthConfigured };

export function tnAuthorizeUrl(state: string): string {
  const id = getTnClientId();
  const url = new URL(`https://www.tiendanube.com/apps/${id}/authorize`);
  url.searchParams.set("state", state);
  const redirect = getTnRedirectUri();
  if (redirect) url.searchParams.set("redirect_uri", redirect);
  return url.toString();
}

function tnUserAgent(): string {
  const to = getContactTo();
  if (to && !isForbiddenInbox(to)) {
    return `Curadario (${to})`;
  }
  return "Curadario (https://github.com/codego/tiendita)";
}

export function encodeTnSession(session: TnSession): string {
  return Buffer.from(JSON.stringify(session), "utf8").toString("base64url");
}

export function decodeTnSession(raw: string | undefined): TnSession | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(
      Buffer.from(raw, "base64url").toString("utf8"),
    ) as Partial<TnSession>;
    if (!value.access_token || !value.user_id) return null;
    return { access_token: String(value.access_token), user_id: String(value.user_id) };
  } catch {
    return null;
  }
}

export async function exchangeTnCode(code: string): Promise<TnSession> {
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: getTnClientId(),
      client_secret: getTnClientSecret(),
      grant_type: "authorization_code",
      code,
    }),
  });
  if (!response.ok) {
    throw new Error(`TiendaNube token exchange failed (${response.status})`);
  }
  const data = (await response.json()) as {
    access_token?: string;
    user_id?: string | number;
  };
  if (!data.access_token || data.user_id == null) {
    throw new Error("TiendaNube token response is incomplete");
  }
  return {
    access_token: data.access_token,
    user_id: String(data.user_id),
  };
}

async function tnGet<T>(session: TnSession, path: string): Promise<T> {
  const response = await fetch(`${API_ROOT}/${session.user_id}${path}`, {
    headers: {
      Authentication: `bearer ${session.access_token}`,
      Authorization: `bearer ${session.access_token}`,
      "User-Agent": tnUserAgent(),
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`TiendaNube API ${path} failed (${response.status})`);
  }
  return (await response.json()) as T;
}

type TnName = string | Record<string, string>;

function pickName(value: TnName | undefined, fallback: string): string {
  if (!value) return fallback;
  if (typeof value === "string") return value;
  return (
    value.es_AR ||
    value.es ||
    value.pt ||
    value.en ||
    Object.values(value)[0] ||
    fallback
  );
}

type TnApiProduct = {
  id: number | string;
  published?: boolean;
  name?: TnName;
  images?: { src?: string }[];
  variants?: { price?: string }[];
};

export async function fetchTnStoreEmail(session: TnSession): Promise<string> {
  try {
    const store = await tnGet<{ email?: string }>(session, "/store");
    return typeof store.email === "string" ? store.email.trim() : "";
  } catch {
    return "";
  }
}

export async function fetchTnStore(session: TnSession): Promise<TiendaNubeStore> {
  try {
    const store = await tnGet<{ name?: TnName }>(session, "/store");
    const name = pickName(store.name, "Tu TiendaNube");
    return {
      name,
      platform: "TiendaNube",
      status: "Sincronizado",
      syncedCount: 0,
    };
  } catch {
    return {
      name: "Tu TiendaNube",
      platform: "TiendaNube",
      status: "Sincronizado",
      syncedCount: 0,
    };
  }
}

export async function fetchTnProducts(session: TnSession): Promise<TiendaNubeProduct[]> {
  const products: TiendaNubeProduct[] = [];
  for (const page of [1, 2]) {
    const batch = await tnGet<TnApiProduct[]>(
      session,
      `/products?page=${page}&per_page=50`,
    );
    if (!Array.isArray(batch) || batch.length === 0) break;
    for (const product of batch) {
      if (product.published === false) continue;
      const price = Number(product.variants?.[0]?.price ?? 0);
      products.push({
        id: `tn-${product.id}`,
        name: pickName(product.name, `Pieza ${product.id}`),
        price_ars: Number.isFinite(price) ? Math.round(price) : 0,
        image: product.images?.[0]?.src || "/images/tapado-coppola.jpg",
        kind: "apparel",
        selected: false,
      });
    }
    if (batch.length < 50) break;
  }
  return products;
}
