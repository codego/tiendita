import Image from "next/image";
import Link from "next/link";
import { BrandMenu } from "@/components/BrandMenu";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Wordmark } from "@/components/Wordmark";
import { brandCopy, dashboardCopy, dashboardMetrics, dashboardRanking } from "@/lib/brand";
import { getSku } from "@/lib/catalog";
import { formatGrouped } from "@/lib/money";
import { routes } from "@/lib/routes";

export const metadata = {
  title: "Esta semana — Curadario",
  description: dashboardCopy.footer,
};

export default function MarcasDashboardPage() {
  const ranking = dashboardRanking.map((row) => {
    const sku = getSku(row.skuId);
    if (!sku) {
      throw new Error(`Dashboard ranking is missing seed SKU ${row.skuId}`);
    }
    return { ...row, sku };
  });

  const metrics = [
    { value: formatGrouped(dashboardMetrics.visits), label: dashboardCopy.visitsLabel },
    {
      value: formatGrouped(dashboardMetrics.storeClicks),
      label: dashboardCopy.clicksLabel,
    },
    {
      value: formatGrouped(dashboardMetrics.published),
      label: dashboardCopy.publishedLabel,
    },
  ];

  return (
    <PhoneFrame>
      <header className="flex items-center justify-between px-5 pt-6">
        <Link href={routes.marcas} aria-label="Curadario">
          <Wordmark />
        </Link>
        <BrandMenu />
      </header>

      <main className="flex-1 px-5 pt-8">
        <p className="font-mono text-[11px] tracking-[0.18em] text-terracotta uppercase">
          {brandCopy.label}
        </p>
        <h1 className="mt-3 font-serif text-[40px] leading-[1.02] text-ink">
          {dashboardCopy.title}
        </h1>

        <dl className="mt-8 grid grid-cols-3 gap-3">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <dt className="sr-only">{metric.label}</dt>
              <dd className="font-serif text-[28px] leading-none text-ink">
                {metric.value}
              </dd>
              <p className="mt-2 font-sans text-[12px] leading-4 text-ink/55">
                {metric.label}
              </p>
            </div>
          ))}
        </dl>

        <hr className="mt-8 border-ink/10" />

        <h2 className="mt-6 font-serif text-[22px] leading-snug text-ink">
          {dashboardCopy.ranking}
        </h2>
        <ol className="mt-4">
          {ranking.map((row) => (
            <li
              key={row.sku.id}
              className="flex items-center gap-3 border-b border-ink/8 py-3 last:border-b-0"
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-cream">
                <Image
                  src={row.sku.image}
                  alt={row.sku.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-sans text-[11px] text-ink/45">{row.sku.brand}</p>
                <p className="truncate font-serif text-[16px] leading-tight text-ink">
                  {row.sku.name}
                </p>
                <p className="mt-0.5 font-sans text-[12px] italic text-ink/55">
                  {brandCopy.tease}
                </p>
              </div>
              <p className="shrink-0 font-sans text-[13px] text-ink">
                {`${row.clicks} clics`}
              </p>
            </li>
          ))}
        </ol>
      </main>

      <div className="sticky bottom-0 bg-surface px-5 pt-3 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <div className="flex gap-2.5">
          <Link
            href={routes.marcasElegir}
            className="flex h-12 flex-1 items-center justify-center rounded-full border border-ink bg-transparent font-sans text-[14px] font-medium text-ink"
          >
            {dashboardCopy.edit}
          </Link>
          <Link
            href={routes.coleccion}
            className="flex h-12 flex-1 items-center justify-center rounded-full bg-ink font-sans text-[14px] font-medium text-paper"
          >
            {dashboardCopy.vitrina}
          </Link>
        </div>
        <p className="mt-3 text-center font-sans text-[12px] text-ink/45">
          {dashboardCopy.footer}
        </p>
      </div>
    </PhoneFrame>
  );
}
