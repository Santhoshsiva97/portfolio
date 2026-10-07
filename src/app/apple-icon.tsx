import { ImageResponse } from "next/og";
import { LogoMark } from "@/lib/og/LogoMark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS adds its own rounded corners, so the mark fills the square.
export default function AppleIcon() {
  return new ImageResponse(<LogoMark size={180} square />, size);
}
