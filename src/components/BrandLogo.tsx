import { cn } from "@/lib/utils";

/**
 * Brand emblem — a faithful, static recreation of the supplied logo artwork:
 * the heartagram (two large overlapping heart-lobe circles over an interlocked
 * diamond whose mid-chord runs all the way to the ring) inside a solid ring
 * that fills the frame with only a minimal margin. Bold, even stroke weights,
 * monochrome via currentColor. No animations or effects.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      {/* solid outer ring — nearly edge-to-edge like the original */}
      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="7" />
      {/* heartagram mark — fills the ring, minimal margin like the original */}
      <g fill="none" stroke="currentColor" strokeWidth="6.5">
        {/* heart lobes — two large overlapping circles, tops near the ring,
            crossing at the cleavage (top centre) and at the centre point */}
        <circle cx="35" cy="32" r="21" />
        <circle cx="65" cy="32" r="21" />
        {/* interlocked diamond — apex tucked into the cleavage, mid-chord
            spanning wall-to-wall against the ring, bottom point at the base */}
        <path d="M50 17 L90.5 60 L50 88 L9.5 60 Z" />
      </g>
    </svg>
  );
}

/**
 * Full identity lockup: [badge] STREET CULTURE / TATTOO AND ACADEMY.
 * Monochrome bone/white to match the supplied artwork, static — no hover
 * effects. Kept small on purpose: scales from a single root font-size (all
 * inner sizing is in em), so `<BrandLogo className="text-xs" />` … `text-lg`
 * gives nav → footer sizes with the badge staying compact.
 */
export function BrandLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex select-none items-center gap-[0.75em] font-display uppercase",
        className,
      )}
    >
      <span className="sr-only">Street Culture - Tattoo and Academy</span>

      <img
        src="/logo.png"
        alt="Street Culture Tattoo and Academy"
        className="size-[2.75em] shrink-0 object-contain"
        draggable="false"
      />

      <span aria-hidden="true" className="flex flex-col">
        <span className="text-[1.6em] font-bold uppercase leading-[0.95] tracking-[-0.04em]">
          Street Culture
        </span>
        <span className="mt-[0.35em] text-[0.6em] font-semibold uppercase leading-none tracking-[0.42em] text-bone/80">
          Tattoo <span className="text-bone">and</span> Academy
        </span>
      </span>
    </span>
  );
}
