"use client";

import { useState } from "react";
import type { TaskRow } from "@/lib/types";
import { formatRelativeTime, getStatusBadge } from "@/lib/task-status";

type TaskCardProps = {
  task: TaskRow;
  replyDraft: string;
  replyError: string | null;
  onReplyDraftChange: (value: string) => void;
  onSendReply: () => void;
};

export function TaskCard({
  task,
  replyDraft,
  replyError,
  onReplyDraftChange,
  onSendReply,
}: TaskCardProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const badge = getStatusBadge(task.status);
  const needsInput = task.status === "needs_input";

  return (
    <li
      className={`rounded-xl border bg-white p-4 text-xs transition-shadow shadow-[0_1px_3px_rgba(0,0,0,0.02)] ${
        needsInput
          ? "border-[var(--status-needs-input)] bg-amber-50/20 shadow-[0_4px_12px_rgba(217,119,6,0.04)]"
          : "border-border"
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${badge.className}`}
        >
          {badge.label}
        </span>
        <div className="flex shrink-0 items-center gap-2 text-ink-4">
          {task.max_budget_usd != null && (
            <span className="font-semibold">${task.max_budget_usd}</span>
          )}
          <span title={task.updated_at} className="text-[10px] font-medium">{formatRelativeTime(task.updated_at)}</span>
        </div>
      </div>

      <p className="text-sm font-medium leading-snug text-ink">
        {task.goal ?? "No goal recorded"}
      </p>

      {task.external_id && (
        <div className="mt-3">
          <button
            type="button"
            onClick={() => setDetailsOpen(!detailsOpen)}
            className="text-[10px] font-bold text-ink-3 uppercase tracking-wider hover:text-ink hover:underline"
            aria-expanded={detailsOpen}
          >
            {detailsOpen ? "Hide details" : "Details"}
          </button>
          {detailsOpen && (
            <p className="mt-1.5 break-all font-mono text-[10px] text-ink-4 bg-surface p-2 rounded-lg border border-border">
              {task.external_id}
            </p>
          )}
        </div>
      )}

      {needsInput && task.pending_question && (
        <div className="mt-4 space-y-3 border-t border-border pt-4">
          <p className="text-xs font-semibold text-[var(--status-needs-input)] flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--status-needs-input)] animate-ping" />
            Action required: {task.pending_question}
          </p>
          <textarea
            value={replyDraft}
            onChange={(e) => onReplyDraftChange(e.target.value)}
            rows={2}
            placeholder="Provide response…"
            aria-label={`Reply to task: ${task.goal ?? task.id}`}
            className="w-full rounded-lg border border-border bg-white px-3 py-2 text-xs text-ink outline-none focus:border-ink/40 focus:ring-4 focus:ring-ink/5"
          />
          {replyError && (
            <p className="text-[10px] font-semibold text-red-600" role="alert">
              {replyError}
            </p>
          )}
          <button
            type="button"
            onClick={onSendReply}
            disabled={!replyDraft.trim()}
            aria-label="Send reply to task"
            className="rounded-lg bg-ink px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-ink-2 active:scale-[0.98] disabled:opacity-30"
          >
            Send response
          </button>
        </div>
      )}
    </li>
  );
}
