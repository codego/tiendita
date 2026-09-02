import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { routes } from "@/lib/routes";
import { TN_MOCK_COOKIE, TN_SESSION_COOKIE } from "@/lib/tiendanube-oauth";

export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const jar = await cookies();
  jar.set(TN_SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  jar.set(TN_MOCK_COOKIE, "", { path: "/", maxAge: 0 });
  return NextResponse.redirect(new URL(routes.marcas, origin));
}
