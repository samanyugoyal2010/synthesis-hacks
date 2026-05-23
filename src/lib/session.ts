const SESSION_KEY = "asl-session-id";

export function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "default";
  const existing = localStorage.getItem(SESSION_KEY);
  if (existing) return existing;
  const id = crypto.randomUUID();
  localStorage.setItem(SESSION_KEY, id);
  return id;
}

export const WEBHOOK_HINT =
  "For live ActionLayer updates, set WEBHOOK_BASE_URL to a public URL (e.g. ngrok http 3000).";

export const EXAMPLE_PROMPTS = [
  "Book a table for 2 in Brooklyn tonight under $30",
  "Find flights from NYC to London next month under $800",
  "Draft a follow-up email about our meeting yesterday",
] as const;
