import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { isShareAbort, shareOrCopy } from "../lib/shareAction.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

const edges = read("lib/edges.ts");
const shareAction = read("lib/shareAction.mjs");
const banner = read("components/ShareFailBanner.tsx");
const finding = read("components/ShareFindingButton.tsx");
const live = read("components/LiveShareButton.tsx");
const day = read("components/DayShareButton.tsx");
const sheet = read("components/ShareSheet.tsx");
const home = read("lib/home.ts");
const brand = read("lib/brand.ts");
const name = read("lib/name.ts");
const readme = read("README.md");

test("share abort is not a failure", () => {
  assert.equal(isShareAbort({ name: "AbortError" }), true);
  assert.equal(isShareAbort({ name: "NotAllowedError" }), false);
  assert.equal(isShareAbort(new Error("no")), false);
  assert.equal(isShareAbort(null), false);
});

function withNavigator(value, run) {
  Object.defineProperty(globalThis, "navigator", {
    configurable: true,
    value,
  });
  return run();
}

test("shareOrCopy maps share, copy, abort, and fail", async () => {
  const prev = globalThis.navigator;
  try {
  await withNavigator({ share: async () => {} }, async () => {
    assert.equal(
      await shareOrCopy({ title: "t", text: "Lo vi en Con pinta." }),
      "shared",
    );
  });

  await withNavigator(
    {
      share: async () => {
        const error = new Error("cancel");
        error.name = "AbortError";
        throw error;
      },
    },
    async () => {
      assert.equal(await shareOrCopy({ title: "t", text: "x" }), "aborted");
    },
  );

  await withNavigator(
    {
      clipboard: {
        writeText: async (text) => {
          assert.equal(text, "Está pasando en Con pinta. 20 minutos.");
        },
      },
    },
    async () => {
      assert.equal(
        await shareOrCopy({
          title: "Está pasando en Con pinta. 20 minutos.",
          text: "Está pasando en Con pinta. 20 minutos.",
        }),
        "copied",
      );
    },
  );

  await withNavigator(
    {
      share: async () => {
        throw new Error("unsupported");
      },
      clipboard: {
        writeText: async () => {
          throw new Error("denied");
        },
      },
    },
    async () => {
      assert.equal(await shareOrCopy({ title: "t", text: "x" }), "failed");
    },
  );

  await withNavigator({}, async () => {
    assert.equal(await shareOrCopy({ title: "t", text: "x" }), "failed");
  });
  } finally {
    Object.defineProperty(globalThis, "navigator", {
      configurable: true,
      value: prev,
    });
  }
});

test("share fail copy is locked and every native share can retry", () => {
  assert.match(edges, /line: "No se pudo compartir\. Probá de nuevo\."/);
  assert.match(edges, /shareFailCopy[\s\S]*retry: "Reintentar"/);
  assert.match(banner, /shareFailCopy\.line/);
  assert.match(banner, /shareFailCopy\.retry/);
  assert.match(banner, /#EFE9DD/);
  assert.match(banner, /role="status"/);
  assert.match(shareAction, /shareOrCopy/);
  assert.match(shareAction, /AbortError/);
  assert.match(shareAction, /navigator\.share/);
  assert.match(shareAction, /clipboard\.writeText/);

  for (const source of [finding, live, day, sheet]) {
    assert.match(source, /shareOrCopy|ShareFailBanner/);
    assert.match(source, /ShareFailBanner/);
    assert.match(source, /failed/);
    assert.equal(source.includes("Ignore clipboard"), false);
  }

  assert.match(finding, /shareCopy\.headline|Lo vi en Con pinta/);
  assert.match(live, /LIVE_SHARE_COPY/);
  assert.match(sheet, /findingShareText/);
  assert.match(sheet, /router\.push\(routes\.landing\)/);
  assert.match(readme, /No se pudo compartir\. Probá de nuevo\./);
});

test("Markos share strings stay on the success path", () => {
  assert.match(home, /Lo vi en Con pinta\./);
  assert.match(home, /Está pasando en Con pinta\. 20 minutos\./);
  assert.match(home, /¿Esta o esta\? En Con pinta\./);
  assert.match(brand, /Lo vi en Con pinta\./);
  assert.match(name, /Lo vi en Con pinta\./);
  assert.match(name, /Está pasando en Con pinta\. 20 minutos\./);
  assert.match(name, /¿Esta o esta\? En Con pinta\./);
  assert.equal(home.includes("Está pasando en Curadario"), false);
  assert.equal(brand.includes("Curadario"), false);
});
