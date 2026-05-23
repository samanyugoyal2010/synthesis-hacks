import { Easing, interpolate } from "remotion";

export const editorialEase = Easing.bezier(0.25, 0.1, 0.25, 1);

export const fadeUp = (
  frame: number,
  start: number,
  duration = 24,
): { opacity: number; translateY: number } => {
  const opacity = interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: editorialEase,
  });
  const translateY = interpolate(frame, [start, start + duration], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: editorialEase,
  });
  return { opacity, translateY };
};

export const fadeIn = (frame: number, start: number, duration = 24): number =>
  interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: editorialEase,
  });
