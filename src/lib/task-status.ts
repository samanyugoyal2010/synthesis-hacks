import type { TaskStatus } from "@/lib/types";

export type StatusBadgeStyle = {
  label: string;
  className: string;
};

const STATUS_STYLES: Record<TaskStatus, StatusBadgeStyle> = {
  running: {
    label: "Running",
    className:
      "bg-[var(--status-running-bg)] text-[var(--status-running)]",
  },
  needs_input: {
    label: "Needs input",
    className:
      "bg-[var(--status-needs-input-bg)] text-[var(--status-needs-input)]",
  },
  completed: {
    label: "Completed",
    className:
      "bg-[var(--status-completed-bg)] text-[var(--status-completed)]",
  },
  failed: {
    label: "Failed",
    className: "bg-[var(--status-failed-bg)] text-[var(--status-failed)]",
  },
  pending: {
    label: "Pending",
    className: "bg-[var(--status-pending-bg)] text-[var(--status-pending)]",
  },
  unknown: {
    label: "Unknown",
    className: "bg-[var(--status-pending-bg)] text-[var(--status-pending)]",
  },
};

export function getStatusBadge(status: TaskStatus): StatusBadgeStyle {
  return STATUS_STYLES[status] ?? STATUS_STYLES.unknown;
}

export function formatRelativeTime(iso: string): string {
  const date = new Date(iso);
  const now = Date.now();
  const diffMs = now - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return date.toLocaleDateString();
}
