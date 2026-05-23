import { AbsoluteFill, useCurrentFrame } from "remotion";
import { AppMock } from "../components/AppMock";
import { EditorialBackground } from "../components/EditorialBackground";
import { TypographyBeat } from "../components/TypographyBeat";
import { fadeIn } from "../components/motion";
import { inkMuted } from "../theme/anthropic";
import { sansFamily } from "../theme/fonts";

export const ProductDemoScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <EditorialBackground />
      <AbsoluteFill style={{ padding: "48px 80px 40px" }}>
        <div style={{ marginBottom: 32 }}>
          <TypographyBeat
            lines={["See it work in your workspace"]}
            align="left"
            delayFrames={0}
          />
          <p
            style={{
              opacity: fadeIn(frame, 16, 20),
              fontFamily: sansFamily,
              fontSize: 18,
              color: inkMuted,
              marginTop: 8,
              marginLeft: 0,
            }}
          >
            Gemini delegates to ActionLayer — tasks update in real time.
          </p>
        </div>
        <AppMock />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
