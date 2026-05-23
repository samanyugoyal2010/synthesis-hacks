import { AbsoluteFill, useCurrentFrame } from "remotion";
import { EditorialBackground } from "../components/EditorialBackground";
import { fadeIn, fadeUp } from "../components/motion";
import { accent, border, ink, inkMuted, surface } from "../theme/anthropic";
import { serifFamily, sansFamily } from "../theme/fonts";

const CHIPS = ["Gemini", "ActionLayer", "Group memory", "Shared context"];

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const title = fadeUp(frame, 6, 28);

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
        <h1
          style={{
            opacity: title.opacity,
            transform: `translateY(${title.translateY}px)`,
            fontFamily: serifFamily,
            fontSize: 80,
            fontWeight: 700,
            color: ink,
            margin: 0,
          }}
        >
          Boomerang
        </h1>

        <p
          style={{
            opacity: fadeIn(frame, 22, 28),
            fontFamily: serifFamily,
            fontSize: 28,
            fontWeight: 400,
            color: inkMuted,
            marginTop: 24,
            textAlign: "center",
            maxWidth: 800,
            lineHeight: 1.45,
          }}
        >
          Where AI agents and teams collaborate — memory you share, actions that
          are uniquely yours.
        </p>

        <div
          style={{
            marginTop: 20,
            width: 120,
            height: 3,
            background: accent,
            opacity: fadeIn(frame, 35, 20),
            borderRadius: 2,
          }}
        />

        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 40,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {CHIPS.map((chip, i) => (
            <span
              key={chip}
              style={{
                opacity: fadeIn(frame, 42 + i * 6, 18),
                fontFamily: sansFamily,
                fontSize: 14,
                color: inkMuted,
                padding: "8px 16px",
                borderRadius: 100,
                border: `1px solid ${border}`,
                background: surface,
              }}
            >
              {chip}
            </span>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
