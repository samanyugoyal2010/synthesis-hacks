import { AbsoluteFill, useCurrentFrame } from "remotion";
import { EditorialBackground } from "../components/EditorialBackground";
import { fadeIn, fadeUp } from "../components/motion";
import { accent, border, ink, inkMuted, surface } from "../theme/anthropic";
import { serifFamily, sansFamily } from "../theme/fonts";

export const DifferentiatorScene: React.FC = () => {
  const frame = useCurrentFrame();
  const left = fadeUp(frame, 8, 28);
  const right = fadeUp(frame, 24, 28);
  const dividerOpacity = fadeIn(frame, 20, 20);

  return (
    <AbsoluteFill>
      <EditorialBackground />
      <AbsoluteFill
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 0,
          padding: "0 100px",
        }}
      >
        <div
          style={{
            flex: 1,
            opacity: left.opacity,
            transform: `translateY(${left.translateY}px)`,
            padding: 48,
            borderRadius: 12,
            background: surface,
            border: `1px solid ${border}`,
          }}
        >
          <p
            style={{
              fontFamily: sansFamily,
              fontSize: 13,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: accent,
              margin: "0 0 16px",
            }}
          >
            Shared
          </p>
          <h2
            style={{
              fontFamily: serifFamily,
              fontSize: 48,
              fontWeight: 600,
              color: ink,
              margin: "0 0 16px",
              lineHeight: 1.2,
            }}
          >
            Group memory
          </h2>
          <p
            style={{
              fontFamily: sansFamily,
              fontSize: 18,
              lineHeight: 1.6,
              color: inkMuted,
              margin: 0,
            }}
          >
            One context for the whole team — decisions, history, and agent
            knowledge stay in sync.
          </p>
        </div>

        <div
          style={{
            width: 1,
            height: 280,
            background: border,
            opacity: dividerOpacity,
            margin: "0 24px",
          }}
        />

        <div
          style={{
            flex: 1,
            opacity: right.opacity,
            transform: `translateY(${right.translateY}px)`,
            padding: 48,
            borderRadius: 12,
            background: surface,
            border: `1px solid ${border}`,
          }}
        >
          <p
            style={{
              fontFamily: sansFamily,
              fontSize: 13,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: accent,
              margin: "0 0 16px",
            }}
          >
            Personal
          </p>
          <h2
            style={{
              fontFamily: serifFamily,
              fontSize: 48,
              fontWeight: 600,
              color: ink,
              margin: "0 0 16px",
              lineHeight: 1.2,
            }}
          >
            Your actions
          </h2>
          <p
            style={{
              fontFamily: sansFamily,
              fontSize: 18,
              lineHeight: 1.6,
              color: inkMuted,
              margin: 0,
            }}
          >
            Every run is unique to you — infinite possibilities in what you can
            create together.
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
