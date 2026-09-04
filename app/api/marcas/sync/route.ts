import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { mockCatalog, syncLiveCatalog } from "@/lib/merchant-sync";
import { readMerchantGate } from "@/lib/tiendanube-oauth";

export async function POST(request: Request) {
  const url = new URL(request.url);
  if (url.searchParams.get("fail")) {
    return NextResponse.json({ ok: false, error: "sync_fail" }, { status: 503 });
  }

  const jar = await cookies();
  const gate = readMerchantGate((name) => jar.get(name)?.value);
  if (gate.source === "none") {
    return NextResponse.json({ ok: false, error: "no_session" }, { status: 401 });
  }

  if (gate.source === "live") {
    try {
      const catalog = await syncLiveCatalog(gate.session);
      return NextResponse.json({ ok: true, source: "live", ...catalog });
    } catch {
      return NextResponse.json({ ok: false, error: "sync_fail" }, { status: 502 });
    }
  }

  return NextResponse.json({ ok: true, source: "mock", ...mockCatalog() });
}
