import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { addCoins, checkDiscountUnlock, COIN_ODDS, gambleCoins } from "@/lib/arcade";
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

export function SparkMotif({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden className={className}>
      <path d="M20 2 V 38 M 2 20 H 38 M 8 8 L 32 32 M 32 8 L 8 32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function BombMotif({ className }: ArtProps) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 90 100" fill="none" aria-hidden className={className}>
      <motion.g stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" {...draw(reduce, 0, 1.2)}>
        <circle cx="42" cy="60" r="26" />
        <path d="M58 40 L 68 28 M 68 28 C 72 22, 80 24, 78 30" />
        <path d="M76 20 L 82 26 M 82 18 L 78 28" />
        <path d="M30 54 C 30 48, 36 44, 42 46" />
      </motion.g>
      <motion.path d="M84 12 L 88 4 M 74 8 L 78 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" {...draw(reduce, 0.8, 0.5)} />
    </svg>
  );
}

export function PizzaMotif({ className }: ArtProps) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden className={className}>
      <motion.g stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" {...draw(reduce, 0, 1.2)}>
        <path d="M50 92 L 14 26 C 36 12, 64 12, 86 26 Z" />
        <path d="M50 92 L 30 40 M 50 92 L 70 40" />
        <circle cx="44" cy="38" r="4" />
        <circle cx="58" cy="50" r="4" />
        <circle cx="40" cy="62" r="4" />
      </motion.g>
    </svg>
  );
}

export function CatMotif({ className }: ArtProps) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden className={className}>
      <motion.g stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" {...draw(reduce, 0, 1.2)}>
        <path d="M28 44 L 24 20 L 40 32" />
        <path d="M72 44 L 76 20 L 60 32" />
        <path d="M28 44 C 28 28, 72 28, 72 44 C 72 64, 60 74, 50 74 C 40 74, 28 64, 28 44 Z" />
        <path d="M40 50 C 42 52, 46 52, 48 50" />
        <path d="M56 50 C 58 52, 62 52, 64 50" />
        <path d="M46 60 C 48 63, 54 63, 56 60" />
        <path d="M16 48 L 28 50 M 16 58 L 28 56 M 84 48 L 72 50 M 84 58 L 72 56" />
      </motion.g>
    </svg>
  );
}

export function WinkMotif({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 60 40" fill="none" aria-hidden className={className}>
      <path d="M10 18 C 16 8, 44 8, 50 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M16 24 H 24" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="40" cy="24" r="2.6" fill="currentColor" />
      <path d="M22 32 C 26 36, 36 36, 40 32" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

export function BoltDoodleMotif({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 60 90" fill="none" aria-hidden className={className}>
      <path d="M34 4 L 10 48 L 28 48 L 20 86 L 52 36 L 32 36 L 44 4 Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}

/** Infinite horizontal marquee strip — fun studio slogans. */
export function TickerStrip({ items, className }: { items: string[]; className?: string }) {
  const reduce = useReducedMotion();
  const doubled = [...items, ...items];
  return (
    <div className={cn("relative overflow-hidden border-y-2 border-ink bg-blood py-3", className)} aria-hidden>
      <motion.div
        className="flex w-max items-center gap-8 pr-8"
        animate={reduce ? {} : { x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((t, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap font-display text-lg uppercase tracking-[0.08em] text-ink">
            {t}
            <StarMotif className="h-4 w-4" />
          </span>
        ))}
      </motion.div>
    </div>
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

/* ---------------- Stick-figure placeholder portraits (collectible card) ---------------- */

/** Placeholder stick-figure doodle for the collectible card — one pose per artist. */
export function StickArtistFigure({ who, className }: { who: "karan" | "lucky"; className?: string }) {
  const reduce = useReducedMotion();
  const common = { stroke: "currentColor", strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const detail = { stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  return (
    <svg viewBox="0 0 200 240" fill="none" aria-hidden className={className} role="img">
      {who === "lucky" ? (
        <>
          {/* Lucky — curly scribble hair, story book, machine raised mid-yarn */}
          <motion.g {...common} {...draw(reduce, 0, 1.6)}>
            <path d="M100 34 C 116 34 126 46 126 60 C 126 76 114 86 100 86 C 86 86 74 76 74 60 C 74 46 84 34 100 34 Z" />
            <path d="M76 46 C 72 30 86 20 100 22 C 116 18 130 30 126 44" />
            <path d="M84 30 C 86 24 94 22 98 26 M 104 24 C 112 22 120 26 122 34" />
            <path d="M100 86 L 100 150" />
            <path d="M100 100 C 86 106 74 110 64 116" />
            <path d="M100 100 C 118 94 130 84 138 70" />
            <path d="M100 150 C 96 170 94 190 90 210" />
            <path d="M100 150 C 106 170 108 190 112 210" />
            <path d="M90 210 L 78 214 M 112 210 L 124 214" />
          </motion.g>
          <motion.g {...detail} {...draw(reduce, 0.8, 1)}>
            <circle cx="90" cy="58" r="2.6" fill="currentColor" stroke="none" />
            <circle cx="110" cy="58" r="2.6" fill="currentColor" stroke="none" />
            <path d="M88 70 C 94 78 106 78 112 70" />
            <path d="M100 112 L 103 120 L 111 120 L 105 125 L 107 133 L 100 128 L 93 133 L 95 125 L 89 120 L 97 120 Z" />
            <path d="M56 116 L 72 112 L 72 132 L 56 136 Z" />
            <path d="M64 114 L 64 134" />
            <path d="M134 54 L 150 68 L 144 76 L 128 62 Z" />
            <path d="M150 68 L 158 80" />
            <path d="M150 44 L 154 36 M 158 52 L 166 48" />
          </motion.g>
        </>
      ) : (
        <>
          {/* Karan — cap down low, both hands on the machine, surgical focus */}
          <motion.g {...common} {...draw(reduce, 0, 1.6)}>
            <path d="M100 34 C 118 34 128 46 128 62 C 128 78 116 88 100 88 C 84 88 72 78 72 62 C 72 46 82 34 100 34 Z" />
            <path d="M76 50 C 80 34 120 34 124 50" />
            <path d="M70 50 L 132 50" />
            <path d="M100 88 L 100 152" />
            <path d="M100 102 C 88 110 80 116 74 122" />
            <path d="M100 102 C 112 110 120 116 126 122" />
            <path d="M100 152 L 96 210" />
            <path d="M100 152 L 106 210" />
            <path d="M96 210 L 84 214 M 106 210 L 118 214" />
          </motion.g>
          <motion.g {...detail} {...draw(reduce, 0.8, 1)}>
            <path d="M88 60 L 96 62 M 112 60 L 104 62" />
            <circle cx="92" cy="66" r="2.4" fill="currentColor" stroke="none" />
            <circle cx="108" cy="66" r="2.4" fill="currentColor" stroke="none" />
            <path d="M92 78 C 96 81 104 81 108 78" />
            <path d="M84 132 L 114 116 L 118 124 L 88 140 Z" />
            <path d="M118 124 L 130 116" />
            <path d="M134 110 L 140 104 M 138 120 L 146 116" />
            <path d="M90 112 C 94 108 100 112 106 108" />
          </motion.g>
        </>
      )}
    </svg>
  );
}

/* ---------------- Interactive pixel question block (arcade easter egg) ---------------- */

/**
 * Mario-style "?" block: idles with a gentle bob, and when hit from below
 * it bumps up and pops a spinning coin — exactly like the classic block.
 */
export function QuestionBlock({ className }: ArtProps) {
  const reduce = useReducedMotion();
  const [bumping, setBumping] = useState(false);
  const [coins, setCoins] = useState<number[]>([]);
  const coinId = useRef(0);

  const hit = () => {
    if (bumping) return;
    setBumping(true);
    window.setTimeout(() => setBumping(false), 340);
    // The hero block is the generous one: 75% payout odds, 3 coins on a win.
    if (gambleCoins(COIN_ODDS.block) > 0) {
      const id = ++coinId.current;
      setCoins((c) => [...c, id]);
      window.setTimeout(() => setCoins((c) => c.filter((x) => x !== id)), 800);
      addCoins(3);
      checkDiscountUnlock();
    }
  };

  return (
    <div className={cn("relative inline-block", className)}>
      {/* coin pop */}
      <div className="pointer-events-none absolute inset-x-0 -top-2 flex justify-center" aria-hidden>
        <AnimatePresence>
          {coins.map((id) => (
            <motion.span
              key={id}
              className="absolute h-5 w-4 rounded-[2px] border-2 border-[#141414] bg-[#ffd94a] shadow-[inset_0_-2px_0_#c9a227]"
              initial={reduce ? { opacity: 0 } : { opacity: 1, y: 0 }}
              animate={reduce ? { opacity: [0, 1, 0] } : { y: [-8, -46, -38], opacity: [1, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={reduce ? { duration: 0.5 } : { duration: 0.7, ease: "easeOut", times: [0, 0.6, 1] }}
            />
          ))}
        </AnimatePresence>
      </div>

      <motion.button
        type="button"
        aria-label="Hit the question block"
        onClick={hit}
        data-block-native
        className="block h-full w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blood"
        animate={reduce ? { y: 0 } : bumping ? { y: [0, -14, 0] } : { y: [0, -4, 0] }}
        transition={bumping ? { duration: 0.3, ease: "easeOut" } : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          viewBox="0 0 16 16"
          shapeRendering="crispEdges"
          className="h-full w-full drop-shadow-[0_6px_0_rgba(0,0,0,0.45)]"
          aria-hidden
        >
          {/* block body */}
          <rect width="16" height="16" fill="#141414" />
          <rect x="1" y="1" width="14" height="14" fill="var(--blood)" />
          {/* bevel highlight */}
          <rect x="1" y="1" width="14" height="2" fill="#ffdf6b" />
          <rect x="1" y="1" width="2" height="14" fill="#ffdf6b" />
          {/* bevel shade */}
          <rect x="1" y="13" width="14" height="2" fill="#c9a227" />
          <rect x="13" y="1" width="2" height="14" fill="#c9a227" />
          {/* corner rivets */}
          <rect x="3" y="3" width="1" height="1" fill="#141414" />
          <rect x="12" y="3" width="1" height="1" fill="#141414" />
          <rect x="3" y="12" width="1" height="1" fill="#141414" />
          <rect x="12" y="12" width="1" height="1" fill="#141414" />
          {/* pixel "?" */}
          <g fill="#141414">
            <rect x="5" y="3" width="6" height="2" />
            <rect x="9" y="5" width="2" height="2" />
            <rect x="8" y="7" width="2" height="1" />
            <rect x="7" y="8" width="2" height="3" />
            <rect x="7" y="12" width="2" height="2" />
          </g>
        </svg>
      </motion.button>
    </div>
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
      <motion.div {...anim} className="absolute left-[6%] top-[16%] text-blood/60">
        <StarMotif className="h-8 w-8" />
      </motion.div>
      <motion.div {...anim2} className="absolute right-[8%] top-[22%] text-acid/40">
        <RoseMotif className="h-24 w-24" />
      </motion.div>
      <motion.div {...anim} className="absolute bottom-[30%] left-[4%] text-cream/30">
        <SnakeMotif className="h-24 w-24" />
      </motion.div>
      <motion.div {...anim2} className="absolute bottom-[24%] right-[13%] text-ember/60">
        <BombMotif className="h-14 w-14" />
      </motion.div>
      <motion.div {...anim} className="absolute right-[26%] top-[10%] text-blood/50">
        <CatMotif className="h-16 w-16" />
      </motion.div>
      <motion.div {...anim2} className="absolute bottom-[10%] left-[24%] text-blood/40">
        <PizzaMotif className="h-14 w-14" />
      </motion.div>
      <motion.div {...anim} className="absolute left-[42%] top-[8%] text-ember/40">
        <WinkMotif className="h-8 w-12" />
      </motion.div>
    </div>
  );
}
