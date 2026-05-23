import { randomUUID } from "node:crypto";
import {
  addTaskEvent,
  createTask,
  getTask,
  getTaskByExternalId,
  updateTask,
  type TaskStatus,
} from "@/lib/db";

type WebhookPayload = Record<string, unknown>;

function pickString(obj: WebhookPayload, keys: string[]): string | null {
  for (const key of keys) {
    const value = obj[key];
    if (typeof value === "string" && value.length > 0) return value;
  }
  return null;
}

function inferStatus(payload: WebhookPayload): TaskStatus {
  const explicit = pickString(payload, ["status", "state", "event", "type"]);
  const normalized = explicit?.toLowerCase() ?? "";

  if (
    normalized.includes("needs_input") ||
    normalized.includes("need_input") ||
    normalized.includes("question")
  ) {
    return "needs_input";
  }
  if (normalized.includes("complete") || normalized.includes("success")) {
    return "completed";
  }
  if (normalized.includes("fail") || normalized.includes("error")) {
    return "failed";
  }
  if (normalized.includes("progress") || normalized.includes("running")) {
    return "running";
  }

  return "running";
}

function extractQuestion(payload: WebhookPayload): string | null {
  return pickString(payload, [
    "question",
    "prompt",
    "message",
    "clarification",
    "needs_input_message",
  ]);
}

export async function POST(req: Request) {
  let payload: WebhookPayload;

  try {
    payload = (await req.json()) as WebhookPayload;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const externalId = pickString(payload, [
    "task_id",
    "ticket_id",
    "id",
    "external_id",
  ]);
  const sessionId =
    pickString(payload, ["session_id", "sessionId"]) ?? "default";
  const eventType =
    pickString(payload, ["event", "type", "status"]) ?? "webhook";
  const goal = pickString(payload, ["goal", "objective"]);
  const status = inferStatus(payload);
  const question = extractQuestion(payload);

  let task =
    (externalId ? getTaskByExternalId(externalId) : undefined) ??
    (typeof payload.local_task_id === "string"
      ? getTask(payload.local_task_id)
      : undefined);

  if (!task) {
    const id = randomUUID();
    task = createTask({
      id,
      sessionId,
      externalId,
      goal,
    });
  } else if (externalId && !task.external_id) {
    updateTask(task.id, { external_id: externalId });
  }

  updateTask(task.id, {
    status,
    goal: goal ?? task.goal ?? undefined,
    pending_question: status === "needs_input" ? question : null,
    last_payload: JSON.stringify(payload),
  });

  addTaskEvent(task.id, eventType, payload);

  return Response.json({ ok: true, taskId: task.id });
}

export async function GET() {
  return Response.json({ ok: true, endpoint: "actionlayer-webhook" });
}
