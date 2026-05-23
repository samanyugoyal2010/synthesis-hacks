# HolmesLanding Specification

## Overview

- **Target file:** `src/components/holmes/holmes-landing.tsx`
- **Interaction model:** mixed — Lenis global scroll; click-driven carousel, pipeline tabs, FAQ, pricing toggle.

## DOM Structure

Root wrapper → `LenisProvider` → fixed `HolmesHeader` + `main` (Hero, MacSection, Intelligence, Pipeline, Slash, Capabilities, Pricing, FAQ) + `HolmesFooter`.

## Design tokens (Framer `:root` body)

- Background: `#0a0a0a` (`--token-5f5e41aa…`)
- Muted text: `#858585`
- Accent lime: `#e8ff9c` (`--token-6da9d50d…`)
- Download CTA pink: `rgb(219, 160, 160)` from extracted nav button token

## Fonts

- **Headings:** Host Grotesk (`next/font` Host_Grotesk), letter-spacing ~-0.03em.
- **Body / UI:** DM Sans (`next/font` DM_Sans).

## Assets

Downloaded to `public/images/holmes/` via `scripts/download-holmes-assets.mjs`; favicon at `public/seo/favicon.jpg`.

## States & Behaviors

### Lenis

- **Trigger:** page load.
- **Implementation:** `Lenis` with `autoRaf: true`; `document.documentElement` classes `lenis lenis-smooth`.

### FAQ

- **Trigger:** click row.
- **State A/B:** collapsed vs expanded answer text.

## Known gaps

- Full `getComputedStyle()` pass and full-page screenshots not captured (no browser MCP).
- FAQ answers not present in SSR HTML; copy is product-consistent placeholder text except where noted in `holmes-content.ts`.
- Pipeline steps after “Observe” use inferred descriptions.
