import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

function walk(dir, suffix) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(path, suffix));
    else if (entry.name.endsWith(suffix)) out.push(path);
  }
  return out;
}

const edges = read("lib/edges.ts");
const saved = read("components/SavedGrid.tsx");
const looks = read("components/LooksIndex.tsx");
const stories = read("components/RecienStories.tsx");
const emptyState = read("components/EmptyState.tsx");
const loadError = read("components/LoadError.tsx");
const offline = read("components/OfflineGate.tsx");
const offlineBanner = read("components/OfflineBanner.tsx");
const network = read("lib/network.ts");
const catalogHome = read("components/CatalogHome.tsx");
const errorPage = read("app/error.tsx");
const onboarding = read("components/ShopperOnboarding.tsx");
const onboardingLib = read("lib/onboarding.ts");
const helpFaq = read("components/HelpFaq.tsx");
const ayudaPage = read("app/ayuda/page.tsx");
const faqCopy = read("app/faq/copy.ts");
const faqPage = read("app/faq/page.tsx");
const picker = read("components/BrandPicker.tsx");
const brand = read("lib/brand.ts");
const routes = read("lib/routes.ts");
const layout = read("app/layout.tsx");
const shell = read("components/AppShell.tsx");
const storeCta = read("components/StoreCta.tsx");
const readme = read("README.md");

test("generic empty and error copy are Markos locked lines", () => {
  assert.match(edges, /Todavía no hay nada acá\./);
  assert.match(edges, /emptyCopy/);
  assert.match(edges, /cta: "Ir al feed"/);
  assert.match(emptyState, /emptyCopy/);
  assert.match(edges, /Algo falló\. Probá de nuevo\./);
  assert.match(edges, /Reintentar/);
  assert.match(edges, /Ir al inicio/);
  assert.match(edges, /No cargó la foto/);
  assert.match(edges, /photoFailCopy/);
  assert.match(edges, /Hoy no hay Las 21\./);
  assert.match(edges, /Volvé mañana a las 21\./);
  assert.match(edges, /emptyLas21/);
  assert.match(edges, /Se terminó Las 21\./);
  assert.match(edges, /endedLas21/);
  assert.match(edges, /No se pudo compartir\. Probá de nuevo\./);
  assert.match(edges, /shareFailCopy/);
  assert.equal(edges.includes("No pudimos cargar."), false);
  assert.equal(
    edges.includes("Probá de nuevo. Si sigue, la tienda puede estar caída."),
    false,
  );
});

test("empty Guardados, Looks, and Recién use the locked lines", () => {
  assert.match(edges, /Todavía no guardaste nada\./);
  assert.match(
    edges,
    /Tocá el corazón en una pieza\. Cuando quieras, volvés acá\./,
  );
  assert.match(edges, /Ir al feed →/);
  assert.match(saved, /emptyGuardados/);
  assert.match(saved, /HeartIcon/);
  assert.match(saved, /Ir al feed|emptyGuardados\.cta/);
  assert.match(edges, /Todavía no hay looks\. Volvé más tarde\./);
  assert.match(looks, /emptyLooks/);
  assert.match(edges, /Nadie publicó todavía\./);
  assert.match(edges, /Cuando una tienda publique, aparece acá\./);
  assert.match(stories, /emptyRecien/);
  assert.equal(stories.includes("router.replace"), false);
});

test("error and offline reuse the same load screen", () => {
  assert.match(edges, /Algo falló\. Probá de nuevo\./);
  assert.match(edges, /Reintentar/);
  assert.match(edges, /Ir al inicio/);
  assert.match(edges, /Marcas de TiendaNube\./);
  assert.match(edges, /Tocás, vas a su tienda\./);
  assert.match(loadError, /loadErrorCopy/);
  assert.match(loadError, /CloudOffIcon/);
  assert.match(loadError, /Wordmark/);
  assert.match(offline, /LoadError/);
  assert.match(offline, /isBrowserOffline/);
  assert.match(offline, /NETWORK_FAIL_EVENT/);
  assert.match(errorPage, /LoadError/);
  assert.match(layout, /OfflineGate/);
  assert.match(storeCta, /reportNetworkFail|isBrowserOffline/);
});

test("soft offline banner sits above the feed and is not the hard error", () => {
  assert.match(edges, /Sin conexión\. Estás viendo lo guardado\./);
  assert.match(offlineBanner, /offlineBannerCopy/);
  assert.match(offlineBanner, /isBrowserOffline/);
  assert.match(offlineBanner, /subscribeOnlineStatus/);
  assert.match(offlineBanner, /bg-paper/);
  assert.match(offlineBanner, /role="status"/);
  assert.equal(offlineBanner.includes("bg-terracotta"), false);
  assert.equal(offlineBanner.includes("LoadError"), false);
  assert.equal(offlineBanner.includes("min-h-dvh"), false);
  assert.match(network, /subscribeOnlineStatus/);
  assert.match(catalogHome, /OfflineBanner/);
  assert.match(stories, /OfflineBanner/);
  assert.equal(offline.includes("addEventListener(\"offline\""), false);
  assert.match(readme, /Sin conexión\. Estás viendo lo guardado\./);
});

test("Ayuda FAQ copy is locked and never says 21 productos", () => {
  assert.match(routes, /ayuda: "\/ayuda"/);
  assert.match(edges, /Preguntas en el FAQ\. Escribinos desde Contacto\./);
  assert.match(ayudaPage, /ayudaCopy/);
  assert.match(ayudaPage, /routes\.faq/);
  assert.match(ayudaPage, /routes\.contacto/);
  assert.equal(ayudaPage.includes("redirect"), false);
  assert.equal(ayudaPage.includes("mailto:"), false);
  assert.equal(ayudaPage.includes("joacoditoma@gmail.com"), false);
  assert.equal(ayudaPage.includes("@curadario"), false);
  assert.match(faqPage, /HelpFaq/);
  assert.match(faqCopy, /¿Qué es Con pinta\?/);
  assert.match(
    faqCopy,
    /Vitrina de marcas de TiendaNube\. Tocás, vas a su tienda\./,
  );
  assert.match(faqCopy, /¿Cómo compro\?/);
  assert.match(
    faqCopy,
    /En la ficha, Ir a la tienda\. El checkout es de la marca\./,
  );
  assert.match(faqCopy, /¿Soy una marca\?/);
  assert.match(
    faqCopy,
    /Continuar con TiendaNube, elegís qué publicás\./,
  );
  assert.match(faqCopy, /¿Las 21\?/);
  assert.match(
    faqCopy,
    /Drop de 20 minutos\. 21:00–21:20\. Una pieza por tienda\. No apaga el feed\./,
  );
  assert.equal(faqCopy.includes("marcas@curadario.la"), false);
  assert.equal(faqCopy.includes("Curadario"), false);
  assert.equal(helpFaq.includes("mailto:"), false);
  assert.match(helpFaq, /¿Tenés más preguntas\?|contactPrompt/);
  assert.match(helpFaq, /routes\.contacto/);
  const scanned = [
    faqCopy,
    faqPage,
    ayudaPage,
    helpFaq,
    edges,
    readme,
    ...walk(join(root, "app"), ".tsx").map((path) => readFileSync(path, "utf8")),
    ...walk(join(root, "components"), ".tsx").map((path) =>
      readFileSync(path, "utf8"),
    ),
    ...walk(join(root, "lib"), ".ts").map((path) => readFileSync(path, "utf8")),
  ].join("\n");
  assert.equal(scanned.includes("21 productos"), false);
});

test("shopper onboarding is three first-visit slides", () => {
  assert.match(edges, /Marcas de TiendaNube\./);
  assert.match(edges, /Tocás, vas a su tienda\./);
  assert.match(edges, /Guardá y reenviá\. Lo vi en Con pinta\./);
  assert.equal(edges.includes("Guardá y compartí el hallazgo."), false);
  assert.match(edges, /Siguiente/);
  assert.match(edges, /Empezar/);
  assert.match(edges, /Saltar/);
  assert.match(onboarding, /onboardingSlides/);
  assert.match(onboarding, /onboardingCopy\.next/);
  assert.match(onboarding, /onboardingCopy\.start/);
  assert.match(onboarding, /onboardingCopy\.skip/);
  assert.match(onboarding, /de \$\{onboardingSlides\.length\}/);
  assert.match(onboarding, /Wordmark/);
  assert.match(onboarding, /bg-cream/);
  assert.match(onboarding, /bg-paper/);
  assert.match(onboarding, /bg-ink/);
  assert.match(onboarding, /Saltar|onboardingCopy\.skip/);
  assert.match(onboarding, /markOnboardingSeen/);
  assert.match(onboardingLib, /ONBOARDING_KEY/);
  assert.match(onboardingLib, /localStorage/);
  assert.match(shell, /ShopperOnboarding/);
});

test("brand empty post-sync asks for at least one piece", () => {
  assert.match(brand, /Elegí al menos una pieza para aparecer en el feed\./);
  assert.match(picker, /emptyFeed/);
  assert.match(picker, /count === 0/);
});
