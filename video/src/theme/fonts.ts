import { loadFont } from "@remotion/google-fonts/Lora";
import { loadFont as loadSans } from "@remotion/google-fonts/SourceSans3";

const lora = loadFont("normal", {
  weights: ["400", "600", "700"],
  subsets: ["latin"],
});

const sourceSans = loadSans("normal", {
  weights: ["400", "500", "600"],
  subsets: ["latin"],
});

export const serifFamily = lora.fontFamily;
export const sansFamily = sourceSans.fontFamily;
