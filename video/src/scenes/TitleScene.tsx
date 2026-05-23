import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { EditorialBackground } from "../components/EditorialBackground";
import { fadeIn, fadeUp } from "../components/motion";
import { accent, ink, inkMuted } from "../theme/anthropic";
import { serifFamily } from "../theme/fonts";

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const title = fadeUp(frame, 6, 28);
  const arcOpacity = fadeIn(frame, 0, 20);

  const arcRotation = interpolate(frame, [0, 90], [-15, 8], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <EditorialBackground />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            opacity: arcOpacity,
            marginBottom: 40,
            position: "relative",
            width: 80,
            height: 80,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: `2px solid ${accent}`,
              borderTopColor: "transparent",
              borderRightColor: "transparent",
              transform: `rotate(${arcRotation}deg)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 8,
              height: 8,
              margin: -4,
              borderRadius: "50%",
              background: accent,
            }}
          />
        </div>

        <h1
          style={{
            opacity: title.opacity,
            transform: `translateY(${title.translateY}px)`,
            fontFamily: serifFamily,
            fontSize: 96,
            fontWeight: 700,
            color: ink,
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          Boomerang
        </h1>
        <p
          style={{
            opacity: fadeIn(frame, 24, 24),
            fontFamily: serifFamily,
            fontSize: 24,
            color: inkMuted,
            marginTop: 16,
          }}
        >
          Collaborative AI agents in a shared workspace
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
