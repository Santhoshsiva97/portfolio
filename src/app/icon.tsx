import { ImageResponse } from "next/og";
import { LogoMark } from "@/lib/og/LogoMark";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<LogoMark size={64} />, size);
}
