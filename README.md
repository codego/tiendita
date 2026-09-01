# Curadario — Las 21

The product is the **schedule**, not a feed. Twenty minutes. One piece per store. Then it ends.

Timezone: **America/Buenos_Aires**. Live window **21:00–21:20**. Outside that window, `/` is the day countdown. At 21:21 there is no mall and no catalog scroll.

No Vercel. Local only. No bag. No own checkout. Shopper CTA stays **Ir a la tienda →**.

## Preview

```bash
git pull
npm install
npm run dev
```

- [http://localhost:3000](http://localhost:3000) — day or live from the real Buenos Aires clock
- [http://localhost:3000?drop=1](http://localhost:3000?drop=1) — force the live window (Pola tests at random hours)

| Clock | What you see |
| --- | --- |
| Before 21:00 or after 21:20 | Cream day: **Faltan X h Y min para Las 21.** · *Veinte minutos. Una pieza por tienda. Se acaba.* · **Avisame a las 20:55** · ¿Esta o esta? · Lo más reenviado anoche |
| 21:00–21:20, or `?drop=1` | Dark live: wordmark + **LAS 21** · **LIVE** + remaining minutes (`20:00` total) · one piece on stage (brand, name, ARS) · **Ir a la tienda →** + share · rail **Más drops llegando** |

Live share copy, exact: **Está pasando en Curadario. 20 minutos.**

Day shares the countdown (`Faltan X h Y min para Las 21.`), not a feed. The 20:55 ping is the **Avisame a las 20:55** CTA.

Brands tease by day: **hoy a las 21, esta.**

**Floor:** con 3 se prende; con menos no. `LAS21_FLOOR` is **3**. Three stores/pieces at 21 lights live. 0, 1, or 2 stay on the day screen (countdown + anoche), even at 21:00 or with `?drop=1`.

Prices are ARS. Brands are invented Argentine / mock TiendaNube names. Tokens: Ink `#161513`, Terracotta `#C8553D`, Cream `#EFE9DD`, Surface `#FBFAF6`. Playfair + DM Sans.

## Routes that stay

| Route | What you see |
| --- | --- |
| `/` | Las 21 — day or live |
| `/?drop=1` | Force live |
| `/anoche` | Lo más reenviado anoche |
| `/marcas` | Brand gate: PARA MARCAS |
| `/marcas/elegir` | Mock TiendaNube picker — apparel only |
| `/marcas/dashboard` | Esta semana — visitas, clics, ranking |
| `/terminos` | Términos — vitrina, no payments |
| `/privacidad` | Privacidad — no checkout data |
| `/app/coleccion` | Five-piece Sastrería de agosto collection |
| `/app/coleccion/compartir` | Finding share: “Mirá lo que encontré en Curadario.” |
| `/app/pieza/tapado-coppola` | Ficha Tapado Coppola |

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
| `npm test` | Schedule, catalog, brand, share, and legal checks |
| `npm run lint` | ESLint |
