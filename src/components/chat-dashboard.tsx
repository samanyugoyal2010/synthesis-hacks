"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { TaskRow } from "@/lib/types";

const SESSION_KEY = "asl-session-id";

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "default";
  const existing = localStorage.getItem(SESSION_KEY);
  if (existing) return existing;
  const id = crypto.randomUUID();
  localStorage.setItem(SESSION_KEY, id);
  return id;
}

function statusColor(status: string): string {
  switch (status) {
    case "completed":
      return "text-emerald-400";
    case "failed":
      return "text-red-400";
    case "needs_input":
      return "text-amber-400";
    case "running":
      return "text-sky-400";
    default:
      return "text-zinc-400";
  }
}

export function ChatDashboard() {
  const [sessionId, setSessionId] = useState("default");
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<TaskRow[]>([]);
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [tasksError, setTasksError] = useState<string | null>(null);

  useEffect(() => {
    setSessionId(getOrCreateSessionId());
  }, []);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: { sessionId },
      }),
    [sessionId],
  );

  const { messages, status, error, sendMessage } = useChat({ transport });

  const refreshTasks = useCallback(async () => {
    try {
      const res = await fetch(`/api/tasks?sessionId=${sessionId}`);
      if (!res.ok) throw new Error("Failed to load tasks");
      const data = (await res.json()) as { tasks: TaskRow[] };
      setTasks(data.tasks);
      setTasksError(null);
    } catch (e) {
      setTasksError(e instanceof Error ? e.message : "Task load failed");
    }
  }, [sessionId]);

  useEffect(() => {
    if (sessionId === "default") return;
    refreshTasks();
    const interval = setInterval(refreshTasks, 2500);
    return () => clearInterval(interval);
  }, [sessionId, refreshTasks, status]);

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

    const res = await fetch(`/api/tasks/${taskId}/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data.error ?? "Reply failed");
      return;
    }

    setReplyDrafts((prev) => ({ ...prev, [taskId]: "" }));
    await refreshTasks();
  };

  const webhookHint = useMemo(
    () =>
      "For live ActionLayer updates, set WEBHOOK_BASE_URL to a public URL (e.g. ngrok http 3000).",
    [],
  );

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800 px-6 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              ActionLayer Command
            </h1>
            <p className="text-sm text-zinc-400">
              Gemini orchestrates ActionLayer web agents
            </p>
          </div>
          <p className="max-w-md text-xs text-zinc-500">{webhookHint}</p>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-7xl flex-1 gap-4 px-4 py-4 lg:grid-cols-[1fr_360px]">
        <section className="flex min-h-[70vh] flex-col rounded-xl border border-zinc-800 bg-zinc-900/50">
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.length === 0 && (
              <p className="text-sm text-zinc-500">
                Ask Gemini to run a real-world web task — e.g. &quot;Book a
                table for 2 in Brooklyn tonight under $30&quot;.
              </p>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`rounded-lg px-3 py-2 text-sm ${
                  message.role === "user"
                    ? "ml-8 bg-indigo-600/20 text-indigo-100"
                    : "mr-8 bg-zinc-800/80"
                }`}
              >
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-zinc-500">
                  {message.role}
                </p>
                {message.parts.map((part, index) => {
                  if (part.type === "text") {
                    return (
                      <p key={index} className="whitespace-pre-wrap">
                        {part.text}
                      </p>
                    );
                  }
                  if (part.type.startsWith("tool-")) {
                    return (
                      <pre
                        key={index}
                        className="mt-2 overflow-x-auto rounded bg-zinc-950/60 p-2 text-xs text-zinc-400"
                      >
                        {part.type}
                      </pre>
                    );
                  }
                  return null;
                })}
              </div>
            ))}

            {error && (
              <p className="rounded-lg bg-red-950/50 p-3 text-sm text-red-300">
                {error.message}
              </p>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-zinc-800 p-4"
          >
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message Gemini…"
                rows={2}
                disabled={isBusy}
                className="flex-1 resize-none rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                disabled={isBusy || !input.trim()}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium disabled:opacity-40"
              >
                {isBusy ? "…" : "Send"}
              </button>
            </div>
          </form>
        </section>

        <aside className="flex flex-col gap-3">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
            <h2 className="mb-3 text-sm font-semibold">Web agent tasks</h2>
            {tasksError && (
              <p className="mb-2 text-xs text-red-400">{tasksError}</p>
            )}
            {tasks.length === 0 ? (
              <p className="text-xs text-zinc-500">No tasks yet.</p>
            ) : (
              <ul className="space-y-3">
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-3 text-xs"
                  >
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <span
                        className={`font-medium uppercase ${statusColor(task.status)}`}
                      >
                        {task.status}
                      </span>
                      {task.max_budget_usd != null && (
                        <span className="text-zinc-500">
                          ${task.max_budget_usd}
                        </span>
                      )}
                    </div>
                    <p className="text-zinc-300">
                      {task.goal ?? "No goal recorded"}
                    </p>
                    {task.external_id && (
                      <p className="mt-1 truncate text-zinc-600">
                        id: {task.external_id}
                      </p>
                    )}

                    {task.status === "needs_input" && task.pending_question && (
                      <div className="mt-2 space-y-2">
                        <p className="text-amber-300">{task.pending_question}</p>
                        <textarea
                          value={replyDrafts[task.id] ?? ""}
                          onChange={(e) =>
                            setReplyDrafts((prev) => ({
                              ...prev,
                              [task.id]: e.target.value,
                            }))
                          }
                          rows={2}
                          placeholder="Your answer…"
                          className="w-full rounded border border-zinc-700 bg-zinc-900 px-2 py-1 text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => sendReply(task.id)}
                          className="rounded bg-amber-600/80 px-2 py-1 text-xs font-medium"
                        >
                          Send reply
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-3 text-xs text-zinc-500">
            <p className="font-medium text-zinc-400">Session</p>
            <p className="mt-1 break-all font-mono">{sessionId}</p>
          </div>
        </aside>
      </main>
    </div>
  );
}
