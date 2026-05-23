import type { UIMessage } from "ai";
import { EXAMPLE_PROMPTS } from "@/lib/session";
import { MessageBubble } from "@/components/message-bubble";

type MessageListProps = {
  messages: UIMessage[];
  error: Error | undefined;
  isStreaming: boolean;
  onSelectPrompt: (prompt: string) => void;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  bottomRef: React.RefObject<HTMLDivElement | null>;
};

function TypingIndicator() {
  return (
    <div
      className="mr-8 rounded-[10px] border border-border bg-surface px-4 py-3"
      aria-label="Gemini is typing"
    >
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-tertiary">
        Gemini
      </p>
      <div className="flex items-center gap-1">
        <span className="typing-dot inline-block h-1.5 w-1.5 rounded-full bg-ink-tertiary" />
        <span className="typing-dot inline-block h-1.5 w-1.5 rounded-full bg-ink-tertiary" />
        <span className="typing-dot inline-block h-1.5 w-1.5 rounded-full bg-ink-tertiary" />
      </div>
    </div>
  );
}

export function MessageList({
  messages,
  error,
  isStreaming,
  onSelectPrompt,
  scrollRef,
  bottomRef,
}: MessageListProps) {
  return (
    <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
      {messages.length === 0 && (
        <div className="space-y-4 py-4">
          <p className="text-sm text-ink-muted">
            Ask Gemini to run a real-world web task. Try one of these:
          </p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => onSelectPrompt(prompt)}
                className="rounded-full border border-border-strong bg-white px-3 py-1.5 text-left text-sm text-ink transition-colors hover:border-accent/40 hover:bg-accent-muted"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {isStreaming && <TypingIndicator />}

      {error && (
        <p
          className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800"
          role="alert"
        >
          {error.message}
        </p>
      )}

      <div ref={bottomRef} aria-hidden="true" />
    </div>
  );
}
