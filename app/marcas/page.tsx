import Link from "next/link";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Wordmark } from "@/components/Wordmark";
import { brandCopy } from "@/lib/brand";
import { routes } from "@/lib/routes";

export const metadata = {
  title: "Para marcas — Curadario",
  description: brandCopy.headline,
};

export default function MarcasPage() {
  return (
    <PhoneFrame>
      <header className="px-6 pt-7">
        <Link href={routes.landing} aria-label="Curadario">
          <Wordmark />
        </Link>
      </header>

      <main className="flex flex-1 flex-col px-6 pt-16">
        <p className="font-sans text-[11px] tracking-[0.22em] text-ink/55 uppercase">
          {brandCopy.label}
        </p>
        <h1 className="mt-4 font-serif text-[40px] leading-[1.02] text-ink">
          {brandCopy.headlineLead}
          <br />
          {brandCopy.headlineRest}
        </h1>
        <p className="mt-5 max-w-[28ch] font-sans text-[16px] leading-6 text-ink/70">
          {brandCopy.sub}
        </p>
        <p className="mt-4 font-serif text-[20px] italic text-ink">
          {brandCopy.tease}
        </p>

        <div className="mt-10 flex flex-col gap-3">
          <Link
            href={routes.marcasElegir}
            className="flex h-12 items-center justify-center rounded-full bg-ink font-sans text-[15px] font-medium text-paper"
          >
            {brandCopy.primary}
          </Link>
          <Link
            href={routes.marcasDashboard}
            className="flex h-12 items-center justify-center rounded-full border border-ink bg-transparent font-sans text-[15px] font-medium text-ink"
          >
            {brandCopy.secondary}
          </Link>
        </div>
      </main>

      <p className="px-6 pt-8 pb-[calc(1.5rem+env(safe-area-inset-bottom))] text-center font-sans text-[12px] text-ink/50">
        {brandCopy.accept}{" "}
        <Link
          href={routes.terminos}
          className="underline underline-offset-2 text-ink/70"
        >
          {brandCopy.terms}
        </Link>{" "}
        y{" "}
        <Link
          href={routes.privacidad}
          className="underline underline-offset-2 text-ink/70"
        >
          {brandCopy.privacy}
        </Link>
        {" · "}
        <Link
          href={routes.ayuda}
          className="underline underline-offset-2 text-ink/70"
        >
          Ayuda
        </Link>
        .
      </p>
    </PhoneFrame>
  );
}
