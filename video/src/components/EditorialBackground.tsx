import { AbsoluteFill } from "remotion";
import { canvas } from "../theme/anthropic";

export const EditorialBackground: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: canvas }}>
      <AbsoluteFill
        style={{
          backgroundColor: "rgba(194, 82, 45, 0.04)",
        }}
      />
      <AbsoluteFill
        style={{
          backgroundColor: "rgba(120, 100, 75, 0.03)",
        }}
      />
    </AbsoluteFill>
  );
};
