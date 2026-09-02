import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { routes } from "@/lib/routes";
import {
  TN_MOCK_COOKIE,
  isTnOAuthConfigured,
} from "@/lib/tiendanube-oauth";

export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  if (isTnOAuthConfigured()) {
    return NextResponse.redirect(new URL(routes.marcasOauth, origin));
  }
  const jar = await cookies();
  jar.set(TN_MOCK_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    secure: process.env.NODE_ENV === "production",
  });
  return NextResponse.redirect(new URL(routes.marcas, origin));
}
