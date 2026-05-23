import { AbsoluteFill, useCurrentFrame } from "remotion";
import { EditorialBackground } from "../components/EditorialBackground";
import { fadeIn, fadeUp } from "../components/motion";
import { accent, border, ink, inkMuted, surface } from "../theme/anthropic";
import { sansFamily, serifFamily } from "../theme/fonts";

const CHIPS = ["Gemini", "ActionLayer", "Shared workspace"];

export const StackScene: React.FC = () => {
  const frame = useCurrentFrame();
  const header = fadeUp(frame, 4, 24);

  return (
    <AbsoluteFill>
      <EditorialBackground />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "0 120px",
        }}
      >
        <h2
          style={{
            opacity: header.opacity,
            transform: `translateY(${header.translateY}px)`,
            fontFamily: serifFamily,
            fontSize: 52,
            fontWeight: 600,
            color: ink,
            margin: "0 0 40px",
            textAlign: "center",
          }}
        >
          Built on the stack you trust
        </h2>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          {CHIPS.map((chip, i) => (
            <span
              key={chip}
              style={{
                opacity: fadeIn(frame, 28 + i * 10, 20),
                fontFamily: sansFamily,
                fontSize: 20,
                fontWeight: 500,
                color: ink,
                padding: "14px 28px",
                borderRadius: 100,
                border: `1px solid ${border}`,
                background: surface,
              }}
            >
              {chip}
            </span>
          ))}
        </div>

        <p
          style={{
            opacity: fadeIn(frame, 55, 24),
            fontFamily: sansFamily,
            fontSize: 18,
            color: inkMuted,
            marginTop: 40,
            textAlign: "center",
            maxWidth: 560,
          }}
        >
          The first approach to AI agents collaborating in your environment —
          with memory you share.
        </p>

        <div
          style={{
            marginTop: 32,
            width: 48,
            height: 3,
            background: accent,
            opacity: fadeIn(frame, 65, 20),
            borderRadius: 2,
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
