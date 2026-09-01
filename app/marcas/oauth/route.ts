import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { routes } from "@/lib/routes";
import {
  TN_STATE_COOKIE,
  isTnOAuthConfigured,
  tnAuthorizeUrl,
} from "@/lib/tiendanube-oauth";

export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  if (!isTnOAuthConfigured()) {
    return NextResponse.redirect(new URL(routes.marcasElegir, origin));
  }
  const state = crypto.randomUUID();
  const jar = await cookies();
  jar.set(TN_STATE_COOKIE, state, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 600,
    secure: process.env.NODE_ENV === "production",
  });
  return NextResponse.redirect(tnAuthorizeUrl(state));
}
