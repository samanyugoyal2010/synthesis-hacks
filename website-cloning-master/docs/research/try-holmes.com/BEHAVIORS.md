# try-holmes.com — behaviors (inferred)

> **Note:** No browser automation MCP was available during extraction. Items below combine Framer SSR markup hints and static CSS; a live pass is required for pixel-perfect motion specs.

## Scroll

- **Lenis-style smooth scroll** — Framer ships `html.lenis` / `.lenis.lenis-smooth` rules; clone uses the `lenis` package with matching root classes.
- **Scroll-driven reveals** — FAQ and other blocks include `data-nce-scroll` / `translateY(40px)` style hints in SSR (likely scroll-in animations). Not fully replicated; optional enhancement: IntersectionObserver + CSS transitions.

## Click / hover

- **Header nav** — anchor links to `#about`, `#features`, `#pricing`, `#faq`.
- **Download / Waitlist** — primary CTAs (external join flow not implemented; links point to canonical site where appropriate).
- **Intelligence carousel** — horizontal scroll with prev/next buttons (click-driven).
- **Pipeline** — pill buttons switch active step and body copy (click-driven).
- **Pricing** — Monthly/Yearly toggle (UI state only; prices match static marketing copy).
- **FAQ** — accordion expand/collapse.

## Responsive

- Nav collapses on small viewports on the original Framer site; clone keeps a simplified header (nav hidden below `md` could be added later).
