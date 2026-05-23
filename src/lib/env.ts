function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export function getGeminiApiKey(): string {
  return (
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ??
    process.env.GEMINI_API_KEY ??
    requireEnv("GEMINI_API_KEY")
  );
}

export function getActionLayerApiKey(): string {
  return requireEnv("ACTIONLAYER_API_KEY");
}

export function getActionLayerApiUrl(): string {
  return process.env.ACTIONLAYER_API_URL ?? "https://api.actionlayer.io";
}

export function getWebhookBaseUrl(): string {
  return (
    process.env.WEBHOOK_BASE_URL?.replace(/\/$/, "") ?? "http://localhost:3000"
  );
}

export function getWebhookUrl(): string {
  return `${getWebhookBaseUrl()}/api/webhooks/actionlayer`;
}

export function getMaxBudgetUsd(): number {
  const raw = process.env.AL_MAX_BUDGET_USD ?? "25";
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : 25;
}

export function getDatabasePath(): string {
  const url = process.env.DATABASE_URL ?? "file:./data/app.db";
  if (url.startsWith("file:")) {
    const relative = url.replace(/^file:/, "").replace(/^\.\//, "");
    return relative || "data/app.db";
  }
  return "data/app.db";
}
