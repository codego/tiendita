import Link from "next/link";
import { AjustesPingToggle } from "@/components/AjustesPingToggle";
import { Las21PushScheduler } from "@/components/Las21PushScheduler";
import { PhoneFrame } from "@/components/PhoneFrame";
import { SiteMenu } from "@/components/SiteMenu";
import { Wordmark } from "@/components/Wordmark";
import { ajustesCopy } from "@/lib/edges";
import { routes } from "@/lib/routes";

export const metadata = {
  title: "Ajustes — Con pinta",
  description: ajustesCopy.toggle,
};

export default function AjustesPage() {
  return (
    <PhoneFrame className="bg-cream">
      <header className="flex items-center justify-between px-5 pt-6">
        <Link href={routes.landing} aria-label="Con pinta">
          <Wordmark tone="terracotta" />
        </Link>
        <SiteMenu />
      </header>
      <main className="flex flex-1 flex-col px-6 pt-10 pb-12">
        <h1 className="font-serif text-[34px] leading-tight text-ink">
          {ajustesCopy.title}
        </h1>
        <div className="mt-8">
          <AjustesPingToggle />
        </div>
        <nav aria-label="Ajustes" className="mt-10 flex flex-col gap-4">
          <Link
            href={routes.ayuda}
            className="font-sans text-[16px] text-ink underline underline-offset-2"
          >
            {ajustesCopy.ayuda}
          </Link>
          <Link
            href={routes.privacidad}
            className="font-sans text-[16px] text-ink underline underline-offset-2"
          >
            {ajustesCopy.privacidad}
          </Link>
        </nav>
      </main>
      <Las21PushScheduler />
    </PhoneFrame>
  );
}
