import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { routes } from "@/lib/routes";
import {
  TN_SESSION_COOKIE,
  TN_STATE_COOKIE,
  encodeTnSession,
  exchangeTnCode,
  isTnOAuthConfigured,
} from "@/lib/tiendanube-oauth";

function originFrom(request: Request): string {
  return new URL(request.url).origin;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const origin = originFrom(request);
  if (!isTnOAuthConfigured()) {
    return NextResponse.redirect(new URL(routes.marcasElegir, origin));
  }

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const jar = await cookies();
  const expected = jar.get(TN_STATE_COOKIE)?.value;
  jar.delete(TN_STATE_COOKIE);

  if (!code || !state || !expected || state !== expected) {
    return NextResponse.redirect(new URL(`${routes.marcas}?error=oauth`, origin));
  }

  try {
    const session = await exchangeTnCode(code);
    jar.set(TN_SESSION_COOKIE, encodeTnSession(session), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      secure: process.env.NODE_ENV === "production",
    });
    return NextResponse.redirect(new URL(routes.marcasElegir, origin));
  } catch {
    return NextResponse.redirect(new URL(`${routes.marcas}?error=oauth`, origin));
  }
}
