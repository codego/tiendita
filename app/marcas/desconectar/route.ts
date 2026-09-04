import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { routes } from "@/lib/routes";
import { disconnectMerchant } from "@/lib/tiendanube-oauth";

export async function POST(request: Request) {
  const origin = new URL(request.url).origin;
  const jar = await cookies();
  await disconnectMerchant(jar, (name) => jar.get(name)?.value);
  return NextResponse.redirect(new URL(routes.marcas, origin), 303);
}
