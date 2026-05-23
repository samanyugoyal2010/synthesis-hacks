"use client";

import { useState } from "react";
import { WEBHOOK_HINT } from "@/lib/session";

type SessionInfoProps = {
  sessionId: string;
};

export function SessionInfo({ sessionId }: SessionInfoProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-white text-xs shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3 text-left font-bold uppercase tracking-wider text-ink-3 transition-colors hover:text-ink"
        aria-expanded={open}
      >
        Session details
        <span className="text-ink-4 transition-transform duration-200" aria-hidden="true">
          {open ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          )}
        </span>
      </button>

      {open && (
        <div className="space-y-3 border-t border-border/50 px-4 py-3.5">
          <div>
            <p className="mb-1 font-semibold text-ink-3 uppercase text-[9px] tracking-wider">Session ID</p>
            <p className="break-all font-mono text-[10px] text-ink-4 bg-surface p-2 rounded-lg border border-border">
              {sessionId}
            </p>
          </div>
          <div>
            <p className="mb-1 font-semibold text-ink-3 uppercase text-[9px] tracking-wider">Webhook setup</p>
            <p className="text-[10px] leading-relaxed text-ink-4">
              {WEBHOOK_HINT}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
