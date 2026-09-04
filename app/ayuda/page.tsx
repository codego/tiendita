import Link from "next/link";
import { PhoneFrame } from "@/components/PhoneFrame";
import { SiteLinks } from "@/components/SiteLinks";
import { SiteMenu } from "@/components/SiteMenu";
import { Wordmark } from "@/components/Wordmark";
import { ayudaCopy } from "@/lib/edges";
import { routes } from "@/lib/routes";

export const metadata = {
  title: "Ayuda — Con pinta",
  description: ayudaCopy.line,
};

export default function AyudaPage() {
  return (
    <PhoneFrame>
      <header className="flex items-center justify-between px-5 pt-6">
        <Link href={routes.landing} aria-label="Con pinta">
          <Wordmark tone="terracotta" />
        </Link>
        <SiteMenu />
      </header>
      <main className="flex flex-1 flex-col items-center justify-center px-6 pb-12 text-center">
        <h1 className="font-serif text-[34px] leading-tight text-ink">Ayuda</h1>
        <p className="mt-6 max-w-[28ch] font-sans text-[17px] leading-7 text-ink">
          Preguntas en el{" "}
          <Link
            href={routes.faq}
            className="text-terracotta underline underline-offset-2"
          >
            {ayudaCopy.faq}
          </Link>
          . Escribinos desde{" "}
          <Link
            href={routes.contacto}
            className="text-terracotta underline underline-offset-2"
          >
            {ayudaCopy.contacto}
          </Link>
          .
        </p>
      </main>
      <SiteLinks className="px-5 pb-8 text-center font-sans text-[13px] text-ink/45" />
    </PhoneFrame>
  );
}
