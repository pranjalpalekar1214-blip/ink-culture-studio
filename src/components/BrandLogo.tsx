import { cn } from "@/lib/utils";

/**
 * Brand emblem — faithful vector recreation of the studio's supplied logo:
 * the heartagram (two heart-lobe circles over an interlocked diamond formed
 * by an upward + downward triangle sharing the mid chord) inside a solid
 * ring. Monochrome via currentColor. The inner mark does a full spin on
 * group hover.
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
      <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" />
      {/* heartagram mark (spins on hover) */}
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="5.5"
        className={cn(
          "[transform-box:fill-box] origin-center transition-transform duration-700 ease-out",
          markClassName,
        )}
      >
        {/* heart lobes — two overlapping circles */}
        <circle cx="36" cy="33" r="21" />
        <circle cx="64" cy="33" r="21" />
        {/* interlocked diamond — upward + downward triangle sharing the mid chord */}
        <path d="M50 18.5 L86.9 59 L50 88 L13.1 59 Z" />
      </g>
    </svg>
  );
}

/**
 * Full identity lockup: [badge] STREET CULTURE / TATTOO AND ACADEMY.
 * Monochrome bone/white to match the supplied artwork. Scales from a
 * single root font-size (all inner sizing is in em), so
 * `<BrandLogo className="text-sm" />` … `text-3xl` gives nav → hero sizes.
 * Hover: the heartagram spins, the wordmark throws a hard offset shadow.
 */
export function BrandLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "group/brand inline-flex select-none items-center gap-[0.5em] font-display uppercase",
        className,
      )}
    >
      <span className="sr-only">Street Culture — Tattoo and Academy</span>
      <BrandMark
        className="size-[2.35em] shrink-0 text-bone"
        markClassName="group-hover/brand:rotate-[360deg]"
      />
      <span aria-hidden="true" className="flex flex-col">
        <span className="text-[1.6em] font-bold uppercase leading-[0.85] tracking-[0.02em] text-bone transition-[text-shadow] duration-300 group-hover/brand:[text-shadow:3px_3px_0_rgba(241,237,228,0.25)]">
          Street Culture
        </span>
        <span className="mt-[0.22em] text-[0.58em] font-semibold uppercase leading-none tracking-[0.4em] text-bone/75">
          Tattoo <span className="text-bone">and</span> Academy
        </span>
      </span>
    </span>
  );
}
