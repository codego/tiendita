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
const loadError = read("components/LoadError.tsx");
const offline = read("components/OfflineGate.tsx");
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
  assert.match(edges, /No pudimos cargar\./);
  assert.match(
    edges,
    /Probá de nuevo\. Si sigue, la tienda puede estar caída\./,
  );
  assert.match(edges, /Reintentar/);
  assert.match(edges, /Ir al inicio/);
  assert.match(edges, /Marcas de TiendaNube\./);
  assert.match(edges, /Tocás, vas a su tienda\./);
  assert.match(loadError, /loadErrorCopy/);
  assert.match(loadError, /CloudOffIcon/);
  assert.match(offline, /LoadError/);
  assert.match(offline, /isBrowserOffline/);
  assert.match(errorPage, /LoadError/);
  assert.match(layout, /OfflineGate/);
  assert.match(storeCta, /reportNetworkFail|isBrowserOffline/);
});

test("Ayuda FAQ copy is locked and never says 21 productos", () => {
  assert.match(routes, /ayuda: "\/ayuda"/);
  assert.match(ayudaPage, /redirect\(routes\.faq\)/);
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
    /Drop diario 21:00–21:20\. Una pieza por tienda\. No apaga el feed\./,
  );
  assert.equal(faqCopy.includes("marcas@curadario.la"), false);
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
