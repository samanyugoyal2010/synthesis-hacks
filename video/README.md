# Boomerang — Remotion launch video

~50s Anthropic-style product film for **Boomerang**: warm editorial palette, product demo mock, integrations beat, and differentiator scenes.

## Preview

```bash
cd video
npm install
npm run dev
```

Open Remotion Studio and select the **Boomerang** composition.

## Render

```bash
npm run render
```

Output: `out/boomerang.mp4` (1920×1080, 30fps, ~50s).

## Scenes

| Scene | Duration | Content |
|-------|----------|---------|
| Hook | 4s | “Where teams and AI agents share one memory.” |
| Title | 3s | Boomerang wordmark |
| Product demo | 14s | Animated chat + ActionLayer tasks UI |
| Integrations | 5s | Works with GitHub, Gmail, Google Docs, Google Slides |
| Differentiator | 8s | Group memory vs your actions |
| Stack | 6s | Gemini · ActionLayer · Shared workspace |
| Outro | 5s | CTA + chips |

## Integration logos

Icons live in `public/integrations/`. Refresh with:

```bash
bash scripts/fetch-logos.sh
```

## Customize

- Copy & timing: `src/BoomerangVideo.tsx`
- Scenes: `src/scenes/`
- Theme: `src/theme/anthropic.ts`
- UI mock: `src/components/AppMock.tsx`
