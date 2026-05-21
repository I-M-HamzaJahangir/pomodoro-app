import type { Mode } from "../types";

interface Props {
  progress: number;
  mode: Mode;
}

export default function ProgressRing({ progress, mode }: Props) {
  const size = 540;
  const stroke = 1.5;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const filled = circumference * progress;

  return (
    <svg
      className="ring"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="haloFocus" cx="50%" cy="50%" r="50%">
          <stop offset="55%" stopColor="rgba(255,255,255,0)" />
          <stop offset="85%" stopColor="rgba(45,106,79,0.08)" />
          <stop offset="100%" stopColor="rgba(45,106,79,0)" />
        </radialGradient>
        <radialGradient id="haloBreak" cx="50%" cy="50%" r="50%">
          <stop offset="55%" stopColor="rgba(255,255,255,0)" />
          <stop offset="85%" stopColor="rgba(3,145,242,0.07)" />
          <stop offset="100%" stopColor="rgba(3,145,242,0)" />
        </radialGradient>
      </defs>

      <circle
        cx={size / 2}
        cy={size / 2}
        r={r - 1}
        fill={mode === "focus" ? "url(#haloFocus)" : "url(#haloBreak)"}
      />

      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.10"
        strokeWidth={stroke}
      />

      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth={stroke}
        strokeDasharray={`${filled} ${circumference - filled}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{
          transition: "stroke-dasharray 0.9s cubic-bezier(0.16, 0.84, 0.32, 1)",
        }}
      />
    </svg>
  );
}
