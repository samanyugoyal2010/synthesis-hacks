type ChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isBusy: boolean;
};

export function ChatInput({ value, onChange, onSubmit, isBusy }: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !isBusy) {
        const form = e.currentTarget.form;
        if (form) {
          form.requestSubmit();
        }
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="bg-white p-4 pt-2">
      <div className="flex flex-col gap-2 rounded-xl border border-border bg-white p-2.5 transition-all focus-within:border-ink/40 focus-within:ring-4 focus-within:ring-ink/5">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message Gemini or run a task…"
          rows={2}
          disabled={isBusy}
          aria-label="Message Gemini"
          className="w-full resize-none border-0 bg-transparent px-2 py-1 text-sm text-ink placeholder:text-ink-4 outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-60"
        />
        <div className="flex items-center justify-between border-t border-border/50 pt-2 px-1">
          <span className="text-[10px] text-ink-4 font-medium">Press Enter to send, Shift+Enter for new line</span>
          <button
            type="submit"
            disabled={isBusy || !value.trim()}
            aria-label={isBusy ? "Sending message" : "Send message"}
            className="flex items-center justify-center rounded-lg bg-ink px-4 py-1.5 text-xs font-semibold text-white transition-all hover:bg-ink-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-30"
          >
            {isBusy ? (
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/70" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/70 [animation-delay:0.2s]" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/70 [animation-delay:0.4s]" />
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                Send
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

