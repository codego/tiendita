# Curadario

Dense polimarca catalog. Many TiendaNube brands, one place. Curadario is a **vitrina** — it takes you to the store; the store sells.

The hook is **Recién publicadas**: the rail and the **RECIéN** badge only show pieces just published (`bumpRecien`). The rest of the catalog has no badge.

Share starts on **every card**: “Mirá lo que encontré en Curadario.” The viral unit is the finding. After share, back to the feed.

No bag. No own checkout. Shopper CTA stays **Ir a la tienda →**.

## Install

```bash
npm install
```

## Dev

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — that is the **shopper home**.

| Route | What you see |
| --- | --- |
| `/` | Dense polimarca home: search, chips, banner, Recién rail, fat 2-col grid |
| `/app` | Alias — redirects to `/` |
| `/app/coleccion` | Five-piece Sastrería de agosto collection |
| `/app/coleccion/compartir` | Share a finding from a card, then back to the feed |
| `/app/pieza/tapado-coppola` | Ficha Tapado Coppola |
| `/marcas` | Brand gate: PARA MARCAS |
| `/marcas/elegir` | Mock TiendaNube picker — apparel only. Publish moves Recién |
| `/marcas/dashboard` | Esta semana — visitas, clics, ranking |
| `/terminos` | Términos — vitrina, no payments |
| `/privacidad` | Privacidad — no checkout data |

Home first screen: **Marcas de TiendaNube. Tocás, vas a su tienda.** Row **Marcas de TiendaNube →** `/marcas`. Brand gate still **¿Tenés TiendaNube? Publicá tu tienda.**

Chips: Todas · Ropa · Deportiva · Carteras · Accesorios · Trajes de baño · Sastrería · Calzado.

No bag. No own checkout.

## Vicky order

1. **TN login + elegir** — `/marcas` (Continuar con TiendaNube → mock OAuth) then `/marcas/elegir`. Ya tengo cuenta → `/marcas/dashboard`. Publish sends the shopper to `/` so Recién moves.
2. **Shopper + share** — `/` feed and `/app/coleccion`. Viral kit on `/app/coleccion/compartir`: “Mirá lo que encontré en Curadario.” After share, back to the feed.
3. **Legales** — `/terminos` and `/privacidad`. Curadario is a vitrina. Checkout stays in the brand store (**Ir a la tienda →**).

## Brand + viral + legal

1. **`/marcas`** — “Publicá tu selección. No tu tienda entera.” Primary **Continuar con TiendaNube →** is mock OAuth and goes to `/marcas/elegir`. Secondary **Ya tengo cuenta** → `/marcas/dashboard`. Footer: Términos + Privacidad.
2. **`/marcas/elegir`** — “Elegí qué publicar.” Sync banner (247 productos, mocked). Search. Apparel list with toggles. Sticky **Publicar X piezas →**. Notes: “Lo no elegido no aparece en Curadario.” “El checkout sigue en tu tienda.” TiendaNube is `data/tiendanube.json` — no live API.
3. **`/marcas/dashboard`** — “Esta semana.” Mock visitas / clics a la tienda / piezas publicadas. Ranking from sastrería seed SKUs. **Editar selección** → `/marcas/elegir`. **Ver mi vitrina →** → `/app/coleccion`. Footer: “Curadario no vende. El clic es el resultado.”
4. **Share a finding** — `/app/coleccion/compartir`. Markos kit: “Mirá lo que encontré en Curadario.” Card is the product (brand, name, price). Copiar enlace, Instagram Stories, WhatsApp, Más. Primary **Compartir hallazgo →**. After share, return to `/`.
5. **`/terminos`** and **`/privacidad`** — Curadario does not process payments.

## Shopper flow

1. **Home** (`/`) — Vicky line, Recién rail (the hook), masonry chrome, fat invented-brand catalog.
2. **Colección** — Sastrería de agosto stays five pieces.
3. **Tapado Coppola** — ficha with talle, tela, corte and `$ 890.000`.
4. **Ir a la tienda →** — fires `cta_to_store` and opens `store_url` with UTM (`utm_source=curadario`).

Shopper nav: Inicio · Colección (→ Sastrería de agosto) · Buscar · Guardados.

The shopper catalog is a fat mixed-apparel seed. Sastrería de agosto remains one collection, not the whole product.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Next.js dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm test` | Catalog, landing, brand, share, and legal checks |
| `npm run lint` | ESLint |
