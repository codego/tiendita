import { FAQ_CONTACT, FAQ_ITEMS } from "@/app/faq/copy";
import { HelpFaq } from "@/components/HelpFaq";
import { PhoneFrame } from "@/components/PhoneFrame";
import { SiteLinks } from "@/components/SiteLinks";
import { SiteMenu } from "@/components/SiteMenu";
import { Wordmark } from "@/components/Wordmark";
import Link from "next/link";
import { routes } from "@/lib/routes";

export const metadata = {
  title: "FAQ — Curadario",
  description: "Vitrina de marcas de TiendaNube. Tocás, vas a su tienda.",
};

export default function FaqPage() {
  return (
    <PhoneFrame>
      <header className="flex items-center justify-between px-5 pt-6">
        <Link href={routes.landing} aria-label="Curadario">
          <Wordmark tone="terracotta" />
        </Link>
        <SiteMenu />
      </header>
      <h1 className="px-5 pt-8 text-center font-serif text-[34px] leading-tight text-ink">
        FAQ
      </h1>
      <div className="flex-1 pt-6">
        <HelpFaq
          items={FAQ_ITEMS}
          contactPrompt={FAQ_CONTACT.prompt}
          contactEmail={FAQ_CONTACT.email}
        />
      </div>
      <SiteLinks className="px-5 pb-8 text-center font-sans text-[13px] text-ink/45" />
    </PhoneFrame>
  );
}
