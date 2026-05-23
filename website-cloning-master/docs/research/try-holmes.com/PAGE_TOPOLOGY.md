# try-holmes.com — page topology

Source: SSR HTML + Framer CSS tokens (browser MCP unavailable in this session).

## Layout

- Root: dark background `#0a0a0a`, full-width column, max content width ~1080–1184px.
- **Header:** fixed top, high z-index, blurred panel with logo, inline nav (About, Features, Pricing, FAQ), Download CTA (pink accent).
- **Main:** vertical stack of sections; no persistent sidebar.

## Sections (top → bottom)

1. **Hero** — full-viewport background image, kicker “Holmes – Autonomous Desktop”, headline, “See it in action” CTA.
2. **About / Mac** (`#about`) — repeated headline, three alternating image+text rows (Context Menu, Command Bar, holmes!).
3. **Intelligence** (`#features`) — kicker “How it works”, H2 “Intelligence that acts…”, horizontal card carousel, “Get started” per card.
4. **Pipeline** — image + pill tabs (Observe / Understand / Execute / Report) with copy for active step (Observe copy verified from site).
5. **Slash commands** — background image, three command cards (`/run`, `/search`, `/remind`).
6. **Capabilities** — large image + stacked feature list.
7. **Pricing** (`#pricing`) — Monthly/Yearly toggle, “beta pricing!”, three tiers (Pro / Free / Max).
8. **FAQ** (`#faq`) — accordion.
9. **Footer** (`#waitlist`) — “holmes beta.v1”, Waitlist CTA.

## Breakpoints (Framer)

- Desktop: ≥1200px  
- Tablet: 810–1199px  
- Mobile: ≤809px  

## Global behaviors

- **Lenis:** `html.lenis`, `.lenis.lenis-smooth` present in Framer CSS — smooth scroll wrapper.
