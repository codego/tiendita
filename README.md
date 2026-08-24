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

Open [http://localhost:3000](http://localhost:3000).

## Local cut 1 flow

1. **Inicio** — scroll: Banner 01 Sastrería de agosto, categorías (Sastrería · Carteras · Trajes), grid of the selected collection’s seed SKUs, Banner 02 Lo que lleva el look, Banner 03 Un solo traje.
2. **Ver las cinco piezas →** — two-column grid for Sastrería de agosto.
3. **Tapado Coppola** — ficha with talle, tela, corte and `$ 890.000`.
4. **Ir a la tienda →** — fires `cta_to_store` and opens `store_url` with UTM (`utm_source=curadario`).

Nav: Inicio · Colección · Buscar · Guardados.

The tapa of Sastrería is Banner 01, not the whole home. Carteras and trajes stay in their own `collection_id`s. The catalog is only the nine seed SKUs.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Next.js dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm test` | Catalog seed checks |
| `npm run lint` | ESLint |
