# Curadario

Dense polimarca catalog. Many TiendaNube brands, one place. Curadario is a **vitrina** — it takes you to the store; the store sells.

`/` is always the **packed catalog feed**. Las 21 is a **feature block** on that home. It does not turn off the vitrine.

Locked home line: **Marcas de TiendaNube. Tocás, vas a su tienda.**

No bag. No own checkout. Shopper CTA stays **Ir a la tienda →**. No Vercel. Local only.

## Preview

```bash
git pull
npm install
npm run dev
```

- [http://localhost:3000](http://localhost:3000) — feed + Las 21 module from the real America/Buenos_Aires clock
- [http://localhost:3000?drop=1](http://localhost:3000?drop=1) — local test only: force the drop module (feed still scrolls)

| On `/` | What you see |
| --- | --- |
| Always | Wordmark, search, locked line, chips, Recién rail, Lo más reenviado, dense 2-col grid |
| Day, or fewer than 3 stores | Las 21 module: **Faltan X h Y min para Las 21.** + **Avisame a las 20:55** |
| 21:00–21:20 with ≥ 3 stores, or `?drop=1` with ≥ 3 | Drop module **in the home with the scroll**: one piece per store, timer, **Ir a la tienda →**, share **Está pasando en Curadario. 20 minutos.** |

**Floor:** con 3 se prende; con menos no. Three stores light the drop module. 0–2 keep the countdown module. The catalog never goes away. At 21:21 the drop module closes; the grid stays.

Live share copy, exact: **Está pasando en Curadario. 20 minutos.**

Brands tease by day: **hoy a las 21, esta.**

Prices are ARS. Brands are invented Argentine / mock TiendaNube names. Tokens: Ink `#161513`, Terracotta `#C8553D`, Cream `#EFE9DD`, Surface `#FBFAF6`. Playfair + DM Sans.

## Routes

| Route | What you see |
| --- | --- |
| `/` | Shopper home: feed + Las 21 module |
| `/?drop=1` | Local test — force the drop module, not the product |
| `/recien` | Recién stories — new publishes only |
| `/anoche` | Lo más reenviado |
| `/marcas` | Brand gate: PARA MARCAS |
| `/marcas/elegir` | Mock TiendaNube picker — apparel only |
| `/marcas/dashboard` | Esta semana — visitas, clics, ranking |
| `/terminos` | Términos — vitrina, no payments |
| `/privacidad` | Privacidad — no checkout data |
| `/app/coleccion` | Five-piece Sastrería de agosto collection |
| `/app/coleccion/compartir` | Finding share: “Mirá lo que encontré en Curadario.” |
| `/app/pieza/tapado-coppola` | Ficha Tapado Coppola |

Home first screen: **Marcas de TiendaNube. Tocás, vas a su tienda.** Recién rail opens `/recien` stories. Share starts on **every card**: “Mirá lo que encontré en Curadario.”

Chips: Todas · Ropa · Deportiva · Carteras · Accesorios · Trajes de baño · Sastrería · Calzado.

## Brand + legal

1. **`/marcas`** — “Publicá tu selección. No tu tienda entera.” Primary **Continuar con TiendaNube →**. **¿Tenés TiendaNube? Publicá tu tienda.**
2. **`/marcas/elegir`** — “Elegí qué publicar.” Checkout stays in the brand store.
3. **`/marcas/dashboard`** — “Esta semana.” Footer: “Curadario no vende. El clic es el resultado.”
4. **Share a finding** — `/app/coleccion/compartir`. “Mirá lo que encontré en Curadario.”
5. **`/terminos`** and **`/privacidad`** — Curadario is a **vitrina**. No payments.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Next.js dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm test` | Catalog, Las 21 module, brand, share, and legal checks |
| `npm run lint` | ESLint |
