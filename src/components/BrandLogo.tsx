import { cn } from "@/lib/utils";

/**
 * Brand emblem — faithful vector recreation of the studio's supplied logo:
 * the heartagram (two heart-lobe circles over an interlocked diamond) inside
 * a solid ring. Generous padding between the mark and the ring so the
 * silhouette reads clearly at any size. Monochrome via currentColor. The
 * inner mark does a full spin on group hover.
 */
export function BrandMark({
  className,
  markClassName,
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      {/* solid outer ring */}
      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="7" />
      {/* heartagram mark (spins on hover) — kept well clear of the ring */}
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        className={cn(
          "[transform-box:fill-box] origin-center transition-transform duration-700 ease-out",
          markClassName,
        )}
      >
        {/* heart lobes — two overlapping circles */}
        <circle cx="37" cy="35.5" r="17" />
        <circle cx="63" cy="35.5" r="17" />
        {/* interlocked diamond — upward + downward triangle sharing the mid chord */}
        <path d="M50 23 L78.9 54.5 L50 79 L21.1 54.5 Z" />
      </g>
    </svg>
  );
}

/**
 * Full identity lockup: [badge] STREET CULTURE / TATTOO AND ACADEMY.
 * Monochrome bone/white to match the supplied artwork, with open, airy
 * spacing. Scales from a single root font-size (all inner sizing is in em),
 * so `<BrandLogo className="text-sm" />` … `text-3xl` gives nav → hero
 * sizes. Hover: the heartagram spins, the wordmark throws a soft glow.
 */
export function BrandLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "group/brand inline-flex select-none items-center gap-[0.75em] font-display uppercase",
        className,
      )}
    >
      <span className="sr-only">Street Culture — Tattoo and Academy</span>
      <BrandMark
        className="size-[2.75em] shrink-0"
        markClassName="group-hover/brand:rotate-[360deg]"
      />
      <span aria-hidden="true" className="flex flex-col">
        <span className="text-[1.6em] font-bold uppercase leading-[0.95] tracking-[0.04em] text-bone transition-[text-shadow] duration-300 group-hover/brand:[text-shadow:0_0_18px_rgba(241,237,228,0.35)]">
          Street Culture
        </span>
        <span className="mt-[0.35em] text-[0.6em] font-semibold uppercase leading-none tracking-[0.42em] text-bone/80">
          Tattoo <span className="text-bone">and</span> Academy
        </span>
      </span>
    </span>
  );
}
