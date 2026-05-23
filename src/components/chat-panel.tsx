import type { UIMessage } from "ai";
import { useEffect, useRef } from "react";
import { ChatInput } from "@/components/chat-input";
import { MessageList } from "@/components/message-list";

type ChatPanelProps = {
  messages: UIMessage[];
  error: Error | undefined;
  status: string;
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isBusy: boolean;
};

export function ChatPanel({
  messages,
  error,
  status,
  input,
  onInputChange,
  onSubmit,
  isBusy,
}: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isStreaming = status === "streaming";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status, error]);

  return (
    <section className="flex min-h-[60vh] flex-col overflow-hidden rounded-xl border border-border-strong bg-white shadow-[0_24px_80px_rgba(26,22,18,0.06)] lg:min-h-[70vh]">
      <MessageList
        messages={messages}
        error={error}
        isStreaming={isStreaming}
        onSelectPrompt={onInputChange}
        scrollRef={scrollRef}
        bottomRef={bottomRef}
      />
      <ChatInput
        value={input}
        onChange={onInputChange}
        onSubmit={onSubmit}
        isBusy={isBusy}
      />
    </section>
  );
}
