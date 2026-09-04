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

const queEs = read("lib/que-es.ts");
const queEsPage = read("components/QueEsPage.tsx");
const queEsRoute = read("app/que-es/page.tsx");
const faqCopy = read("app/faq/copy.ts");
const faqPage = read("app/faq/page.tsx");
const ayuda = read("app/ayuda/page.tsx");
const routes = read("lib/routes.ts");
const home = read("components/CatalogHome.tsx");
const siteLinks = read("components/SiteLinks.tsx");
const readme = read("README.md");

test("qué es uses Elena's locked lines and the mock layout", () => {
  assert.match(routes, /queEs: "\/que-es"/);
  assert.match(queEsRoute, /QueEsPage/);
  assert.match(queEs, /Qué es/);
  assert.match(queEs, /Con pinta/);
  assert.match(queEs, /Marcas de /);
  assert.match(queEs, /TiendaNube/);
  assert.match(queEs, /Tocás, vas a su tienda\./);
  assert.match(queEs, /01/);
  assert.match(queEs, /Descubrí/);
  assert.match(queEs, /feed de marcas reales/);
  assert.match(queEs, /02/);
  assert.match(queEs, /Tocá/);
  assert.match(queEs, /Ir a la tienda, ellas venden/);
  assert.match(queEs, /03/);
  assert.match(queEs, /Compartí/);
  assert.match(queEs, /el hallazgo, no el mall/);
  assert.match(queEs, /Ir al feed/);
  assert.match(queEs, /¿Tenés TiendaNube\? Publicá tu tienda/);
  assert.match(queEsPage, /tone="terracotta"/);
  assert.match(queEsPage, /routes\.landing/);
  assert.match(queEsPage, /routes\.marcas/);
  assert.match(home, /SiteLinks/);
  assert.match(siteLinks, /routes\.queEs/);
  assert.match(siteLinks, /routes\.faq/);
});

test("FAQ locks Las 21 and Markos publish, and /ayuda points to FAQ and Contacto", () => {
  assert.match(routes, /faq: "\/faq"/);
  assert.match(faqPage, /HelpFaq/);
  assert.match(faqPage, /FAQ_ITEMS/);
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
  assert.match(faqCopy, /Continuar con TiendaNube, elegís qué publicás\./);
  assert.match(faqCopy, /¿Cómo publico\?/);
  assert.match(
    faqCopy,
    /Entrás con TiendaNube → elegís qué sale → a las 21 puede ir al drop\./,
  );
  assert.match(faqCopy, /¿Las 21\?/);
  assert.match(
    faqCopy,
    /Drop de 20 minutos\. 21:00–21:20\. Una pieza por tienda\. No apaga el feed\./,
  );
  assert.equal(faqCopy.includes("marcas@curadario.la"), false);
  assert.equal(faqCopy.includes("Curadario"), false);
  assert.equal(faqPage.includes("Curadario"), false);
  assert.match(faqPage, /contactCta|Escribinos|FAQ_CONTACT/);
  assert.match(ayuda, /Preguntas en el FAQ|ayudaCopy/);
  assert.match(ayuda, /routes\.faq/);
  assert.match(ayuda, /routes\.contacto/);
  assert.equal(ayuda.includes("redirect"), false);
  assert.equal(ayuda.includes("mailto:"), false);
  assert.equal(ayuda.includes("joacoditoma@gmail.com"), false);
  assert.equal(ayuda.includes("@curadario"), false);
  assert.match(readme, /\/que-es/);
  assert.match(readme, /\/faq/);
  const scanned = [
    faqCopy,
    faqPage,
    queEs,
    queEsPage,
    readme,
    ...walk(join(root, "app"), ".tsx").map((path) => readFileSync(path, "utf8")),
    ...walk(join(root, "components"), ".tsx").map((path) =>
      readFileSync(path, "utf8"),
    ),
    ...walk(join(root, "lib"), ".ts").map((path) => readFileSync(path, "utf8")),
  ].join("\n");
  assert.equal(scanned.includes("21 productos"), false);
});
