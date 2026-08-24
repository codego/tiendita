# Curadario

Editorial fashion curation. Local cut 1 is **Sastrería de agosto**: five pieces, one look, one place. Curadario takes you to the store; the store sells.

No bag. No checkout. No OAuth. No TiendaNube.

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
| `/app/pieza/tapado-coppola` | Ficha Tapado Coppola |

CTA on the landing: **Ver Sastrería de agosto** → `/app/coleccion`. **Ir al look** → `/app`.

## Local cut 1 flow

1. **Landing** (`/`) — Markos copy, five sastrería thumbs only.
2. **Ver Sastrería de agosto** — shopper colección.
3. **Tapado Coppola** — ficha with talle, tela, corte and `$ 890.000`.
4. **Ir a la tienda →** — fires `cta_to_store` and opens `store_url` with UTM (`utm_source=curadario`).

Shopper nav: Inicio · Colección · Buscar · Guardados.

The catalog is only the nine seed SKUs. Carteras and trajes stay in their own `collection_id`s and do not appear on the landing.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Next.js dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm test` | Catalog and landing copy checks |
| `npm run lint` | ESLint |
