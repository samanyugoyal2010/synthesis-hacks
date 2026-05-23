"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { ChatPanel } from "@/components/chat-panel";
import { TaskPanel } from "@/components/task-panel";
import { useSessionId } from "@/hooks/use-session-id";
import { useTasks } from "@/hooks/use-tasks";

export function ChatDashboard() {
  const sessionId = useSessionId();
  const [input, setInput] = useState("");
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [replyErrors, setReplyErrors] = useState<Record<string, string>>({});
  const [mobileTasksOpen, setMobileTasksOpen] = useState(false);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: { sessionId },
      }),
    [sessionId],
  );

  const { messages, status, error, sendMessage } = useChat({ transport });
  const { tasks, tasksError, refreshTasks, taskCountPulse } = useTasks(
    sessionId,
    status,
  );

  const isBusy = status === "streaming" || status === "submitted";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isBusy) return;
    sendMessage({ text });
    setInput("");
  };

  const sendReply = async (taskId: string) => {
    const answer = replyDrafts[taskId]?.trim();
    if (!answer) return;

    setReplyErrors((prev) => {
      const next = { ...prev };
      delete next[taskId];
      return next;
    });

    const res = await fetch(`/api/tasks/${taskId}/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setReplyErrors((prev) => ({
        ...prev,
        [taskId]: (data.error as string) ?? "Reply failed",
      }));
      return;
    }

    setReplyDrafts((prev) => ({ ...prev, [taskId]: "" }));
    await refreshTasks();
  };

  const handleReplyDraftChange = (taskId: string, value: string) => {
    setReplyDrafts((prev) => ({ ...prev, [taskId]: value }));
    if (replyErrors[taskId]) {
      setReplyErrors((prev) => {
        const next = { ...prev };
        delete next[taskId];
        return next;
      });
    }
  };

  return (
    <AppShell
      taskCount={tasks.length}
      mobileTasksOpen={mobileTasksOpen}
      onToggleMobileTasks={() => setMobileTasksOpen((open) => !open)}
    >
      <ChatPanel
        messages={messages}
        error={error}
        status={status}
        input={input}
        onInputChange={setInput}
        onSubmit={handleSubmit}
        isBusy={isBusy}
      />

      <TaskPanel
        tasks={tasks}
        tasksError={tasksError}
        taskCountPulse={taskCountPulse}
        sessionId={sessionId}
        replyDrafts={replyDrafts}
        replyErrors={replyErrors}
        onReplyDraftChange={handleReplyDraftChange}
        onSendReply={sendReply}
        className={`${mobileTasksOpen ? "flex" : "hidden"} lg:flex`}
      />
    </AppShell>
  );
}
