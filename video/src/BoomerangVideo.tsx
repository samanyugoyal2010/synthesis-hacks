import { AbsoluteFill, Sequence } from "remotion";
import { DifferentiatorScene } from "./scenes/DifferentiatorScene";
import { HookScene } from "./scenes/HookScene";
import { IntegrationsScene } from "./scenes/IntegrationsScene";
import { OutroScene } from "./scenes/OutroScene";
import { ProductDemoScene } from "./scenes/ProductDemoScene";
import { StackScene } from "./scenes/StackScene";
import { TitleScene } from "./scenes/TitleScene";

/** ~50s @ 30fps */
export const BOOMERANG_SCENES = {
  hook: 120,
  title: 90,
  productDemo: 420,
  integrations: 150,
  differentiator: 240,
  stack: 180,
  outro: 150,
} as const;

export const BOOMERANG_DURATION =
  BOOMERANG_SCENES.hook +
  BOOMERANG_SCENES.title +
  BOOMERANG_SCENES.productDemo +
  BOOMERANG_SCENES.integrations +
  BOOMERANG_SCENES.differentiator +
  BOOMERANG_SCENES.stack +
  BOOMERANG_SCENES.outro;

export const BoomerangVideo: React.FC = () => {
  let from = 0;
  const next = (length: number) => {
    const start = from;
    from += length;
    return { from: start, duration: length };
  };

  const hook = next(BOOMERANG_SCENES.hook);
  const title = next(BOOMERANG_SCENES.title);
  const productDemo = next(BOOMERANG_SCENES.productDemo);
  const integrations = next(BOOMERANG_SCENES.integrations);
  const differentiator = next(BOOMERANG_SCENES.differentiator);
  const stack = next(BOOMERANG_SCENES.stack);
  const outro = next(BOOMERANG_SCENES.outro);

  return (
    <AbsoluteFill>
      <Sequence from={hook.from} durationInFrames={hook.duration}>
        <HookScene />
      </Sequence>
      <Sequence from={title.from} durationInFrames={title.duration}>
        <TitleScene />
      </Sequence>
      <Sequence from={productDemo.from} durationInFrames={productDemo.duration}>
        <ProductDemoScene />
      </Sequence>
      <Sequence from={integrations.from} durationInFrames={integrations.duration}>
        <IntegrationsScene />
      </Sequence>
      <Sequence from={differentiator.from} durationInFrames={differentiator.duration}>
        <DifferentiatorScene />
      </Sequence>
      <Sequence from={stack.from} durationInFrames={stack.duration}>
        <StackScene />
      </Sequence>
      <Sequence from={outro.from} durationInFrames={outro.duration}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
