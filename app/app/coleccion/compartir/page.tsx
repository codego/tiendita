import { ShareSheet } from "@/components/ShareSheet";
import { shareCopy } from "@/lib/brand";
import { getSku } from "@/lib/catalog";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Compartir hallazgo — Curadario",
  description: shareCopy.kit,
};

export default async function CompartirHallazgoPage({
  searchParams,
}: {
  searchParams: Promise<{ sku?: string }>;
}) {
  const { sku: skuId } = await searchParams;
  const sku = getSku(skuId ?? "tapado-coppola") ?? getSku("tapado-coppola");
  if (!sku) notFound();

  return <ShareSheet sku={sku} />;
}
