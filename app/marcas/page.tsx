import Link from "next/link";
import { cookies } from "next/headers";
import { BrandDashboard } from "@/components/BrandDashboard";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Wordmark } from "@/components/Wordmark";
import { brandCopy, dashboardCopy } from "@/lib/brand";
import { isTnOAuthConfigured } from "@/lib/env";
import { routes } from "@/lib/routes";
import {
  isSyncFailQuery,
  isSyncOkQuery,
  mockCatalog,
  syncLiveCatalog,
} from "@/lib/merchant-sync";
import { readMerchantGate } from "@/lib/tiendanube-oauth";

export const metadata = {
  title: "Para marcas — Con pinta",
  description: brandCopy.headline,
};

function MarcasLogin({
  live,
  error,
}: {
  live: boolean;
  error?: string;
}) {
  return (
    <PhoneFrame>
      <header className="px-6 pt-7">
        <Link href={routes.landing} aria-label="Con pinta">
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
        <p className="mt-6 font-serif text-[22px] leading-snug text-ink">
          {dashboardCopy.connectEmpty}
        </p>
        {live ? null : (
          <p className="mt-4 rounded-full bg-cream px-3 py-2 font-sans text-[12px] text-ink/65">
            {brandCopy.mockLabel}
          </p>
        )}

        {error === "oauth" ? (
          <p className="mt-4 font-sans text-[13px] text-terracotta">
            No pudimos conectar TiendaNube. Probá de nuevo.
          </p>
        ) : null}

        <div className="mt-10 flex flex-col gap-3">
          <Link
            href={routes.marcasEntrar}
            className="flex h-12 items-center justify-center rounded-full bg-ink font-sans text-[15px] font-medium text-paper"
          >
            {brandCopy.primary}
          </Link>
          <Link
            href={routes.marcasEntrar}
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
          href={routes.queEs}
          className="underline underline-offset-2 text-ink/70"
        >
          Qué es
        </Link>
        {" · "}
        <Link
          href={routes.faq}
          className="underline underline-offset-2 text-ink/70"
        >
          FAQ
        </Link>
        {" · "}
        <Link
          href={routes.contacto}
          className="underline underline-offset-2 text-ink/70"
        >
          Contacto
        </Link>
        .
      </p>
    </PhoneFrame>
  );
}

export default async function MarcasPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; sync?: string }>;
}) {
  const live = isTnOAuthConfigured();
  const { error, sync } = await searchParams;
  const jar = await cookies();
  const gate = readMerchantGate((name) => jar.get(name)?.value);
  const fail = isSyncFailQuery(sync);
  const ok = isSyncOkQuery(sync);

  if (gate.source === "none") {
    return <MarcasLogin live={live} error={error} />;
  }

  if (gate.source === "live") {
    if (fail) {
      return <BrandDashboard source="live" syncFailed />;
    }
    let loaded: Awaited<ReturnType<typeof syncLiveCatalog>> | null = null;
    try {
      loaded = await syncLiveCatalog(gate.session);
    } catch {
      loaded = null;
    }
    if (!loaded) {
      return <BrandDashboard source="live" syncFailed />;
    }
    return (
      <BrandDashboard
        store={loaded.store}
        products={loaded.products}
        source="live"
        syncOk={ok}
      />
    );
  }

  const mock = mockCatalog();
  return (
    <BrandDashboard
      store={mock.store}
      products={mock.products}
      source="mock"
      syncFailed={fail}
      syncOk={ok && !fail}
    />
  );
}
