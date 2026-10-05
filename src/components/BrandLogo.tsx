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
 * Full identity lockup — the supplied logo artwork on its own (wordmark
 * removed by request). Scales from the call site's root font-size
 * (`text-xs` … `text-lg`), so `<BrandLogo className="text-xs" />` … `text-lg`
 * gives nav → footer sizes, with the image's aspect ratio preserved exactly.
 */
export function BrandLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn("inline-flex select-none items-center", className)}
    >
      <img
        src="/logo.png"
        alt="Street Culture Tattoo and Academy"
        className="h-[3.5em] w-auto max-w-none shrink-0"
        draggable="false"
      />
    </span>
  );
}
