import type { TaskRow } from "@/lib/types";
import { SessionInfo } from "@/components/session-info";
import { TaskCard } from "@/components/task-card";

type TaskPanelProps = {
  tasks: TaskRow[];
  tasksError: string | null;
  taskCountPulse: boolean;
  sessionId: string;
  replyDrafts: Record<string, string>;
  replyErrors: Record<string, string>;
  onReplyDraftChange: (taskId: string, value: string) => void;
  onSendReply: (taskId: string) => void;
  id?: string;
  className?: string;
};

export function TaskPanel({
  tasks,
  tasksError,
  taskCountPulse,
  sessionId,
  replyDrafts,
  replyErrors,
  onReplyDraftChange,
  onSendReply,
  id = "task-panel",
  className = "",
}: TaskPanelProps) {
  return (
    <aside
      id={id}
      className={`flex flex-col gap-3 ${className}`}
    >
      <div className="rounded-xl border border-border bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <div className="mb-4 flex items-center justify-between gap-2 border-b border-border/50 pb-3">
          <h2 className="text-xs font-bold text-ink uppercase tracking-wider">Boomerang Tasks</h2>
          {tasks.length > 0 && (
            <span
              className={`inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-ink px-1.5 py-0.5 text-[10px] font-bold text-white ${
                taskCountPulse ? "task-count-pulse" : ""
              }`}
            >
              {tasks.length}
            </span>
          )}
        </div>

        {tasksError && (
          <p className="mb-2 text-xs text-red-700" role="alert">
            {tasksError}
          </p>
        )}

        {tasks.length === 0 ? (
          <p className="text-xs text-ink-muted">No tasks yet.</p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                replyDraft={replyDrafts[task.id] ?? ""}
                replyError={replyErrors[task.id] ?? null}
                onReplyDraftChange={(value) =>
                  onReplyDraftChange(task.id, value)
                }
                onSendReply={() => onSendReply(task.id)}
              />
            ))}
          </ul>
        )}
      </div>

      <SessionInfo sessionId={sessionId} />
    </aside>
  );
}
