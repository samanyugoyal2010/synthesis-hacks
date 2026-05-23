export type TaskStatus =
  | "pending"
  | "running"
  | "needs_input"
  | "completed"
  | "failed"
  | "unknown";

export type TaskRow = {
  id: string;
  session_id: string;
  external_id: string | null;
  goal: string | null;
  status: TaskStatus;
  max_budget_usd: number | null;
  pending_question: string | null;
  last_payload: string | null;
  created_at: string;
  updated_at: string;
};
