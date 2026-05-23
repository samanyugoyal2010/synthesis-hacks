import "./index.css";
import "./theme/fonts";
import { Composition } from "remotion";
import { BOOMERANG_DURATION, BoomerangVideo } from "./BoomerangVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Boomerang"
        component={BoomerangVideo}
        durationInFrames={BOOMERANG_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
