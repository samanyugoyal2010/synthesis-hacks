import { interpolate, useCurrentFrame } from "remotion";
import {
  accent,
  border,
  borderStrong,
  ink,
  inkMuted,
  inkTertiary,
  surface,
  surfaceRaised,
} from "../theme/anthropic";
import { sansFamily } from "../theme/fonts";
import { editorialEase, fadeIn } from "./motion";

type AppMockProps = {
  /** Local frame within ProductDemoScene */
  frameOffset?: number;
};

const USER_MSG =
  "Book a table for 2 in Brooklyn tonight, then draft a follow-up email.";
const ASSISTANT_MSG =
  "I'll run that through ActionLayer — searching restaurants and drafting in Gmail.";
const TASKS = [
  { label: "Find restaurants — OpenTable", status: "running" as const },
  { label: "Draft follow-up — Gmail", status: "needs_input" as const },
  { label: "Share notes — Google Docs", status: "completed" as const },
];

const statusStyle = {
  running: { color: "#2563eb", bg: "rgba(37, 99, 235, 0.08)" },
  needs_input: { color: accent, bg: "rgba(194, 82, 45, 0.12)" },
  completed: { color: "#15803d", bg: "rgba(21, 128, 61, 0.08)" },
};

export const AppMock: React.FC<AppMockProps> = ({ frameOffset = 0 }) => {
  const frame = useCurrentFrame() - frameOffset;
  const scale = interpolate(frame, [0, 420], [1, 1.03], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: editorialEase,
  });

  const showUserMsg = frame >= 30;
  const showAssistant = frame >= 90;
  const showTasks = frame >= 150;
  const highlightShared = frame >= 240;
  const task2Running = frame >= 300;

  const userOpacity = fadeIn(frame, 30, 20);
  const assistantOpacity = fadeIn(frame, 90, 20);
  const sharedOutlineOpacity = fadeIn(frame, 240, 20);

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "center center",
        width: "100%",
        maxWidth: 1400,
        margin: "0 auto",
        fontFamily: sansFamily,
        borderRadius: 12,
        border: `1px solid ${borderStrong}`,
        overflow: "hidden",
        boxShadow: "0 24px 80px rgba(26, 22, 18, 0.08)",
        background: surfaceRaised,
      }}
    >
      <header
        style={{
          padding: "20px 28px",
          borderBottom: `1px solid ${border}`,
          background: surface,
        }}
      >
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, color: ink }}>
          Boomerang
        </h1>
        <p style={{ margin: "4px 0 0", fontSize: 14, color: inkMuted }}>
          Gemini orchestrates ActionLayer web agents
        </p>
      </header>

      <div style={{ display: "flex", minHeight: 480 }}>
        <section
          style={{
            flex: 1,
            padding: 24,
            borderRight: `1px solid ${border}`,
            background: "#fff",
          }}
        >
          {showUserMsg && (
            <div
              style={{
                opacity: userOpacity,
                marginLeft: 48,
                marginBottom: 16,
                padding: "12px 16px",
                borderRadius: 10,
                background: "rgba(194, 82, 45, 0.08)",
                border: `1px solid ${border}`,
              }}
            >
              <p
                style={{
                  margin: "0 0 6px",
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: inkTertiary,
                }}
              >
                You
              </p>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: ink }}>
                {USER_MSG.slice(
                  0,
                  interpolate(frame, [30, 75], [0, USER_MSG.length], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                )}
                {frame < 75 && frame >= 30 ? "|" : ""}
              </p>
            </div>
          )}

          {showAssistant && (
            <div
              style={{
                opacity: assistantOpacity,
                marginRight: 48,
                padding: "12px 16px",
                borderRadius: 10,
                background: surface,
                border: `1px solid ${border}`,
              }}
            >
              <p
                style={{
                  margin: "0 0 6px",
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: inkTertiary,
                }}
              >
                Gemini
              </p>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: ink }}>
                {ASSISTANT_MSG}
              </p>
              {frame >= 120 && (
                <pre
                  style={{
                    marginTop: 12,
                    padding: 10,
                    fontSize: 11,
                    borderRadius: 6,
                    background: surfaceRaised,
                    color: inkMuted,
                    overflow: "hidden",
                  }}
                >
                  tool: actionlayer_run_task
                </pre>
              )}
            </div>
          )}
        </section>

        <aside
          style={{
            width: 340,
            padding: 20,
            background: surface,
            boxShadow:
              highlightShared && sharedOutlineOpacity > 0
                ? `inset 0 0 0 2px ${accent}`
                : "none",
          }}
        >
          <p
            style={{
              margin: "0 0 12px",
              fontSize: 12,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: inkTertiary,
            }}
          >
            {highlightShared ? "Shared context · Group memory" : "ActionLayer tasks"}
          </p>

          {showTasks &&
            TASKS.map((task, i) => {
              const delay = 150 + i * 20;
              const op = fadeIn(frame, delay, 18);
              let status = task.status;
              if (i === 1 && task2Running) status = "completed";

              const st = statusStyle[status];
              return (
                <div
                  key={task.label}
                  style={{
                    opacity: op,
                    marginBottom: 10,
                    padding: "12px 14px",
                    borderRadius: 8,
                    border: `1px solid ${border}`,
                    background: "#fff",
                  }}
                >
                  <p style={{ margin: 0, fontSize: 14, color: ink, fontWeight: 500 }}>
                    {task.label}
                  </p>
                  <span
                    style={{
                      display: "inline-block",
                      marginTop: 8,
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: st.color,
                      background: st.bg,
                      padding: "4px 8px",
                      borderRadius: 4,
                    }}
                  >
                    {status.replace("_", " ")}
                  </span>
                </div>
              );
            })}
        </aside>
      </div>
    </div>
  );
};
