import { cn } from "@/lib/utils";

/**
 * Brand emblem — faithful vector recreation of the studio's logo mark:
 * the hexagram-heart (two interlocked circles forming the heart, full
 * hexagram star beneath) inside a solid ring. Uses currentColor so it can
 * be tinted per context. The inner mark does a full spin on group hover.
 */
export function BrandMark({
  className,
  markClassName,
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      {/* solid outer ring */}
      <circle cx="32" cy="32" r="26.5" fill="none" stroke="currentColor" strokeWidth="5" />
      {/* hexagram-heart mark (spins on hover) */}
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "[transform-box:fill-box] origin-center transition-transform duration-700 ease-out",
          markClassName,
        )}
      >
        {/* heart — two interlocked circles */}
        <circle cx="25" cy="23.5" r="10.5" />
        <circle cx="39" cy="23.5" r="10.5" />
        {/* hexagram — downward + upward triangles */}
        <path d="M13 21 L51 21 L32 54 Z" />
        <path d="M32 14 L47 39.5 L17 39.5 Z" />
      </g>
    </svg>
  );
}

/**
 * Full identity lockup: [badge] STREET CULTURE / TATTOO AND ACADEMY.
 * Scales from a single root font-size (all inner sizing is in em), so
 * `<BrandLogo className="text-sm" />` … `text-3xl` gives nav → hero sizes.
 * Hover: the hexagram-heart spins, CULTURE throws a hard offset shadow.
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
        className="size-[2.35em] shrink-0 text-blood drop-shadow-[0_0_8px_rgba(245,197,24,0.35)]"
        markClassName="group-hover/brand:rotate-[360deg]"
      />
      <span aria-hidden="true" className="flex flex-col">
        <span className="text-[1.6em] font-bold uppercase leading-[0.85] tracking-[0.02em] text-bone">
          Street
          <span className="text-blood transition-[text-shadow] duration-300 group-hover/brand:[text-shadow:3px_3px_0_rgba(245,197,24,0.3)]">
            Culture
          </span>
        </span>
        <span className="mt-[0.22em] text-[0.58em] font-semibold uppercase leading-none tracking-[0.4em] text-bone/70">
          Tattoo <span className="text-blood">and</span> Academy
        </span>
      </span>
    </span>
  );
}
