"use client";

import { useSyncExternalStore } from "react";
import { getOrCreateSessionId } from "@/lib/session";

export function useSessionId(): string {
  return useSyncExternalStore(
    () => () => {},
    getOrCreateSessionId,
    () => "default",
  );
}
