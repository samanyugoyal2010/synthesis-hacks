import { AbsoluteFill } from "remotion";
import { EditorialBackground } from "../components/EditorialBackground";
import { TypographyBeat } from "../components/TypographyBeat";

export const HookScene: React.FC = () => {
  return (
    <AbsoluteFill>
      <EditorialBackground />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "0 120px",
        }}
      >
        <TypographyBeat
          lines={["Where teams and AI agents", "share one memory."]}
          delayFrames={8}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
