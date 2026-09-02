# Curadario

Dense polimarca catalog. Many TiendaNube brands, one place. Curadario is a **vitrina** — it takes you to the store; the store sells.

`/` is always the **packed catalog feed**. The home rail is three typographic 1:1 tiles: **Llegó.** / **De esta semana.** / **Hoy a las 21.** Las 21 is the terracotta tile → `/las21`. There is no countdown clock on home. Lo que lleva el look is the **Carteras** chip, not a banner.

Locked home line: **Marcas de TiendaNube. Tocás, vas a su tienda.**

No bag. No own checkout. Shopper CTA stays **Ir a la tienda →**. No Vercel. Local only.

## Preview

```bash
git pull
npm install
npm run dev
```

- [http://localhost:3000](http://localhost:3000) — packed catalog + Elena's three-tile rail

| On `/` | What you see |
| --- | --- |
| Always | Wordmark, search, locked line, 1:1 typographic rail (Llegó. green / De esta semana. cobalt / Hoy a las 21. terracotta), chips, Recién rail, Lo más reenviado, dense 2-col grid |
| Las 21 | Home rail tile **Hoy a las 21.** opens `/las21`. No countdown clock on home. |

**Floor:** con 3 se prende; con menos no. Three stores light the `/las21` drop. The catalog never goes away.

Two shares, locked:
1. Day / every card: **Mirá lo que encontré en Curadario.**
2. Las 21 drop module: **Está pasando. 20 minutos.**

**Avisame a las 20:55** stays on the module. It is not the only reason to open the app — the feed is always there.

Brands tease by day: **hoy a las 21, esta.**

Prices are ARS. Brands are invented Argentine / mock TiendaNube names. Tokens: Ink `#161513`, Terracotta `#C8553D`, Cream `#EFE9DD`, Surface `#FBFAF6`. Playfair + DM Sans.

## Routes

| Route | What you see |
| --- | --- |
| `/` | Shopper home: packed catalog + three typographic banners |
| `/recien` | Recién stories — new publishes only |
| `/anoche` | Lo más reenviado |
| `/marca/taller-recoleta` | Ficha de marca — name, TiendaNube count, Ir a su tienda, that brand’s pieces |
| `/las21` | Las 21 share target — WhatsApp OG “Está pasando. 20 minutos.” |
| `/marcas` | Brand gate if no session; merchant panel if session exists. Real OAuth if TN env is set; otherwise labeled mock |
| `/marcas/oauth` | TiendaNube authorize (env required) |
| `/marcas/elegir` | Qué publicás — live store products after OAuth, or labeled mock seed |
| `/marcas/dashboard` | Redirects to the panel home `/marcas` |
| `/terminos` | Términos — vitrina, no payments |
| `/privacidad` | Privacidad — no checkout data |
| `/que-es` | Qué es Curadario — Descubrí, Tocá, Compartí |
| `/faq` | FAQ — vitrina, how to buy, how to publish, Las 21 |
| `/ayuda` | Redirects to `/faq` |
| `/contacto` | Contact form — name, email, message |
| `/app/buscar` | Search brand, name, category |
| `/app/guardados` | Saved hearts — local pocket |
| `/app/coleccion` | Looks — index of curated collections |
| `/app/coleccion/compartir` | Finding share: “Mirá lo que encontré en Curadario.” |
| `/app/pieza/tapado-coppola` | Ficha Tapado Coppola |

Home first screen: **Marcas de TiendaNube. Tocás, vas a su tienda.** Recién rail opens `/recien` stories. Share starts on **every card**: “Mirá lo que encontré en Curadario.”

Shopper nav: Inicio · **Looks** · Buscar · Guardados. Looks is an index (Sastrería de agosto, Lo que lleva el look / carteras, Un solo traje / trajes). Sastrería is one card in that index — the first-cut mock, not the brand. It does not open as the Looks home.

First visit: a 3-slide sheet — **Marcas de TiendaNube** · **Tocás, vas a su tienda** · **Guardá y compartí el hallazgo.**

Empty Guardados: **Todavía no guardaste nada.** / **Tocá el corazón en una pieza. Cuando quieras, volvés acá.** CTA **Ir al feed →**. Empty Looks: **Todavía no hay looks. Volvé más tarde.** Empty Recién: **Nadie publicó todavía. Cuando una tienda publique, aparece acá.**

Failed fetch / offline: **No pudimos cargar.** / **Probá de nuevo. Si sigue, la tienda puede estar caída.** **Reintentar** · **Ir al inicio.**

Brand panel with 0 published: **Todavía no hay nada en Curadario.** / **Elegí al menos una pieza para aparecer en el feed.** CTA **Elegir piezas**. After the first publish (0 → N): **Listo.** / **Ya está en Curadario.** / **Ver el feed**. Later **Listo · N publicadas** returns to the panel.

Cookie on the feed: **Usamos lo mínimo para que funcione.** + **Privacidad →** + **Entendido** (localStorage). PWA on Android/desktop (`beforeinstallprompt`): **Abrí Curadario desde el home** / **Agregar** / **Ahora no**. iOS Safari (not standalone, not Chrome iOS): how-to sheet **Abrí Curadario desde el home.** / **En iPhone, Safari no instala solo.** / **Tocá Compartir** · **Agregar a inicio** · **Agregar** / **Ahora no** (`curadario:pwa-ios-dismissed`). No fake install CTA. Cookie first, then the sheet.

Home-screen icon is Elena’s italic serif **C** — terracotta `#C8553D` on cream `#EFE9DD`. No wordmark on the icon. Files in `public/`: `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` (same C, already padded), `apple-touch-icon.png` (180), `favicon-32.png`, `favicon.ico`. `public/splash-cream.png` is the iOS splash wordmark (**Curadario.** with the period). Android splash uses manifest `background_color` `#EFE9DD`.

Ficha de marca: tap the brand name on a card → `/marca/[slug]`. **TiendaNube · N piezas en Curadario.** **Ir a su tienda**.

Home feed uses terracotta shimmer 3:4 skeletons while Recién / Guardados hydrate. Walls are paper `#FFFFFF`. Cream `#EFE9DD` stays on PWA/Apple splash and product photo frames.

Chips: Todas · Ropa · Deportiva · Carteras · Accesorios · Trajes de baño · Sastrería · Calzado.

## Brand + legal

1. **`/marcas`** — No session: “Publicá tu selección. No tu tienda entera.” Primary **Continuar con TiendaNube →**. Real OAuth when `TIENDANUBE_CLIENT_ID` + `TIENDANUBE_CLIENT_SECRET` + `TIENDANUBE_REDIRECT_URI` are set. Without them, the path is labeled **Mock**. With a session: merchant cockpit — store name + **Conectada a TiendaNube** (mock label if OAuth env is unset). One number: **Salidas a tu tienda (7 días)** from real store-CTA clicks. Sub: “Curadario no vende. El clic es el resultado.” **Lo que más reenviaron** is the top 3 pieces by share count in 7 days (empty if none). **Hoy a las 21: esta.** is XOR: a Las 21 card + **Cambiar** if this store has a piece in tonight’s drop; otherwise only **Esta noche no tenés pieza en el drop.** **Elegir más piezas** → `/marcas/elegir`. **Ver mi vitrina** → `/marca/[slug]`. Empty (0 publicadas): **Todavía no hay nada en Curadario.** + **Elegir piezas**. Still no checkout. Las 21 stays one piece per store. No visitas/clics language on this screen.
2. **`/marcas/elegir`** — “Qué publicás.” **Lo que prendes entra al feed. El checkout sigue en tu TiendaNube.** Live products after OAuth; otherwise the labeled mock seed. Sticky **Listo · N publicadas** returns to the panel. First publish (0 → N) still shows **Listo.** / **Ya está en Curadario.** / **Ver el feed**.
3. **`/marcas/dashboard`** — Redirects to the panel home `/marcas`. Click notice for mail still: **Alguien salió de Curadario a tu ficha.**
4. **Share a finding** — `/app/pieza/[id]` and `/app/coleccion/compartir`. WhatsApp OG title: **Mirá lo que encontré en Curadario** + the product image. Site: **curadario.app**. Las 21 live share: `/las21` — terracotta **LAS 21**, title **Está pasando. 20 minutos.**
5. **`/terminos`** and **`/privacidad`** — Curadario is a **vitrina**. No payments.
6. **`/que-es`** — Qué es Curadario. **01 Descubrí** / **02 Tocá** / **03 Compartí**. CTAs **Ir al feed** and **Publicá tu tienda** → `/marcas`.
7. **`/faq`** — FAQ. Cómo publicar: Entrás con TiendaNube → elegís qué sale → a las 21 puede ir al drop. Las 21 is a daily drop 21:00–21:20, one piece per store. It does not turn off the feed. Más preguntas → `/contacto`. `/ayuda` redirects here.
8. **`/contacto`** — **Marcas y el resto, acá.** Nombre, Email, Soy (Marca / Shopper), Mensaje, **Enviar**. Persists locally and sends to **joacoditoma@gmail.com** (`CONTACT_TO`, default until Curadario has its own inbox) when a transport is set. After send: **Mensaje enviado.** + **Ir al feed →**. No invented Curadario mailbox.

## Env

Local `.env` — do not invent a Curadario inbox. See `.env.example`.

| Variable | What it does |
| --- | --- |
| `CONTACT_TO` | Destination inbox. Defaults to `joacoditoma@gmail.com` if unset. |
| `CONTACT_FROM` | Verified sender for Resend. A real mailbox you control — never an invented Curadario inbox. |
| `RESEND_API_KEY` | Optional. Needed to actually send `CONTACT_TO`. |
| `NEXT_PUBLIC_SITE_URL` | Public origin for OG / WhatsApp image URLs. Defaults to `http://localhost:3000`. Set to `https://curadario.app` (or your host) so previews resolve absolute images. |
| `TIENDANUBE_CLIENT_ID` | TiendaNube app id |
| `TIENDANUBE_CLIENT_SECRET` | TiendaNube client secret |
| `TIENDANUBE_REDIRECT_URI` | Callback, e.g. `http://localhost:3000/marcas/oauth/callback` |

Without the TiendaNube trio, `/marcas` stays the labeled mock. The form always persists in localStorage and shows **Mensaje enviado.**

404: **Esto no está en Curadario.** **Volvé al feed.** CTA **Ir al feed →** to `/`.

Buscar queries the catalog by brand, name, and category. Empty: **No encontramos eso.** + **Ir al feed →**.

Guardados stays: hearts persist locally. Empty: **Todavía no guardaste nada.**

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Next.js dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm test` | Catalog, Las 21 module, brand, share, legal, and edge checks |
| `npm run lint` | ESLint |
