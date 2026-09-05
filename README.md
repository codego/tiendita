# Con pinta

Dense polimarca catalog. Many TiendaNube brands, one place. Con pinta is a **vitrina** — it takes you to the store; the store sells. Repo folder stays `tiendita`.

`/` is always the **packed catalog feed**. The home rail is three photo 1:1 tiles: **Llegó.** / **De esta semana.** / **Hoy a las 21.** Las 21 is the third tile → `/las21`. There is no countdown clock on home. Lo que lleva el look is the **Carteras** chip, not a banner. Walls are cream `#EFE9DD`.

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
| Always | Wordmark, search, locked line, 1:1 photo rail (Llegó. / De esta semana. / Hoy a las 21.), colored chips, Recién rail, Lo más reenviado, dense 2-col grid |
| Offline | Soft banner **Sin conexión. Estás viendo lo guardado.** above the feed. Cached/last-seen content stays. Not the hard error screen. |
| Las 21 | Home rail tile **Hoy a las 21.** opens `/las21`. No countdown clock on home. |

**Floor:** con 3 se prende; con menos no. Three stores light the `/las21` drop. The catalog never goes away.

Three shares, locked (Markos):
1. Day / every card: **Lo vi en Con pinta.**
2. Las 21 live drop: **Está pasando en Con pinta. 20 minutos.**
3. Esta o esta: **¿Esta o esta? En Con pinta.**

**Avisame a las 21.** is the first-time cream sheet on the feed (after cookie / PWA). CTA asks the OS for Notification permission. **Ahora no** dismisses. Either way, localStorage remembers — the sheet does not come back every visit. Copy stays the drop line, not a generic permission lecture. After **Ahora no**, `/ajustes` (hamburger **Ajustes**, or the home footer) is the way back: the same **Avisame a las 21.** toggle. On asks permission if needed, clears the dismissed flag, and arms the 20:55 local ping. Off stops the ping. If the OS denied — or the shopper toggles On after a deny — Con pinta does **not** call `requestPermission` again. A cream sheet says **Abrí Ajustes del iPhone** (Android / desktop: **Abrí Ajustes**). Ghost **Ahora no** dismisses. Never “activar notificaciones”.

**20:55** (America/Buenos_Aires, once per day): **Está pasando en Con pinta.** / **20 minutos.** Tap always opens `/las21` — never the home feed. If the drop is on, that is the live stage. If it is not, cream empty: **Hoy no hay Las 21.** / **Volvé mañana a las 21.** / **Ir al feed** → `/`. If the PWA or tab is alive and permission is granted, the client fires a local notification. Full server Web Push needs VAPID keys (see Env). QA hooks: `/?avisame=1` (Avisame sheet), `/?ping=1` (fire the 20:55 notification now), `/las21?drop=1` (force live).

**Avisame a las 20:55** stays on the Las 21 module. It is not the only reason to open the app — the feed is always there.

Brands tease by day: **hoy a las 21, esta.**

Prices are ARS. Brands are invented Argentine / mock TiendaNube names. Tokens: Ink `#161513`, Terracotta `#C8553D`, Cream `#EFE9DD`, Surface `#FBFAF6`. Playfair + DM Sans.

## Routes

| Route | What you see |
| --- | --- |
| `/` | Shopper home: packed catalog + three photo banners |
| `/recien` | Recién stories — new publishes only |
| `/anoche` | Lo más reenviado |
| `/marca/taller-recoleta` | Ficha de marca — name, TiendaNube count, Ir a su tienda, that brand’s pieces |
| `/las21` | Las 21. Live drop when it is on. Otherwise cream empty **Hoy no hay Las 21.** / **Volvé mañana a las 21.** / **Ir al feed**. WhatsApp OG stays “Está pasando en Con pinta. 20 minutos.” |
| `/marcas` | Brand gate if no session (**Conectá tu TiendaNube.**); merchant panel if session exists. Real OAuth if TN env is set; otherwise labeled mock. QA last-drop aviso: `?aviso=0` / `?aviso=47` |
| `/marcas/oauth` | TiendaNube authorize (env required) |
| `/marcas/elegir` | Qué publicás — live store products after OAuth, or labeled mock seed |
| `/marcas/dashboard` | Redirects to the panel home `/marcas` |
| `/terminos` | Términos — vitrina, no payments |
| `/privacidad` | Privacidad — no checkout data |
| `/que-es` | Qué es Con pinta — **Con pinta junta marcas de TiendaNube. Tocás, vas a su tienda.** Descubrí, Tocá, Compartí |
| `/faq` | FAQ — vitrina, how to buy, how to publish, Las 21 |
| `/ayuda` | Preguntas en el FAQ. Escribinos desde Contacto. — links to `/faq` and `/contacto`. No inbox on this page. |
| `/ajustes` | Minimal shopper settings. **Avisame a las 21.** toggle, then **Ayuda** → `/ayuda` and **Privacidad** → `/privacidad`. Cream `#EFE9DD`. |
| `/contacto` | Contact form — name, email, message |
| `/app/buscar` | Search brand, name, category |
| `/app/guardados` | Saved hearts — local pocket |
| `/app/coleccion` | Looks — index of curated collections |
| `/app/coleccion/compartir` | Finding share: “Lo vi en Con pinta.” |
| `/app/pieza/tapado-coppola` | Ficha Tapado Coppola |

Home first screen: **Marcas de TiendaNube. Tocás, vas a su tienda.** Recién rail opens `/recien` stories. Share starts on **every card**: “Lo vi en Con pinta.”

Shopper nav: Inicio · **Looks** · Buscar · Guardados. Looks is an index (Sastrería de agosto, Lo que lleva el look / carteras, Un solo traje / trajes). Sastrería is one card in that index — the first-cut mock, not the brand. It does not open as the Looks home.

First visit: a 3-slide sheet over the home feed — **Marcas de TiendaNube.** · **Tocás, vas a su tienda.** · **Guardá y reenviá. Lo vi en Con pinta.** Slides 1–2 **Siguiente**, slide 3 **Empezar**. **Saltar** on every slide. Once dismissed, never again. Then cookie, then PWA, then the cream **Avisame a las 21.** sheet over the blurred feed.

Empty Guardados: **Todavía no guardaste nada.** / **Tocá el corazón en una pieza. Cuando quieras, volvés acá.** CTA **Ir al feed →**. Empty Looks: **Todavía no hay looks. Volvé más tarde.** Empty Recién: **Nadie publicó todavía. Cuando una tienda publique, aparece acá.**

Generic empty: **Todavía no hay nada acá.** CTA **Ir al feed**. Failed fetch: **Algo falló. Probá de nuevo.** **Reintentar** · **Ir al inicio.** Soft offline on `/` (and Recién): **Sin conexión. Estás viendo lo guardado.** — cream/paper, does not block the feed. A product photo URL that exists but fails to load shows **No cargó la foto** + **Reintentar** (retries that image, not the page). Missing TiendaNube photos stay the cream **C** frame. No fal.

Brand panel with 0 published: **Todavía no hay nada en Con pinta.** / **Elegí al menos una pieza para aparecer en el feed.** CTA **Elegir piezas**. After the first publish (0 → N): **Listo.** / **Ya está en Con pinta.** / **Ver el feed**. Later **Listo · N publicadas** returns to the panel.

Cookie on the feed: **Usamos lo mínimo para que funcione.** + **Privacidad →** + **Entendido** (localStorage). PWA on Android/desktop (`beforeinstallprompt`): **Abrí Con pinta desde el home** / **Agregar** / **Ahora no**. iOS Safari (not standalone, not Chrome iOS): how-to sheet **Abrí Con pinta desde el home.** / **En iPhone, Safari no instala solo.** / **Tocá Compartir** · **Agregar a inicio** · **Agregar** / **Ahora no** (`curadario:pwa-ios-dismissed`). No fake install CTA. Cookie first, then the sheet, then **Avisame a las 21.** (`curadario:las21-push-dismissed`). The sheet uses own UI — the OS prompt runs only after the black CTA. iOS Notification API is standalone-PWA only, so the sheet stays hidden in Safari-in-browser. Opt-out from **Ajustes** is `curadario:las21-push-off`.

PWA `name` / `short_name`: **Con pinta**. Theme `#EFE9DD`. Home-screen icon is Elena’s italic serif **C** — terracotta `#C8553D` on cream `#EFE9DD`. No wordmark on the icon. Files in `public/`: `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` (same C, already padded), `apple-touch-icon.png` (180), `favicon-32.png`, `favicon.ico`. `public/splash-cream.png` is the iOS splash. Android splash uses manifest `background_color` `#EFE9DD`.

Ficha de marca: tap the brand name on a card → `/marca/[slug]`. **TiendaNube · N piezas en Con pinta.** **Ir a su tienda**.

Home feed uses terracotta shimmer 3:4 skeletons while Recién / Guardados hydrate. Walls are cream `#EFE9DD`. Paper `#FFFFFF` stays on buttons and search.

Chips: Todas · Ropa · Deportiva · Carteras · Accesorios · Trajes de baño · Sastrería · Calzado.

## Brand + legal

1. **`/marcas`** — No session: “Publicá tu selección. No tu tienda entera.” + **Conectá tu TiendaNube.** Primary **Continuar con TiendaNube →**. Real OAuth when `TIENDANUBE_CLIENT_ID` + `TIENDANUBE_CLIENT_SECRET` + `TIENDANUBE_REDIRECT_URI` are set. Without them, the path is labeled **Mock**. With a session: merchant cockpit — store name + **Conectada a TiendaNube** (mock label if OAuth env is unset) + **Sincronizá de nuevo.** + **Desconectá TiendaNube.** (confirm, not one tap). Disconnect POST `/marcas/desconectar` clears mock or live tokens and returns to the empty-connect screen — not the green panel. Mock resync refreshes the seed catalog. Live resync hits `/api/marcas/sync` (TiendaNube store + products). If sync fails — live TN error, or QA `?sync=fail` — the panel is not green: **No conectada / error**, title **No pudimos hablar con tu tienda.**, sub **Probá otra vez.**, primary **Sincronizá de nuevo.**, ghost **Cerrar sesión**. After a successful sync (`?sync=ok`): sheet **Listo. Tu tienda está al día.**, primary **Ver el panel**, ghost **Cerrar**. One number: **Salidas a tu tienda (7 días)** from real store-CTA clicks. Sub: “Con pinta no vende. El clic es el resultado.” Under that, **Abrieron el aviso de las 21.** is XOR for the last drop only (not lifetime): count > 0 shows the number + **Último drop · anoche** (or **hoy** if that drop already started); count 0 shows only **Todavía nadie. A las 21 se mueve.** Seeded last-drop opens until real push-open analytics exist. QA: `/marcas?aviso=0` and `/marcas?aviso=47`. **Lo que más reenviaron** is the top 3 pieces by share count in 7 days (empty if none). **Hoy a las 21: esta.** is XOR: a Las 21 card + **Cambiar** if this store has a piece in tonight’s drop; otherwise only **Esta noche no tenés pieza en el drop.** **Elegir más piezas** → `/marcas/elegir`. **Ver mi vitrina** → `/marca/[slug]`. Empty (0 publicadas): **Todavía no hay nada en Con pinta.** + **Elegir piezas**. Still no checkout. Las 21 stays one piece per store. No visitas/clics language on this screen.
2. **`/marcas/elegir`** — “Qué publicás.” **Lo que prendes entra al feed. El checkout sigue en tu TiendaNube.** Live products after OAuth; otherwise the labeled mock seed. Sticky **Listo · N publicadas** returns to the panel. First publish (0 → N) still shows **Listo.** / **Ya está en Con pinta.** / **Ver el feed**.
3. **`/marcas/dashboard`** — Redirects to the panel home `/marcas`. Click notice for mail still: **Alguien salió de Con pinta a tu ficha.**
4. **Share a finding** — `/app/pieza/[id]` and `/app/coleccion/compartir`. WhatsApp OG title: **Lo vi en Con pinta.** + the product image. Site: **Con pinta**. Las 21 live share: `/las21` — terracotta **LAS 21**, title **Está pasando en Con pinta. 20 minutos.**
5. **`/terminos`** and **`/privacidad`** — Con pinta is a **vitrina**. No payments.
6. **`/que-es`** — Qué es Con pinta. **Con pinta junta marcas de TiendaNube. Tocás, vas a su tienda.** **01 Descubrí** / **02 Tocá** / **03 Compartí**. CTAs **Ir al feed** and **Publicá tu tienda** → `/marcas`. No Curadario.
7. **`/faq`** — FAQ. Cómo publicar: Entrás con TiendaNube → elegís qué sale → a las 21 puede ir al drop. Las 21 is a **drop de 20 minutos** (21:00–21:20), one piece per store. It does not turn off the feed. Brand name is **Con pinta** — no Curadario. Más preguntas → `/contacto`. **`/ayuda`** is its own page: **Preguntas en el FAQ. Escribinos desde Contacto.** — FAQ and Contacto are links. No invented inbox and no joaco address on that page.
8. **`/contacto`** — **Marcas y el resto, acá.** Nombre, Email, Soy (Marca / Shopper), Mensaje, **Enviar**. Persists locally and sends to **joacoditoma@gmail.com** (`CONTACT_TO`, default until Con pinta has its own inbox) when a transport is set. After send: **Mensaje enviado.** + **Ir al feed →**. No invented brand mailbox.

## Env

Local `.env` — do not invent a brand inbox. See `.env.example`.

| Variable | What it does |
| --- | --- |
| `CONTACT_TO` | Destination inbox. Defaults to `joacoditoma@gmail.com` if unset. |
| `CONTACT_FROM` | Verified sender for Resend. A real mailbox you control — never an invented brand inbox. |
| `RESEND_API_KEY` | Optional. Needed to actually send `CONTACT_TO`. |
| `NEXT_PUBLIC_SITE_URL` | Public origin for OG / WhatsApp image URLs. Defaults to `http://localhost:3000`. Set to `https://conpinta.com` (or your host) so previews resolve absolute images. |
| `TIENDANUBE_CLIENT_ID` | TiendaNube app id |
| `TIENDANUBE_CLIENT_SECRET` | TiendaNube client secret |
| `TIENDANUBE_REDIRECT_URI` | Callback, e.g. `http://localhost:3000/marcas/oauth/callback` |
| `NEXT_PUBLIC_VAPID_PUBLIC_KEY` | Optional. Public VAPID key so the PWA can subscribe for server 20:55 push. Empty = local scheduler only. |
| `VAPID_PRIVATE_KEY` | Optional. Private VAPID key. Never commit a real key. Generate with `npx web-push generate-vapid-keys`. |
| `VAPID_SUBJECT` | Optional. `mailto:` contact for the VAPID sender. Defaults to `mailto:joacoditoma@gmail.com`. |

Without VAPID, **Avisame a las 21.** still asks `Notification.requestPermission`, and a granted PWA/tab can fire the 20:55 local notification (once per day). `POST /api/las21/push` is the documented server hook — it returns **501** until keys (and a subscription store) exist. Service worker click always opens `/las21` (live if the drop is on; otherwise the empty Las 21 screen, then **Ir al feed**).

Without the TiendaNube trio, `/marcas` stays the labeled mock. The form always persists in localStorage and shows **Mensaje enviado.**

404: **Esto no está en Con pinta. Volvé al feed.** Cream page, **Con pinta.** top-left, black pill **Ir al feed →** to `/`.

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
