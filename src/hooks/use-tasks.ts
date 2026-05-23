"use client";

import { useCallback, useEffect, useState } from "react";
import type { TaskRow } from "@/lib/types";

export function useTasks(sessionId: string, pollTrigger?: unknown) {
  const [tasks, setTasks] = useState<TaskRow[]>([]);
  const [tasksError, setTasksError] = useState<string | null>(null);
  const [taskCountPulse, setTaskCountPulse] = useState(false);

  const refreshTasks = useCallback(async () => {
    try {
      const res = await fetch(`/api/tasks?sessionId=${sessionId}`);
      if (!res.ok) throw new Error("Failed to load tasks");
      const data = (await res.json()) as { tasks: TaskRow[] };
      setTasks((prev) => {
        if (prev.length !== data.tasks.length) {
          setTaskCountPulse(true);
          setTimeout(() => setTaskCountPulse(false), 600);
        }
        return data.tasks;
      });
      setTasksError(null);
    } catch (e) {
      setTasksError(e instanceof Error ? e.message : "Task load failed");
    }
  }, [sessionId]);

  useEffect(() => {
    if (sessionId === "default") return;
    const timeoutId = window.setTimeout(() => {
      void refreshTasks();
    }, 0);
    const interval = window.setInterval(() => {
      void refreshTasks();
    }, 2500);
    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(interval);
    };
  }, [sessionId, refreshTasks, pollTrigger]);

  return { tasks, tasksError, refreshTasks, taskCountPulse };
}
