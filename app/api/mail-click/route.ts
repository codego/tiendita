import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { deliverMailClick } from "@/lib/send-contact";
import {
  TN_SESSION_COOKIE,
  decodeTnSession,
  fetchTnStoreEmail,
} from "@/lib/tiendanube-oauth";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: true, sent: false });
  }

  const raw =
    body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const skuId = String(raw.sku_id ?? "").trim();
  if (!skuId) {
    return NextResponse.json({ ok: true, sent: false });
  }

  const jar = await cookies();
  const session = decodeTnSession(jar.get(TN_SESSION_COOKIE)?.value);
  let storeEmail = "";
  if (session) {
    storeEmail = await fetchTnStoreEmail(session);
  }

  const delivery = await deliverMailClick(storeEmail);
  return NextResponse.json({ ok: true, sent: delivery.sent });
}
