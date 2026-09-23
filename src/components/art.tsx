import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Original hand-drawn-style SVG art system.
 * All artwork is original line illustration in a tattoo-flash spirit —
 * no copied flash sheets, no copyrighted characters.
 */

type ArtProps = { className?: string };

const draw = (reduce: boolean | null, delay = 0, duration = 1.6) =>
  reduce
    ? {}
    : {
        initial: { pathLength: 0, opacity: 0 },
        whileInView: { pathLength: 1, opacity: 1 },
        viewport: { once: true, margin: "-40px" },
        transition: { pathLength: { duration, delay, ease: "easeInOut" as const }, opacity: { duration: 0.3, delay } },
      };

/* ---------------- Ink strokes (decorative underlines/swooshes) ---------------- */

export function InkStroke({ className, flip }: ArtProps & { flip?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 220 24" fill="none" aria-hidden className={cn("h-5 w-44", flip && "-scale-x-100", className)}>
      <motion.path
        d="M4 16 C 40 6, 70 22, 108 12 S 180 4, 216 14"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        {...draw(reduce, 0.2, 1.2)}
      />
      <motion.circle cx="212" cy="14" r="3.4" fill="currentColor" {...draw(reduce, 1, 0.4)} />
    </svg>
  );
}

export function InkScribble({ className }: ArtProps) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 160 60" fill="none" aria-hidden className={cn("h-10 w-32", className)}>
      <motion.path
        d="M6 44 C 30 10, 52 8, 58 34 C 64 58, 88 50, 96 28 C 104 8, 128 14, 154 40"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        {...draw(reduce, 0.3, 1.4)}
      />
    </svg>
  );
}

/* ---------------- Flash motifs ---------------- */

export function RoseMotif({ className }: ArtProps) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 120 140" fill="none" aria-hidden className={className}>
      <motion.g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" {...draw(reduce, 0, 1.8)}>
        <path d="M60 62 C 40 58, 34 38, 48 28 C 58 20, 76 22, 82 34 C 90 30, 98 40, 92 50 C 100 56, 94 70, 82 70 C 74 76, 64 74, 60 62 Z" />
        <path d="M60 62 C 52 56, 52 42, 62 38 C 70 35, 78 42, 74 52" />
        <path d="M60 70 C 56 88, 58 104, 64 122" />
        <path d="M62 92 C 50 90, 42 82, 40 72" />
        <path d="M63 106 C 74 106, 82 100, 86 92" />
        <path d="M40 72 C 30 74, 24 68, 26 60" />
      </motion.g>
      <motion.path d="M38 66 C 20 70, 12 84, 18 96" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...draw(reduce, 0.8, 1)} />
    </svg>
  );
}

export function SnakeMotif({ className }: ArtProps) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 160 160" fill="none" aria-hidden className={className}>
      <motion.g stroke="currentColor" strokeWidth="3" strokeLinecap="round" {...draw(reduce, 0, 2)}>
        <path d="M18 140 C 50 132, 44 96, 76 92 C 108 88, 104 52, 136 48" />
        <path d="M136 48 C 146 46, 150 36, 142 30 C 134 24, 124 30, 126 40 C 128 46, 132 48, 136 48 Z" />
        <path d="M142 34 L 152 28 M 140 40 L 150 44" />
        <path d="M52 112 L 60 118 M 68 104 L 76 110 M 84 88 L 92 94 M 100 72 L 108 78 M 112 62 L 120 68" />
      </motion.g>
    </svg>
  );
}

export function StarMotif({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden className={className}>
      <path d="M20 3 L 24 15 L 37 16 L 27 24 L 30 37 L 20 29 L 10 37 L 13 24 L 3 16 L 16 15 Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowMotif({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 120 40" fill="none" aria-hidden className={className}>
      <path d="M4 20 H 108 M 96 8 L 110 20 L 96 32" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HandMotif({ className }: ArtProps) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 120 160" fill="none" aria-hidden className={className}>
      <motion.g stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" {...draw(reduce, 0, 2)}>
        <path d="M44 150 C 36 128, 32 112, 34 96 C 26 98, 22 92, 24 84 L 36 52 C 38 44, 46 46, 46 54 L 42 74 L 46 30 C 46 20, 56 20, 57 30 L 60 68 L 66 24 C 68 14, 78 16, 77 26 L 72 70 L 82 34 C 85 25, 94 28, 92 37 L 84 86 C 82 106, 78 128, 72 150" />
        <path d="M24 84 C 20 78, 26 70, 32 72" />
      </motion.g>
      <motion.circle cx="88" cy="18" r="4" fill="currentColor" {...draw(reduce, 1.2, 0.4)} />
      <motion.path d="M14 110 L 26 104" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" {...draw(reduce, 1.4, 0.6)} />
    </svg>
  );
}

export function SkullMotif({ className }: ArtProps) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 120 130" fill="none" aria-hidden className={className}>
      <motion.g stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" {...draw(reduce, 0, 1.8)}>
        <path d="M60 8 C 34 8, 22 26, 22 46 C 22 62, 30 72, 34 78 L 36 96 C 36 102, 40 106, 46 106 L 74 106 C 80 106, 84 102, 84 96 L 86 78 C 90 72, 98 62, 98 46 C 98 26, 86 8, 60 8 Z" />
        <path d="M44 108 L 44 118 M 56 108 L 56 120 M 68 108 L 68 118" />
        <ellipse cx="44" cy="48" rx="11" ry="13" />
        <ellipse cx="76" cy="48" rx="11" ry="13" />
        <path d="M52 78 C 56 82, 64 82, 68 78" />
        <path d="M60 58 L 56 68 L 64 68 Z" />
      </motion.g>
    </svg>
  );
}

export function BoltMotif({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 60 90" fill="none" aria-hidden className={className}>
      <path d="M34 4 L 10 48 L 28 48 L 20 86 L 52 36 L 32 36 L 44 4 Z" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" />
    </svg>
  );
}

export function EyeMotif({ className }: ArtProps) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 120 70" fill="none" aria-hidden className={className}>
      <motion.g stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" {...draw(reduce, 0, 1.4)}>
        <path d="M8 38 C 30 10, 90 10, 112 38 C 90 62, 30 62, 8 38 Z" />
        <circle cx="60" cy="37" r="13" />
        <circle cx="60" cy="37" r="4" fill="currentColor" stroke="none" />
      </motion.g>
    </svg>
  );
}

/* ---------------- Mumbai street motifs ---------------- */

export function LocalTrainMotif({ className }: ArtProps) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 140 100" fill="none" aria-hidden className={className}>
      <motion.g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...draw(reduce, 0, 1.6)}>
        <rect x="14" y="22" width="112" height="44" rx="8" />
        <path d="M26 22 V 10 M 46 22 V 10 M 94 22 V 10 M 114 22 V 10" />
        <rect x="26" y="34" width="20" height="16" rx="2" />
        <rect x="60" y="34" width="20" height="16" rx="2" />
        <rect x="94" y="34" width="20" height="16" rx="2" />
        <path d="M30 66 V 78 M 110 66 V 78" />
        <circle cx="42" cy="80" r="6" />
        <circle cx="98" cy="80" r="6" />
        <path d="M4 92 H 136" strokeDasharray="6 8" />
      </motion.g>
    </svg>
  );
}

export function SkylineMotif({ className }: ArtProps) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 200 80" fill="none" aria-hidden className={className}>
      <motion.g stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" {...draw(reduce, 0.1, 1.8)}>
        <path d="M4 76 V 44 H 22 V 76" />
        <path d="M22 76 V 30 H 40 V 76" />
        <path d="M40 76 V 52 H 58 V 76" />
        <path d="M58 76 V 20 H 74 V 76" />
        <path d="M74 76 V 40 H 92 V 76" />
        <path d="M92 76 V 26 H 108 V 76" />
        <path d="M108 76 V 56 H 128 V 76" />
        <path d="M128 76 V 34 H 146 V 76" />
        <path d="M146 76 V 46 H 166 V 76" />
        <path d="M166 76 V 24 H 186 V 76" />
        <path d="M0 76 H 200" />
      </motion.g>
      <motion.path d="M64 20 V 8" stroke="currentColor" strokeWidth="2" {...draw(reduce, 1.2, 0.5)} />
    </svg>
  );
}

/* ---------------- Artist portraits (original caricature line art) ---------------- */

export function ArtistPortrait({
  who,
  className,
}: {
  who: "karan" | "lucky";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const common = { stroke: "currentColor", strokeWidth: 2.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  return (
    <svg viewBox="0 0 200 240" fill="none" aria-hidden className={className} role="img">
      {/* shared bust silhouette */}
      <motion.g {...common} {...draw(reduce, 0, 2)}>
        {/* shoulders */}
        <path d="M40 226 C 44 190, 66 176, 100 176 C 134 176, 156 190, 160 226" />
        {/* neck */}
        <path d="M86 168 L 86 182 M 114 168 L 114 182" />
        {/* head */}
        <path d="M64 96 C 64 60, 80 42, 100 42 C 120 42, 136 60, 136 96 C 136 128, 122 150, 100 150 C 78 150, 64 128, 64 96 Z" />
        {/* ears */}
        <path d="M64 96 C 56 94, 54 104, 62 110" />
        <path d="M136 96 C 144 94, 146 104, 138 110" />
      </motion.g>

      {who === "karan" ? (
        <motion.g {...common} {...draw(reduce, 0.6, 1.4)}>
          {/* sharp eyes + focused brows */}
          <path d="M78 92 L 92 96 M 122 92 L 108 96" />
          <path d="M80 106 C 84 102, 90 102, 94 106" />
          <path d="M106 106 C 110 102, 116 102, 120 106" />
          {/* calm mouth */}
          <path d="M90 130 C 96 132, 104 132, 110 130" />
          {/* short hair with hard line */}
          <path d="M64 92 C 62 58, 78 36, 100 36 C 122 36, 138 58, 136 92 C 130 78, 118 72, 100 72 C 82 72, 70 78, 64 92 Z" />
          <path d="M84 48 C 92 44, 108 44, 116 48" />
          {/* neck tattoo: snake */}
          <path d="M88 176 C 96 170, 104 174, 112 168 M 96 182 L 102 186" />
          {/* collar detail */}
          <path d="M70 208 L 100 196 L 130 208" />
        </motion.g>
      ) : (
        <motion.g {...common} {...draw(reduce, 0.6, 1.4)}>
          {/* playful wide eyes */}
          <circle cx="86" cy="104" r="6" />
          <circle cx="114" cy="104" r="6" />
          <path d="M76 92 C 82 86, 90 86, 96 90" />
          <path d="M104 90 C 110 86, 118 86, 124 92" />
          {/* grin */}
          <path d="M86 128 C 92 136, 108 136, 114 128" />
          {/* curly hair */}
          <path d="M62 88 C 54 60, 74 30, 100 32 C 126 30, 146 60, 138 88 C 136 72, 126 64, 116 66 C 112 58, 88 58, 84 66 C 74 64, 64 72, 62 88 Z" />
          <path d="M70 52 C 74 46, 80 42, 86 42 M 114 42 C 120 42, 126 46, 130 52" />
          {/* neck tattoo: star */}
          <path d="M100 186 L 103 193 L 110 193 L 104 197 L 107 204 L 100 200 L 93 204 L 96 197 L 90 193 L 97 193 Z" />
          {/* chain */}
          <path d="M76 200 C 84 206, 116 206, 124 200" />
        </motion.g>
      )}
    </svg>
  );
}

/* ---------------- Floating decorative cluster ---------------- */

export function FloatingMotifs({ className }: ArtProps) {
  const reduce = useReducedMotion();
  const anim = reduce ? {} : { animate: { y: [0, -12, 0], rotate: [0, 4, 0] }, transition: { duration: 7, repeat: Infinity, ease: "easeInOut" as const } };
  const anim2 = reduce ? {} : { animate: { y: [0, 10, 0], rotate: [0, -6, 0] }, transition: { duration: 9, repeat: Infinity, ease: "easeInOut" as const } };
  return (
    <div aria-hidden className={cn("pointer-events-none", className)}>
      <motion.div {...anim} className="absolute left-[6%] top-[16%] text-blood/50">
        <StarMotif className="h-8 w-8" />
      </motion.div>
      <motion.div {...anim2} className="absolute right-[8%] top-[24%] text-acid/40">
        <RoseMotif className="h-24 w-24" />
      </motion.div>
      <motion.div {...anim} className="absolute bottom-[18%] left-[12%] text-cream/30">
        <SnakeMotif className="h-28 w-28" />
      </motion.div>
      <motion.div {...anim2} className="absolute bottom-[24%] right-[14%] text-ember/50">
        <BoltMotif className="h-10 w-10" />
      </motion.div>
    </div>
  );
}
