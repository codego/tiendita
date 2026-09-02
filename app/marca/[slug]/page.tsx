import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { BrandMark } from "@/components/BrandMark";
import { BrandStoreCta } from "@/components/BrandStoreCta";
import { ProductCard } from "@/components/ProductCard";
import { emptyMarca, marcaCountLine } from "@/lib/edges";
import { getBrandBySlug, getBrandSlugs, getSkusByBrandSlug } from "@/lib/marca";
import { routes } from "@/lib/routes";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getBrandSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/marca/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return { title: "Curadario" };
  const count = getSkusByBrandSlug(slug).length;
  return {
    title: `${brand.name} — Curadario`,
    description: marcaCountLine(count),
  };
}

export default async function MarcaPage({
  params,
}: PageProps<"/marca/[slug]">) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();

  const skus = getSkusByBrandSlug(slug);
  const storeSku = skus[0];

  return (
    <AppShell>
      <div className="px-5 pb-10 pt-2">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="font-serif text-[34px] leading-[1.05] text-terracotta">
              {brand.name}
            </h1>
            <p className="mt-2 font-sans text-[14px] text-ink/60">
              {marcaCountLine(skus.length)}
            </p>
            {storeSku ? <BrandStoreCta sku={storeSku} /> : null}
          </div>
          <BrandMark name={brand.name} />
        </div>
        {skus.length === 0 ? (
          <div className="mt-10">
            <p className="max-w-[20ch] font-serif text-[28px] leading-snug text-ink">
              {emptyMarca.title}
            </p>
            <p className="mt-2 font-sans text-[15px] text-ink/65">
              {emptyMarca.body}
            </p>
            <Link
              href={routes.landing}
              className="mt-8 inline-flex h-12 items-center justify-center rounded-full border border-ink/12 bg-cream px-8 font-sans text-[16px] text-terracotta"
            >
              {emptyMarca.cta}
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8">
            {skus.map((sku) => (
              <ProductCard key={sku.id} sku={sku} />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
