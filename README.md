# Curadario

Editorial fashion curation. Local cut 1 is **Sastrería de agosto**: five pieces, one look, one place. Curadario is a **vitrina** — it takes you to the store; the store sells.

No bag. No own checkout. Shopper CTA stays **Ir a la tienda →**.

## Install

```bash
npm install
```

## Dev

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — that is the **public desktop landing**.

| Route | What you see |
| --- | --- |
| `/` | Public landing: hero Sastrería de agosto, El look, Cómo funciona |
| `/app` | Shopper Inicio (banners, chips, grid) |
| `/app/coleccion` | Five-piece Sastrería grid |
| `/app/coleccion/compartir` | Share sheet for the look (not the home) |
| `/app/pieza/tapado-coppola` | Ficha Tapado Coppola |
| `/marcas` | Brand gate: PARA MARCAS |
| `/marcas/elegir` | Mock TiendaNube picker — apparel only |
| `/marcas/dashboard` | Esta semana — visitas, clics, ranking |
| `/terminos` | Términos — vitrina, no payments |
| `/privacidad` | Privacidad — no checkout data |

Landing CTA: **Ver Sastrería de agosto** → `/app/coleccion`. **Ir al look** → `/app`. **Marcas** / **Vendé** → `/marcas`.

## Brand + viral + legal

1. **`/marcas`** — “Publicá tu selección. No tu tienda entera.” Primary **Continuar con TiendaNube →** is mock OAuth and goes to `/marcas/elegir`. Secondary **Ya tengo cuenta** → `/marcas/dashboard`. Footer: Términos + Privacidad.
2. **`/marcas/dashboard`** — “Esta semana.” Mock visitas / clics a la tienda / piezas publicadas. Ranking from sastrería seed SKUs. **Editar selección** → `/marcas/elegir`. **Ver mi vitrina →** → `/app/coleccion`. Footer: “Curadario no vende. El clic es el resultado.”
3. **`/marcas/elegir`** — “Elegí qué publicar.” Sync banner (247 productos, mocked). Search. Apparel list with toggles. Sticky **Publicar X piezas →**. Notes: “Lo no elegido no aparece en Curadario.” “El checkout sigue en tu tienda.” TiendaNube is `data/tiendanube.json` — no live API.
4. **Share the look** — `/app/coleccion/compartir` (also from Colección). Copy: “Armé mi parte del look. Está en Curadario, no en cinco tiendas.” Card **Sastrería de agosto**. Copiar enlace, Instagram Stories, WhatsApp, Más. Primary **Compartir el look →**. The viral unit is the look, not Inicio.
5. **`/terminos`** and **`/privacidad`** — Curadario does not process payments.

## Local cut 1 shopper flow

1. **Landing** (`/`) — Markos copy, five sastrería thumbs only.
2. **Ver Sastrería de agosto** — shopper colección.
3. **Tapado Coppola** — ficha with talle, tela, corte and `$ 890.000`.
4. **Ir a la tienda →** — fires `cta_to_store` and opens `store_url` with UTM (`utm_source=curadario`).

Shopper nav: Inicio · Colección · Buscar · Guardados.

The shopper catalog is only the nine seed SKUs. Carteras and trajes stay in their own `collection_id`s and do not appear on the landing.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Next.js dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm test` | Catalog, landing, brand, share, and legal checks |
| `npm run lint` | ESLint |
