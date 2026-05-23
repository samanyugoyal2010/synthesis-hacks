import { useCurrentFrame } from "remotion";
import { accent, ink, inkMuted } from "../theme/anthropic";
import { serifFamily } from "../theme/fonts";
import { fadeUp } from "./motion";

type TypographyBeatProps = {
  lines: string[];
  subtitle?: string;
  align?: "left" | "center";
  delayFrames?: number;
  accentWord?: string;
};

export const TypographyBeat: React.FC<TypographyBeatProps> = ({
  lines,
  subtitle,
  align = "center",
  delayFrames = 0,
  accentWord,
}) => {
  const frame = useCurrentFrame();
  const anim = fadeUp(frame, delayFrames, 28);

  return (
    <div
      style={{
        opacity: anim.opacity,
        transform: `translateY(${anim.translateY}px)`,
        textAlign: align,
        maxWidth: align === "center" ? 1100 : 800,
      }}
    >
      {lines.map((line, i) => {
        const lineAnim = fadeUp(frame, delayFrames + i * 8, 24);
        if (accentWord && line.includes(accentWord)) {
          const parts = line.split(accentWord);
          return (
            <h2
              key={i}
              style={{
                opacity: lineAnim.opacity,
                transform: `translateY(${lineAnim.translateY}px)`,
                fontFamily: serifFamily,
                fontSize: 64,
                fontWeight: 600,
                lineHeight: 1.15,
                color: ink,
                margin: i > 0 ? "12px 0 0" : 0,
              }}
            >
              {parts[0]}
              <span style={{ color: accent }}>{accentWord}</span>
              {parts[1]}
            </h2>
          );
        }
        return (
          <h2
            key={i}
            style={{
              opacity: lineAnim.opacity,
              transform: `translateY(${lineAnim.translateY}px)`,
              fontFamily: serifFamily,
              fontSize: 64,
              fontWeight: 600,
              lineHeight: 1.15,
              color: ink,
              margin: i > 0 ? "12px 0 0" : 0,
            }}
          >
            {line}
          </h2>
        );
      })}
      {subtitle && (
        <p
          style={{
            opacity: fadeUp(frame, delayFrames + 20, 24).opacity,
            fontFamily: serifFamily,
            fontSize: 26,
            fontWeight: 400,
            color: inkMuted,
            marginTop: 24,
            lineHeight: 1.5,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
