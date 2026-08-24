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

1. **Inicio** — tapa for Colección · 01, Sastrería de agosto.
2. **Ver las cinco piezas →** — two-column grid (tapado, saco, pantalón, camisa, mocasín).
3. **Tapado Coppola** — ficha with talle, tela, corte and `$ 890.000`.
4. **Ir a la tienda →** — fires `cta_to_store` and opens `store_url` with UTM (`utm_source=curadario`).

Nav: Inicio · Colección · Buscar · Guardados.

Two other collections exist in the seed and stay off the tapa: **Lo que lleva el look** (tote + baguette) and **Un solo traje** (bikini + enteriza).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Next.js dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm test` | Catalog seed checks |
| `npm run lint` | ESLint |
