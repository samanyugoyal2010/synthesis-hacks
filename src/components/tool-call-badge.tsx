type ToolCallBadgeProps = {
  toolType: string;
};

const TOOL_LABELS: Record<string, string> = {
  "tool-actionlayer_run_task": "Running ActionLayer task",
  "tool-actionlayer_get_task": "Checking task status",
  "tool-actionlayer_reply_to_task": "Sending task reply",
};

function getToolLabel(toolType: string): string {
  if (TOOL_LABELS[toolType]) return TOOL_LABELS[toolType];
  const name = toolType.replace(/^tool-/, "").replace(/_/g, " ");
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function ToolCallBadge({ toolType }: ToolCallBadgeProps) {
  return (
    <div className="mt-2.5 rounded-xl border border-border bg-surface px-4 py-3 flex items-center justify-between gap-3 shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
      <div>
        <p className="text-xs font-semibold text-ink">{getToolLabel(toolType)}</p>
        <p className="mt-0.5 font-mono text-[9px] text-ink-4 uppercase tracking-wider">{toolType}</p>
      </div>
      <div className="flex items-center gap-1.5 bg-white border border-border px-2 py-1 rounded-md">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
        <span className="text-[9px] font-bold text-ink-3 uppercase tracking-wider">Active</span>
      </div>
    </div>
  );
}
