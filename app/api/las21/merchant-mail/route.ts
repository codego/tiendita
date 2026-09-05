import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isForceMerchantMailParam } from "@/lib/las21";
import { deliverLas21MerchantMail } from "@/lib/send-contact";
import { getTiendaNubeStore } from "@/lib/tiendanube";
import {
  fetchTnStore,
  fetchTnStoreEmail,
  readMerchantGate,
} from "@/lib/tiendanube-oauth";

async function run(request: Request) {
  let force = false;
  try {
    const body = (await request.json()) as {
      force?: unknown;
      mail?: unknown;
    };
    force =
      body.force === true ||
      isForceMerchantMailParam(typeof body.mail === "string" ? body.mail : undefined);
  } catch {
    // Empty body — shopper ping or GET.
  }

  const url = new URL(request.url);
  if (isForceMerchantMailParam(url.searchParams.get("mail") ?? undefined)) {
    force = true;
  }

  const jar = await cookies();
  const gate = readMerchantGate((name) => jar.get(name)?.value);

  let storeName = "";
  let storeEmail = "";
  if (gate.source === "live") {
    try {
      const store = await fetchTnStore(gate.session);
      storeName = store.name;
    } catch {
      storeName = "";
    }
    storeEmail = await fetchTnStoreEmail(gate.session);
  } else if (gate.source === "mock") {
    storeName = getTiendaNubeStore().name;
  }

  const delivery = storeName
    ? await deliverLas21MerchantMail({ storeName, storeEmail, force })
    : await deliverLas21MerchantMail({ force });

  return NextResponse.json({
    ok: true,
    sent: delivery.sent,
    reason: delivery.reason,
  });
}

export async function POST(request: Request) {
  return run(request);
}

export async function GET(request: Request) {
  return run(request);
}
