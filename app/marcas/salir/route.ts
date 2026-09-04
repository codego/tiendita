import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { routes } from "@/lib/routes";
import { expireMerchantCookies } from "@/lib/tiendanube-oauth";

export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const jar = await cookies();
  expireMerchantCookies(jar);
  return NextResponse.redirect(new URL(routes.marcas, origin));
}
