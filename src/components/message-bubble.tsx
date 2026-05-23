import type { UIMessage } from "ai";
import { ToolCallBadge } from "@/components/tool-call-badge";

type MessageBubbleProps = {
  message: UIMessage;
};

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
      <span className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-ink-3 px-2">
        {isUser ? "You" : "Boomerang Agent"}
      </span>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed shadow-[0_1px_2px_rgba(0,0,0,0.02)] ${
          isUser
            ? "bg-ink text-white rounded-tr-none"
            : "bg-surface border border-border text-ink rounded-tl-none"
        }`}
      >
        {message.parts.map((part, index) => {
          if (part.type === "text") {
            return (
              <p key={index} className="whitespace-pre-wrap font-sans">
                {part.text}
              </p>
            );
          }
          if (part.type.startsWith("tool-")) {
            return (
              <div key={index} className="mt-2">
                <ToolCallBadge toolType={part.type} />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

