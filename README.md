# ActionLayer Command

Web platform where **Gemini** orchestrates **ActionLayer** web agents via MCP.

## Prerequisites

- Node.js 18+
- [uv](https://docs.astral.sh/uv/) (`uvx` for `actionlayer-mcp`)
- Optional: Python `actionlayer-sdk` for CLI verification

## Setup

1. Copy environment variables:

```bash
cp .env.example .env
# Add your GEMINI_API_KEY and ACTIONLAYER_API_KEY
```

2. Install and run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY` | Google AI / Gemini API key |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Same key (AI SDK alias) |
| `ACTIONLAYER_API_KEY` | ActionLayer API key |
| `ACTIONLAYER_API_URL` | Default `https://api.actionlayer.io` |
| `WEBHOOK_BASE_URL` | Public base URL for webhooks (use ngrok in dev) |
| `DATABASE_URL` | SQLite path, default `file:./data/app.db` |
| `AL_MAX_BUDGET_USD` | Max budget cap for tasks (default 25) |

## Webhooks (important)

ActionLayer sends progress to `{WEBHOOK_BASE_URL}/api/webhooks/actionlayer`.

For real tasks in development:

```bash
ngrok http 3000
# Set WEBHOOK_BASE_URL=https://YOUR-ID.ngrok-free.app in .env
```

Restart `npm run dev` after changing `.env`.

## Verify ActionLayer

```bash
pip install actionlayer-sdk
export ACTIONLAYER_API_KEY=your_key
export ACTIONLAYER_API_URL=https://api.actionlayer.io
python -c "from actionlayer_sdk import ActionLayerSyncClient as C; print(C().list_actions().count, 'actions')"
```

MCP (used by this app):

```bash
export ACTIONLAYER_API_KEY=your_key
export ACTIONLAYER_API_URL=https://api.actionlayer.io
uvx actionlayer-mcp
```

## Architecture

- **Chat** (`/api/chat`) — Gemini + ActionLayer MCP tools (`uvx actionlayer-mcp`)
- **Webhooks** (`/api/webhooks/actionlayer`) — task status updates
- **Tasks** (`/api/tasks`) — poll task board per session
- **Reply** (`/api/tasks/[id]/reply`) — answer ActionLayer clarification questions
