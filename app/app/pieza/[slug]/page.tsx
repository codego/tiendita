import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { BrandNameLink } from "@/components/BrandNameLink";
import { HeartButton } from "@/components/HeartButton";
import { ProductPhoto } from "@/components/ProductPhoto";
import { StoreCta } from "@/components/StoreCta";
import { TrackVisit } from "@/components/TrackVisit";
import { shareCopy } from "@/lib/brand";
import { getSku, getSkus } from "@/lib/catalog";
import { formatARS } from "@/lib/money";
import { routes } from "@/lib/routes";
import { findingMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getSkus().map((sku) => ({ slug: sku.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/app/pieza/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const sku = getSku(slug);
  if (!sku) return { title: "Curadario" };
  return findingMetadata(sku);
}

export default async function FichaPage({
  params,
}: PageProps<"/app/pieza/[slug]">) {
  const { slug } = await params;
  const sku = getSku(slug);
  if (!sku) notFound();

  const specs = [
    { label: "Talle", value: sku.talle },
    { label: "Tela", value: sku.tela },
    { label: "Corte", value: sku.corte },
  ];

  return (
    <AppShell header="ficha" headerSkuId={sku.id} nav={false}>
      <TrackVisit skuId={sku.id} brand={sku.brand} />
      <div className="relative aspect-[3/4] bg-cream">
        <ProductPhoto
          src={sku.image}
          alt={`${sku.brand} — ${sku.name}`}
          priority
          sizes="430px"
          className="rounded-none object-cover"
        />
      </div>
      <div className="flex-1 px-5 pt-5 pb-6">
        <BrandNameLink
          brand={sku.brand}
          className="font-mono text-[11px] tracking-[0.16em] text-terracotta uppercase"
        />
        <h1 className="mt-2 font-serif text-[34px] leading-[1.05] text-ink">
          {sku.name}
        </h1>
        <p className="mt-2 font-serif text-[22px] font-bold text-ink">
          {formatARS(sku.price_ars)}
        </p>
        <dl className="mt-6 border-y border-ink/10">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-3 last:border-b-0"
            >
              <dt className="font-mono text-[11px] tracking-[0.14em] text-terracotta uppercase">
                {spec.label}
              </dt>
              <dd className="font-sans text-[15px] text-ink">{spec.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 font-sans text-[15px] leading-6 text-ink">
          {sku.description}
        </p>
        <p className="mt-4 font-sans text-[14px] leading-6 text-ink/60">
          {sku.disclaimer}
        </p>
        <Link
          href={routes.compartirSku(sku.id)}
          className="mt-4 inline-flex font-sans text-[14px] text-ink underline underline-offset-2"
        >
          {shareCopy.cta}
        </Link>
      </div>
      <div className="mt-auto flex items-center gap-3 bg-surface px-5 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <StoreCta sku={sku} />
        <HeartButton skuId={sku.id} variant="circle" />
      </div>
    </AppShell>
  );
}
