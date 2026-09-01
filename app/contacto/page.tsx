import { ContactForm } from "@/components/ContactForm";
import { PhoneFrame } from "@/components/PhoneFrame";
import { SiteLinks } from "@/components/SiteLinks";
import { SiteMenu } from "@/components/SiteMenu";
import { Wordmark } from "@/components/Wordmark";
import { contactoCopy } from "@/lib/contacto";
import { routes } from "@/lib/routes";
import Link from "next/link";

export const metadata = {
  title: "Contacto — Curadario",
  description: contactoCopy.sub,
};

export default function ContactoPage() {
  return (
    <PhoneFrame>
      <header className="flex items-center justify-between px-5 pt-6">
        <Link href={routes.landing} aria-label="Curadario">
          <Wordmark />
        </Link>
        <SiteMenu />
      </header>
      <main className="flex-1 px-5 pt-8 pb-8">
        <h1 className="font-serif text-[34px] leading-tight text-ink">
          {contactoCopy.title}
        </h1>
        <p className="mt-2 font-sans text-[15px] text-ink/65">{contactoCopy.sub}</p>
        <div className="mt-8">
          <ContactForm />
        </div>
      </main>
      <SiteLinks className="px-5 pb-8 text-center font-sans text-[13px] text-ink/45" />
    </PhoneFrame>
  );
}
