import { HelpFaq } from "@/components/HelpFaq";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Wordmark } from "@/components/Wordmark";
import Link from "next/link";
import { AYUDA_CONTACT, AYUDA_FAQ } from "@/app/ayuda/copy";
import { routes } from "@/lib/routes";

export const metadata = {
  title: "Ayuda — Curadario",
  description: "Vitrina de marcas de TiendaNube. Tocás, vas a su tienda.",
};

export default function AyudaPage() {
  return (
    <PhoneFrame>
      <header className="px-5 pt-6 text-center">
        <Link href={routes.landing} aria-label="Curadario">
          <Wordmark />
        </Link>
        <h1 className="mt-8 font-serif text-[34px] leading-tight text-ink">
          Ayuda
        </h1>
      </header>
      <div className="flex-1 pt-6">
        <HelpFaq
          items={AYUDA_FAQ}
          contactPrompt={AYUDA_CONTACT.prompt}
          contactEmail={AYUDA_CONTACT.email}
        />
      </div>
    </PhoneFrame>
  );
}
