import { NextResponse } from "next/server";
import { isVapidConfigured } from "@/lib/env";

export async function POST() {
  if (!isVapidConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        reason: "vapid",
        need: ["NEXT_PUBLIC_VAPID_PUBLIC_KEY", "VAPID_PRIVATE_KEY"],
      },
      { status: 501 },
    );
  }

  return NextResponse.json(
    {
      ok: false,
      reason: "subscription-store",
    },
    { status: 501 },
  );
}
