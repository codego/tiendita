import Image from "next/image";
import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { getTapaSkus } from "@/lib/catalog";
import { markos } from "@/lib/markos";
import { routes } from "@/lib/routes";

export const metadata = {
  title: "Curadario — Sastrería de agosto",
  description: markos.line2,
};

export default function LandingPage() {
  const pieces = getTapaSkus();

  return (
    <div className="min-h-dvh bg-surface text-ink">
      <header className="sticky top-0 z-30 bg-surface">
        <div className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-6">
          <Link href={routes.landing} aria-label="Curadario">
            <Wordmark />
          </Link>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Sitio">
            <a href="#el-look" className="font-sans text-[14px] text-ink">
              Colecciones
            </a>
            <Link href={routes.marcas} className="font-sans text-[14px] text-ink">
              Marcas
            </Link>
            <Link href={routes.marcas} className="font-sans text-[14px] text-ink">
              Vendé
            </Link>
          </nav>
          <div className="flex justify-end">
            <Link
              href={routes.app}
              className="inline-flex h-10 items-center rounded-full bg-ink px-5 font-sans text-[14px] font-medium text-paper"
            >
              Ir al look
            </Link>
          </div>
        </div>
      </header>

      <section className="relative min-h-[78vh] overflow-hidden bg-cream">
        <Image
          src="/images/tapa-sastreria.jpg"
          alt={markos.title}
          fill
          priority
          sizes="100vw"
          className="rounded-none object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-ink/80 via-ink/40 to-transparent" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-6xl items-center px-6 py-16">
          <div className="max-w-xl">
            <p className="font-mono text-[12px] tracking-[0.18em] text-terracotta uppercase">
              {markos.overline}
            </p>
            <h1 className="mt-3 font-serif text-[48px] leading-[0.95] text-paper md:text-[64px]">
              {markos.title}
            </h1>
            <p className="mt-5 font-serif text-[22px] text-paper">
              {markos.line1}
            </p>
            <p className="mt-4 max-w-[38ch] font-sans text-[16px] leading-6 text-paper/90">
              {markos.line2}
            </p>
            <Link
              href={routes.coleccion}
              className="mt-8 inline-flex h-12 items-center rounded-full bg-ink px-6 font-sans text-[15px] font-medium text-paper"
            >
              {markos.cta}
            </Link>
          </div>
        </div>
      </section>

      <section id="el-look" className="bg-cream px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-serif text-[28px] tracking-wide text-ink uppercase">
            {markos.elLook}
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-5">
            {pieces.map((sku) => (
              <li key={sku.id}>
                <Link href={routes.pieza(sku.id)} className="block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-none bg-surface">
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
                  <p className="mt-0.5 font-sans text-[15px] text-ink">
                    {sku.name}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="como-funciona" className="bg-cream px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="md:flex md:items-end md:justify-between">
            <h2 className="font-serif text-[28px] tracking-wide text-ink uppercase">
              {markos.comoFunciona}
            </h2>
            <p
              id="vende"
              className="mt-2 font-sans text-[15px] text-terracotta md:mt-0"
            >
              {markos.noVende}
            </p>
          </div>
          <ol className="mt-12 space-y-5">
            {markos.steps.map((step, index) => (
              <li key={step} className="font-serif text-[24px] leading-snug text-ink md:text-[28px]">
                {index + 1}. {step}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <footer className="border-t border-ink/8 bg-surface">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-6">
          <Wordmark size="sm" />
          <nav className="flex items-center gap-4 font-sans text-[13px] text-ink/55">
            <Link href={routes.terminos} className="underline underline-offset-2">
              Términos
            </Link>
            <Link href={routes.privacidad} className="underline underline-offset-2">
              Privacidad
            </Link>
            <p className="font-mono text-[12px] text-ink/50">© 2026</p>
          </nav>
        </div>
      </footer>
    </div>
  );
}
