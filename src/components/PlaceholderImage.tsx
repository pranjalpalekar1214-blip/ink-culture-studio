import { cn } from "@/lib/utils";

type Hue = "grey" | "red" | "green" | "orange" | "cream";

const hueMap: Record<Hue, { bg: string; fg: string; accent: string }> = {
  grey: { bg: "#1c1c1c", fg: "#4a4a4a", accent: "#e8e2d5" },
  red: { bg: "#231111", fg: "#57201c", accent: "#ff2e3f" },
  green: { bg: "#131a12", fg: "#2e4a2c", accent: "#b6ff2e" },
  orange: { bg: "#231708", fg: "#5c3a14", accent: "#ff8a3d" },
  cream: { bg: "#211f19", fg: "#4d483a", accent: "#e8e2d5" },
};

/** Deterministic hue per style string so tiles look varied but stable. */
export function hueFor(seed: string): Hue {
  const hues: Hue[] = ["grey", "red", "green", "orange", "cream"];
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return hues[h % hues.length];
}

export function PlaceholderImage({
  label,
  sub,
  seed,
  className,
}: {
  label: string;
  sub?: string;
  seed: string;
  className?: string;
}) {
  const hue = hueMap[hueFor(seed)];
  const gid = `g-${seed.replace(/[^a-z0-9]/gi, "")}`;

  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-ink", className)}>
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
        <rect width="400" height="500" fill={hue.bg} />
        <radialGradient id={gid} cx="30%" cy="20%" r="90%">
          <stop offset="0%" stopColor={hue.fg} stopOpacity="0.55" />
          <stop offset="100%" stopColor={hue.bg} stopOpacity="0" />
        </radialGradient>
        <rect width="400" height="500" fill={`url(#${gid})`} />
        {/* flash linework */}
        <g fill="none" stroke={hue.accent} strokeOpacity="0.5" strokeWidth="2.4" strokeLinecap="round">
          <path d="M210 150 C 190 120, 150 130, 150 165 C 150 200, 200 205, 215 175 C 228 150, 205 130, 190 142" />
          <path d="M205 210 C 200 260, 210 300, 230 340" />
          <path d="M225 240 C 205 250, 190 260, 180 285" />
          <path d="M215 300 C 235 295, 250 280, 255 260" />
          <path d="M60 80 L 76 84 L 80 100 L 90 86 L 106 90" strokeOpacity="0.35" />
          <path d="M320 420 L 336 424 L 340 440" strokeOpacity="0.3" />
        </g>
        <g stroke={hue.fg} strokeWidth="1.6" fill="none" opacity="0.8">
          <path d="M40 460 H 360" />
          <path d="M40 440 H 250" strokeOpacity="0.6" />
        </g>
        {/* frame */}
        <rect x="14" y="14" width="372" height="472" fill="none" stroke={hue.accent} strokeOpacity="0.25" strokeDasharray="2 7" />
      </svg>
      <div className="absolute inset-0 grain opacity-50" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
        <div>
          <p className="font-display text-sm uppercase tracking-[0.18em] text-bone/90">{label}</p>
          {sub && <p className="mt-0.5 text-[10px] uppercase tracking-[0.25em] text-bone/50">{sub}</p>}
        </div>
      </div>
    </div>
  );
}
