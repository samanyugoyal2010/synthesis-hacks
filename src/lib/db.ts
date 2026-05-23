import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { getDatabasePath } from "./env";
import type { TaskRow } from "./types";

export type { TaskRow, TaskStatus } from "./types";

export type TaskEventRow = {
  id: number;
  task_id: string;
  event_type: string;
  payload: string;
  created_at: string;
};

let db: Database.Database | null = null;

function resolveDbFile(): string {
  const raw = getDatabasePath();
  if (path.isAbsolute(raw)) return raw;
  return path.join(/* turbopackIgnore: true */ process.cwd(), raw);
}

export function getDb(): Database.Database {
  if (db) return db;

  const file = resolveDbFile();
  fs.mkdirSync(path.dirname(file), { recursive: true });

  db = new Database(file);
  db.pragma("journal_mode = WAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      session_id TEXT NOT NULL,
      external_id TEXT,
      goal TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      max_budget_usd REAL,
      pending_question TEXT,
      last_payload TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (session_id) REFERENCES sessions(id)
    );

    CREATE TABLE IF NOT EXISTS task_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task_id TEXT NOT NULL,
      event_type TEXT NOT NULL,
      payload TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (task_id) REFERENCES tasks(id)
    );

    CREATE INDEX IF NOT EXISTS idx_tasks_session ON tasks(session_id);
    CREATE INDEX IF NOT EXISTS idx_events_task ON task_events(task_id);
  `);

  return db;
}

export function ensureSession(sessionId: string): void {
  const database = getDb();
  database
    .prepare("INSERT OR IGNORE INTO sessions (id) VALUES (?)")
    .run(sessionId);
}

export function listTasksBySession(sessionId: string): TaskRow[] {
  return getDb()
    .prepare(
      `SELECT * FROM tasks WHERE session_id = ? ORDER BY created_at DESC`,
    )
    .all(sessionId) as TaskRow[];
}

export function getTask(id: string): TaskRow | undefined {
  return getDb().prepare(`SELECT * FROM tasks WHERE id = ?`).get(id) as
    | TaskRow
    | undefined;
}

export function getTaskByExternalId(externalId: string): TaskRow | undefined {
  return getDb()
    .prepare(`SELECT * FROM tasks WHERE external_id = ?`)
    .get(externalId) as TaskRow | undefined;
}

export function createTask(input: {
  id: string;
  sessionId: string;
  externalId?: string | null;
  goal?: string | null;
  maxBudgetUsd?: number | null;
}): TaskRow {
  ensureSession(input.sessionId);
  getDb()
    .prepare(
      `INSERT INTO tasks (id, session_id, external_id, goal, status, max_budget_usd)
       VALUES (@id, @sessionId, @externalId, @goal, 'pending', @maxBudgetUsd)`,
    )
    .run({
      id: input.id,
      sessionId: input.sessionId,
      externalId: input.externalId ?? null,
      goal: input.goal ?? null,
      maxBudgetUsd: input.maxBudgetUsd ?? null,
    });
  return getTask(input.id)!;
}

export function updateTask(
  id: string,
  patch: Partial<
    Pick<
      TaskRow,
      | "external_id"
      | "goal"
      | "status"
      | "max_budget_usd"
      | "pending_question"
      | "last_payload"
    >
  >,
): void {
  const fields: string[] = [];
  const params: Record<string, unknown> = { id };

  for (const [key, value] of Object.entries(patch)) {
    if (value !== undefined) {
      fields.push(`${key} = @${key}`);
      params[key] = value;
    }
  }

  if (fields.length === 0) return;

  fields.push(`updated_at = datetime('now')`);
  getDb()
    .prepare(`UPDATE tasks SET ${fields.join(", ")} WHERE id = @id`)
    .run(params);
}

export function addTaskEvent(
  taskId: string,
  eventType: string,
  payload: unknown,
): void {
  getDb()
    .prepare(
      `INSERT INTO task_events (task_id, event_type, payload) VALUES (?, ?, ?)`,
    )
    .run(taskId, eventType, JSON.stringify(payload));
}

export function listTaskEvents(taskId: string): TaskEventRow[] {
  return getDb()
    .prepare(
      `SELECT * FROM task_events WHERE task_id = ? ORDER BY created_at ASC`,
    )
    .all(taskId) as TaskEventRow[];
}

export function getTaskContextForSession(sessionId: string): string {
  const tasks = listTasksBySession(sessionId);
  if (tasks.length === 0) {
    return "No ActionLayer tasks yet for this session.";
  }

  return tasks
    .map((t) => {
      const parts = [
        `- task_id=${t.id}`,
        t.external_id ? `external_id=${t.external_id}` : null,
        `status=${t.status}`,
        t.goal ? `goal=${t.goal}` : null,
        t.pending_question
          ? `NEEDS_INPUT: ${t.pending_question}`
          : null,
      ].filter(Boolean);
      return parts.join(" | ");
    })
    .join("\n");
}
