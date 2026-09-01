import Image from "next/image";
import Link from "next/link";
import {
  ChevronRightIcon,
  PlaneIcon,
  SeedlingIcon,
  TouchIcon,
} from "@/components/Icons";
import { PhoneFrame } from "@/components/PhoneFrame";
import { SiteLinks } from "@/components/SiteLinks";
import { SiteMenu } from "@/components/SiteMenu";
import { Wordmark } from "@/components/Wordmark";
import { queEsCopy, queEsSteps } from "@/lib/que-es";
import { routes } from "@/lib/routes";

const icons = {
  seedling: SeedlingIcon,
  touch: TouchIcon,
  plane: PlaneIcon,
} as const;

export function QueEsPage() {
  return (
    <PhoneFrame>
      <header className="flex items-center justify-between px-5 pt-6">
        <Link href={routes.landing} aria-label="Curadario">
          <Wordmark tone="terracotta" />
        </Link>
        <SiteMenu />
      </header>

      <main className="flex-1 px-5 pt-10">
        <div className="text-center">
          <h1 className="font-serif text-[40px] leading-[1.05]">
            <span className="text-ink">{queEsCopy.titleLead}</span>{" "}
            <span className="text-terracotta">{queEsCopy.titleName}</span>
          </h1>
          <p className="mt-5 font-sans text-[17px] leading-6 text-ink">
            {queEsCopy.lineBefore}
            <span className="font-semibold text-terracotta">
              {queEsCopy.lineAccent}
            </span>
            {queEsCopy.lineAfter}
          </p>
          <p className="mt-1 font-sans text-[17px] leading-6 text-ink">
            {queEsCopy.line2}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-3 divide-x divide-ink/10">
          {queEsSteps.map((step) => {
            const Icon = icons[step.icon];
            return (
              <div key={step.n} className="px-2 text-center first:pl-0 last:pr-0">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-terracotta text-terracotta">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-3 font-serif text-[13px] text-terracotta">
                  {step.n}
                </p>
                <h2 className="mt-1 font-serif text-[18px] leading-tight text-ink">
                  {step.title}
                </h2>
                <p className="mt-1 font-sans text-[11px] leading-4 text-ink">
                  {step.body}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col gap-3">
          <Link
            href={routes.landing}
            className="flex items-center justify-between bg-terracotta px-5 py-4 text-paper"
          >
            <span>
              <span className="block font-sans text-[10px] tracking-[0.16em]">
                {queEsCopy.shopperEyebrow}
              </span>
              <span className="mt-1 block font-serif text-[26px] leading-none">
                {queEsCopy.shopperCta}
              </span>
            </span>
            <ChevronRightIcon className="h-6 w-6" />
          </Link>
          <Link
            href={routes.marcas}
            className="flex items-center justify-between border border-ink/15 bg-paper px-5 py-4 text-terracotta"
          >
            <span>
              <span className="block font-sans text-[10px] tracking-[0.16em]">
                {queEsCopy.brandEyebrow}
              </span>
              <span className="mt-1 block max-w-[18ch] font-serif text-[22px] leading-[1.1]">
                {queEsCopy.brandCta}
              </span>
            </span>
            <ChevronRightIcon className="h-6 w-6 shrink-0" />
          </Link>
        </div>
      </main>

      <div className="relative mt-8 h-40 w-full overflow-hidden bg-cream">
        <Image
          src="/images/tapado-coppola.jpg"
          alt={queEsCopy.imageAlt}
          fill
          sizes="430px"
          className="object-cover"
        />
      </div>
      <SiteLinks className="px-5 py-6 text-center font-sans text-[13px] text-ink/45" />
    </PhoneFrame>
  );
}
