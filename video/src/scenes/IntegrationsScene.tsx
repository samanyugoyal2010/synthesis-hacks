import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { EditorialBackground } from "../components/EditorialBackground";
import { fadeIn, fadeUp, editorialEase } from "../components/motion";
import { INTEGRATIONS } from "../data/integrations";
import {
  accent,
  border,
  ink,
  inkMuted,
  surface,
} from "../theme/anthropic";
import { sansFamily, serifFamily } from "../theme/fonts";

export const IntegrationsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const headline = fadeUp(frame, 4, 24);

  return (
    <AbsoluteFill>
      <EditorialBackground />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "0 80px",
        }}
      >
        <h2
          style={{
            opacity: headline.opacity,
            transform: `translateY(${headline.translateY}px)`,
            fontFamily: serifFamily,
            fontSize: 56,
            fontWeight: 600,
            color: ink,
            margin: "0 0 48px",
          }}
        >
          Works with
        </h2>

        <div
          style={{
            display: "flex",
            gap: 32,
            justifyContent: "center",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {INTEGRATIONS.map((item, i) => {
            const start = 20 + i * 12;
            const tile = fadeUp(frame, start, 22);
            const scale = interpolate(frame, [start, start + 22], [0.96, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: editorialEase,
            });

            return (
              <div
                key={item.id}
                style={{
                  opacity: tile.opacity,
                  transform: `translateY(${tile.translateY}px) scale(${scale})`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: 160,
                }}
              >
                <div
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 16,
                    border: `1px solid ${border}`,
                    background: surface,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                    boxShadow: "0 8px 32px rgba(26, 22, 18, 0.06)",
                  }}
                >
                  <Img
                    src={staticFile(item.file)}
                    style={{ width: 52, height: 52, objectFit: "contain" }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: sansFamily,
                    fontSize: 16,
                    fontWeight: 500,
                    color: inkMuted,
                    textAlign: "center",
                  }}
                >
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 48,
            width: 320,
            height: 2,
            background: accent,
            opacity: fadeIn(frame, 70, 24) * 0.5,
            borderRadius: 1,
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
