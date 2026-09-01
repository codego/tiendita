import Link from "next/link";
import { SchedulePiece } from "@/components/SchedulePiece";
import { Wordmark } from "@/components/Wordmark";
import { ANOCHE_LABEL, getAnocheForwarded } from "@/lib/las21";
import { routes } from "@/lib/routes";

export const metadata = {
  title: "Lo más reenviado anoche — Curadario",
  description: ANOCHE_LABEL,
};

export default function AnochePage() {
  const pieces = getAnocheForwarded();

  return (
    <div className="min-h-dvh bg-cream">
      <div className="relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-surface shadow-[0_0_0_1px_rgba(22,21,19,0.06)]">
        <header className="px-6 pt-7">
          <Link href={routes.landing} aria-label="Curadario">
            <Wordmark />
          </Link>
        </header>
        <main className="flex-1 px-6 pt-10 pb-12">
          <p className="font-sans text-[12px] tracking-[0.16em] text-ink/50 uppercase">
            Anoche
          </p>
          <h1 className="mt-2 font-serif text-[34px] leading-[1.05] text-ink">
            {ANOCHE_LABEL}
          </h1>
          <p className="mt-3 font-sans text-[15px] text-ink/65">
            Las piezas que más se reenviaron. No es un catálogo.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {pieces.map((sku) => (
              <SchedulePiece key={sku.id} sku={sku} />
            ))}
          </div>
          <p className="mt-12 text-center font-sans text-[13px] text-ink/50">
            <Link href={routes.landing} className="underline underline-offset-2">
              Volver a Las 21
            </Link>
          </p>
        </main>
      </div>
    </div>
  );
}
