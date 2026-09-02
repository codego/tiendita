import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { goBackInApp, hasInAppHistory, HISTORY_FALLBACK } from "../lib/history.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const seed = JSON.parse(readFileSync(join(root, "data/seed.json"), "utf8"));
const catalog = readFileSync(join(root, "lib/catalog.ts"), "utf8");
const looksIndex = readFileSync(join(root, "components/LooksIndex.tsx"), "utf8");
const looksPage = readFileSync(join(root, "app/app/coleccion/page.tsx"), "utf8");
const header = readFileSync(join(root, "components/AppHeader.tsx"), "utf8");
const fichaBack = readFileSync(
  join(root, "components/FichaBackButton.tsx"),
  "utf8",
);
const pieza = readFileSync(join(root, "app/app/pieza/[slug]/page.tsx"), "utf8");
const stories = readFileSync(join(root, "components/RecienStories.tsx"), "utf8");
const shareSheet = readFileSync(join(root, "components/ShareSheet.tsx"), "utf8");
const history = readFileSync(join(root, "lib/history.mjs"), "utf8");

test("Looks index lists curated collections, not only Sastrería", () => {
  assert.match(catalog, /getLooksCollections/);
  assert.match(looksPage, /LooksIndex/);
  assert.match(looksIndex, /Looks/);
  assert.match(looksIndex, /routes\.coleccionId/);
  const looks = seed.collections.filter((c) => c.id !== "vitrina");
  assert.ok(looks.some((c) => c.id === "sastreria-de-agosto"));
  assert.ok(looks.some((c) => c.id === "lo-que-lleva-el-look"));
  assert.ok(looks.some((c) => c.id === "un-solo-traje"));
  assert.equal(
    looks.some((c) => c.id === "sastreria-de-agosto" && c.onTapa),
    true,
  );
  assert.ok(looks.length >= 3);
});

test("Looks cards have a line under the title so they are not a brand", () => {
  assert.match(looksIndex, /Look de sastrería, varias marcas/);
  assert.match(looksIndex, /Carteras de distintas tiendas/);
  assert.match(looksIndex, /Trajes de baño de distintas tiendas/);
  assert.match(looksIndex, /collection\.title/);
  assert.match(looksIndex, /LOOK_LINES/);
  assert.match(looksIndex, /Todavía no hay looks|emptyLooks/);
});

test("ficha atrás is history, not a hard link to Looks", () => {
  assert.match(pieza, /header="ficha"/);
  assert.match(header, /FichaBackButton/);
  assert.equal(header.includes("routes.coleccion"), false);
  assert.equal(header.includes("Volver a Looks"), false);
  assert.equal(fichaBack.includes("routes.coleccion"), false);
  assert.equal(fichaBack.includes("/app/coleccion"), false);
  assert.match(fichaBack, /goBackInApp/);
  assert.match(fichaBack, /aria-label="Volver"/);
  assert.match(history, /router\.back/);
  assert.match(history, /HISTORY_FALLBACK = "\/"/);
  assert.equal(history.includes("coleccion"), false);
  assert.equal(HISTORY_FALLBACK, "/");
  assert.equal(HISTORY_FALLBACK.includes("coleccion"), false);

  assert.equal(hasInAppHistory({ idx: 2 }), true);
  assert.equal(
    hasInAppHistory(null, "https://curadario.app/marca/taller", "https://curadario.app"),
    true,
  );
  assert.equal(hasInAppHistory({ idx: 0 }), false);
  assert.equal(hasInAppHistory(null, "", "https://curadario.app"), false);
  assert.equal(
    hasInAppHistory(null, "https://wa.me/share", "https://curadario.app"),
    false,
  );

  const back = { calls: /** @type {string[]} */ ([]) };
  const router = {
    back: () => back.calls.push("back"),
    replace: (href) => back.calls.push(`replace:${href}`),
  };
  goBackInApp(router, { state: { idx: 1 } });
  goBackInApp(router, {
    state: { idx: 0 },
    referrer: "",
    origin: "https://curadario.app",
  });
  assert.deepEqual(back.calls, ["back", "replace:/"]);

  assert.equal(stories.includes("routes.coleccion"), false);
  assert.equal(shareSheet.includes("routes.coleccion"), false);
});
