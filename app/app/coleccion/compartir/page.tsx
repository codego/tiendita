import { ShareSheet } from "@/components/ShareSheet";
import { shareCopy } from "@/lib/brand";
import { getSku } from "@/lib/catalog";
import { findingMetadata, homeMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ sku?: string }>;
}): Promise<Metadata> {
  const { sku: skuId } = await searchParams;
  const sku = getSku(skuId ?? "tapado-coppola") ?? getSku("tapado-coppola");
  if (!sku) return homeMetadata();
  return {
    ...findingMetadata(sku),
    title: "Compartir hallazgo — Con pinta",
    description: shareCopy.kit,
  };
}

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
