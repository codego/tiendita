import Image from "next/image";
import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { getTapaCollection, getTapaSkus } from "@/lib/catalog";
import { markos } from "@/lib/markos";
import { routes } from "@/lib/routes";

export const metadata = {
  title: "Curadario — Sastrería de agosto",
  description: markos.line2,
};

function LandingNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-ink/8 bg-surface/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href={routes.landing} aria-label="Curadario">
          <Wordmark />
        </Link>
        <nav className="flex items-center gap-7" aria-label="Sitio">
          <a
            href="#el-look"
            className="hidden font-sans text-[14px] text-ink md:inline"
          >
            Colecciones
          </a>
          <a
            href="#el-look"
            className="hidden font-sans text-[14px] text-ink md:inline"
          >
            Marcas
          </a>
          <a
            href="#vende"
            className="hidden font-sans text-[14px] text-ink md:inline"
          >
            Vendé
          </a>
          <Link
            href={routes.app}
            className="inline-flex h-10 items-center rounded-full bg-ink px-5 font-sans text-[14px] font-medium text-paper"
          >
            Ir al look
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default function LandingPage() {
  const collection = getTapaCollection();
  const pieces = getTapaSkus();

  return (
    <div className="min-h-dvh bg-surface text-ink">
      <LandingNav />

      <section className="relative min-h-[78vh] overflow-hidden bg-cream">
        <Image
          src={collection.coverImage}
          alt={markos.title}
          fill
          priority
          sizes="100vw"
          className="rounded-none object-cover object-[center_20%]"
        />
        <div className="absolute inset-0 bg-linear-to-r from-ink/75 via-ink/35 to-transparent" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-6xl items-end px-6 py-16 md:items-center">
          <div className="max-w-xl">
            <p className="font-mono text-[12px] tracking-[0.18em] text-terracotta uppercase">
              {markos.overline}
            </p>
            <h1 className="mt-3 font-serif text-[48px] leading-[0.95] text-paper md:text-[64px]">
              {markos.title}
            </h1>
            <p className="mt-5 font-serif text-[22px] italic text-paper">
              {markos.line1}
            </p>
            <p className="mt-4 max-w-[36ch] font-sans text-[16px] leading-6 text-paper/90">
              {markos.line2}
            </p>
            <Link
              href={routes.coleccion}
              className="mt-8 inline-flex h-12 items-center rounded-full bg-ink px-6 font-sans text-[15px] font-medium text-paper"
            >
              {markos.cta} →
            </Link>
          </div>
        </div>
      </section>

      <section id="el-look" className="mx-auto max-w-6xl px-6 py-20">
        <p className="font-mono text-[11px] tracking-[0.18em] text-terracotta uppercase">
          Colección · {collection.number}
        </p>
        <h2 className="mt-2 font-serif text-[40px] leading-none text-ink">
          {markos.elLook}
        </h2>
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {pieces.map((sku) => (
            <li key={sku.id}>
              <Link href={routes.pieza(sku.id)} className="block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-none bg-cream">
                  <Image
                    src={sku.image}
                    alt={`${sku.brand} — ${sku.name}`}
                    fill
                    sizes="220px"
                    className="object-cover"
                  />
                </div>
                <p className="mt-2.5 font-mono text-[10px] font-medium tracking-[0.14em] text-terracotta uppercase">
                  {sku.brand}
                </p>
                <p className="mt-0.5 font-serif text-[18px] leading-tight text-ink">
                  {sku.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="como-funciona"
        className="border-y border-ink/8 bg-cream px-6 py-20"
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-[40px] leading-none text-ink">
            {markos.comoFunciona}
          </h2>
          <ol className="mt-10 space-y-6">
            {markos.steps.map((step, index) => (
              <li key={step} className="flex gap-5">
                <span className="font-mono text-[13px] text-terracotta">
                  {index + 1}.
                </span>
                <p className="font-serif text-[24px] leading-snug text-ink md:text-[28px]">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="vende" className="px-6 py-16">
        <p className="text-center font-serif text-[22px] italic text-ink">
          {markos.noVende}
        </p>
      </section>
    </div>
  );
}
