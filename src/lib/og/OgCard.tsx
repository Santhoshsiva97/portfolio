import { ImageResponse } from "next/og";
import { ogFonts } from "./fonts";

// Satori (next/og) doesn't read CSS variables, so the Flowline palette is repeated here as hex values.
const C = {
  paper: "#f5f2ec",
  ink: "#15161a",
  muted: "#5b5d66",
  line: "#dcd6ca",
  signal: "#ff4f1a",
  flow: "#2f45ff",
};

const themes = {
  paper: {
    bg: C.paper,
    fg: C.ink,
    sub: C.muted,
    dot: "rgba(21,22,26,0.10)",
    accent: C.signal,
    chip: C.line,
  },
  ink: {
    bg: C.ink,
    fg: C.paper,
    sub: "#a3a5ad",
    dot: "rgba(245,242,236,0.10)",
    accent: C.signal,
    chip: "#3a3c44",
  },
  signal: {
    bg: C.signal,
    fg: C.ink,
    sub: "rgba(21,22,26,0.7)",
    dot: "rgba(21,22,26,0.14)",
    accent: C.ink,
    chip: "rgba(21,22,26,0.3)",
  },
  flow: {
    bg: C.flow,
    fg: C.paper,
    sub: "rgba(245,242,236,0.75)",
    dot: "rgba(245,242,236,0.14)",
    accent: C.paper,
    chip: "rgba(245,242,236,0.35)",
  },
};

export type OgTheme = keyof typeof themes;

export const ogSize = { width: 1200, height: 630 };

type OgCardProps = {
  eyebrow: string;
  title: string;
  /** Last words of the headline, set in the italic serif accent. */
  accent?: string;
  badge?: string;
  chips?: string[];
  footer: string;
  theme?: OgTheme;
};

/** Renders a 1200×630 Flowline-styled share image. */
export function renderOgCard({
  eyebrow,
  title,
  accent,
  badge,
  chips = [],
  footer,
  theme = "paper",
}: OgCardProps) {
  const t = themes[theme];
  const length = title.length + (accent?.length ?? 0);
  const titleSize = length > 60 ? 62 : length > 38 ? 74 : 92;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px 72px",
        backgroundColor: t.bg,
        backgroundImage: `radial-gradient(circle at 2px 2px, ${t.dot} 2px, transparent 0)`,
        backgroundSize: "30px 30px",
        color: t.fg,
        fontFamily: "Bricolage",
        position: "relative",
      }}
    >
      {/* Decorative flow line */}
      <svg
        width="1200"
        height="630"
        viewBox="0 0 1200 630"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.55 }}
      >
        <path
          d="M640 -20 C760 120 980 60 1040 200 S1120 420 1240 470"
          fill="none"
          stroke={t.accent}
          strokeWidth="3"
          strokeDasharray="10 12"
        />
        <circle cx="1040" cy="200" r="11" fill={t.accent} />
      </svg>

      {/* Top row: logo + badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="56" height="56" viewBox="0 0 36 36">
            <rect
              width="36"
              height="36"
              rx="11"
              fill={theme === "ink" ? C.paper : C.ink}
            />
            <path
              d="M11 12.5c8 0 6 11 14 11"
              fill="none"
              stroke={theme === "ink" ? C.ink : C.paper}
              strokeOpacity="0.6"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
            <circle cx="11" cy="12.5" r="3.5" fill={C.signal} />
            <circle
              cx="25"
              cy="23.5"
              r="3.5"
              fill={theme === "ink" ? C.ink : C.paper}
            />
          </svg>
          <div style={{ display: "flex", fontSize: 38, letterSpacing: -1 }}>
            Santhosh
            <span style={{ color: theme === "signal" ? C.ink : C.signal }}>
              .
            </span>
          </div>
        </div>
        {badge && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 22px",
              borderRadius: 999,
              border: `2px solid ${t.chip}`,
              fontFamily: "GeistMono",
              fontSize: 20,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                backgroundColor: t.accent,
              }}
            />
            {badge}
          </div>
        )}
      </div>

      {/* Headline */}
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000 }}>
        <div
          style={{
            display: "flex",
            fontFamily: "GeistMono",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: t.sub,
            marginBottom: 22,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontSize: titleSize,
            lineHeight: 1,
            letterSpacing: -2.5,
          }}
        >
          {/* One span per word (gap = word spacing) so the accent wraps like text instead of as an indented block. */}
          {[
            ...title.split(/\s+/).map((word) => ({ word, accent: false })),
            ...(accent ?? "")
              .split(/\s+/)
              .filter(Boolean)
              .map((word) => ({ word, accent: true })),
          ].map((w, i) => (
            <span
              key={i}
              style={{
                marginRight: "0.24em",
                ...(w.accent
                  ? {
                      fontFamily: "Instrument",
                      fontStyle: "italic",
                      letterSpacing: 0,
                      color: t.accent,
                    }
                  : {}),
              }}
            >
              {w.word}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom row: chips + footer */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <div
          style={{ display: "flex", flexWrap: "wrap", gap: 10, maxWidth: 760 }}
        >
          {chips.slice(0, 4).map((chip) => (
            <div
              key={chip}
              style={{
                display: "flex",
                padding: "8px 18px",
                borderRadius: 999,
                border: `2px solid ${t.chip}`,
                fontFamily: "GeistMono",
                fontSize: 20,
              }}
            >
              {chip}
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "GeistMono",
            fontSize: 22,
            color: t.sub,
          }}
        >
          {footer}
        </div>
      </div>
    </div>,
    { ...ogSize, fonts: ogFonts },
  );
}
