/** The node-and-flow logo mark for generated icons (solid line: dashes vanish at favicon size). */
export function LogoMark({ size, square }: { size: number; square?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        width: size,
        height: size,
        background: "transparent",
      }}
    >
      <svg width={size} height={size} viewBox="0 0 36 36">
        <rect width="36" height="36" rx={square ? 0 : 9} fill="#15161a" />
        <path
          d="M11 12.5c8 0 6 11 14 11"
          fill="none"
          stroke="#f5f2ec"
          strokeOpacity="0.55"
          strokeWidth="2.4"
        />
        <circle cx="11" cy="12.5" r="4.4" fill="#ff4f1a" />
        <circle cx="25" cy="23.5" r="4.4" fill="#f5f2ec" />
      </svg>
    </div>
  );
}
