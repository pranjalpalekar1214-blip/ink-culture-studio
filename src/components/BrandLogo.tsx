import { cn } from "@/lib/utils";

/**
 * Brand emblem — static recreation of the studio's supplied logo: the
 * heartagram (two heart-lobe circles over an interlocked diamond) inside a
 * solid ring, with bold thick strokes and the mark filling the ring the way
 * the original artwork does. Monochrome via currentColor. No animations or
 * effects.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      {/* solid outer ring */}
      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" />
      {/* heartagram mark — fills the ring, minimal margin like the original */}
      <g fill="none" stroke="currentColor" strokeWidth="6.5">
        {/* heart lobes — two overlapping circles */}
        <circle cx="36" cy="33" r="20" />
        <circle cx="64" cy="33" r="20" />
        {/* interlocked diamond — upward + downward triangle sharing the mid chord */}
        <path d="M50 19.5 L81.5 54 L50 82 L18.5 54 Z" />
      </g>
    </svg>
  );
}

/**
 * Full identity lockup: [badge] STREET CULTURE / TATTOO AND ACADEMY.
 * Monochrome bone/white to match the supplied artwork, static — no hover
 * effects. Scales from a single root font-size (all inner sizing is in em),
 * so `<BrandLogo className="text-sm" />` … `text-3xl` gives nav → hero
 * sizes.
 */
export function BrandLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex select-none items-center gap-[0.75em] font-display uppercase",
        className,
      )}
    >
      <span className="sr-only">Street Culture — Tattoo and Academy</span>
      <BrandMark className="size-[2.75em] shrink-0 text-bone" />
      <span aria-hidden="true" className="flex flex-col">
        <span className="text-[1.6em] font-bold uppercase leading-[0.95] tracking-[0.04em] text-bone">
          Street Culture
        </span>
        <span className="mt-[0.35em] text-[0.6em] font-semibold uppercase leading-none tracking-[0.42em] text-bone/80">
          Tattoo <span className="text-bone">and</span> Academy
        </span>
      </span>
    </span>
  );
}
