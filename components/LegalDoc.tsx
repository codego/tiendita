import Link from "next/link";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Wordmark } from "@/components/Wordmark";
import { routes } from "@/lib/routes";

export function LegalDoc({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <PhoneFrame>
      <header className="px-5 pt-6">
        <Link href={routes.landing} aria-label="Curadario">
          <Wordmark />
        </Link>
      </header>
      <article className="flex-1 px-5 pt-8 pb-12">
        <h1 className="font-serif text-[34px] leading-[1.05] text-ink">{title}</h1>
        <div className="mt-6 space-y-4 font-sans text-[15px] leading-6 text-ink/80">
          {children}
        </div>
        <p className="mt-10 font-sans text-[13px] text-ink/45">
          <Link href={routes.terminos} className="underline underline-offset-2">
            Términos
          </Link>
          {" · "}
          <Link href={routes.privacidad} className="underline underline-offset-2">
            Privacidad
          </Link>
          {" · "}
          <Link href={routes.marcas} className="underline underline-offset-2">
            Marcas
          </Link>
          {" · "}
          <Link href={routes.ayuda} className="underline underline-offset-2">
            Ayuda
          </Link>
        </p>
      </article>
    </PhoneFrame>
  );
}
