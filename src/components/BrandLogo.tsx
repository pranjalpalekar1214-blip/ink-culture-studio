import { cn } from "@/lib/utils";

/**
 * Standalone badge mark (the "hexagram-heart" emblem from /logo.svg),
 * drawn inline so it inherits currentColor and scales with className.
 * Used on its own where the full wordmark lockup would be too heavy
 * (e.g. the Intro splash).
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden className={className}>
      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="7" />
      <circle cx="35" cy="32" r="21" stroke="currentColor" strokeWidth="6.5" />
      <circle cx="65" cy="32" r="21" stroke="currentColor" strokeWidth="6.5" />
      <path
        d="M50 17 L90.5 60 L50 88 L9.5 60 Z"
        stroke="currentColor"
        strokeWidth="6.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
