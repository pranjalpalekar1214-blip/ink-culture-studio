import { cn } from "@/lib/utils";

type BrandLogoProps = { className?: string };

const brandMarkSrc = "/images/sct-logo-white.png";

/** Standalone inline badge mark used where the full wordmark is too heavy. */
export function BrandMark({ className }: BrandLogoProps) {
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

/** Image-backed mark retained for contexts that need the supplied logo asset. */
export function BrandImage({ className }: BrandLogoProps) {
  return (
    <img
      src={brandMarkSrc}
      alt="Street Culture Tattoo and Academy"
      className={cn("h-16 w-auto object-contain opacity-75", className)}
      draggable="false"
    />
  );
}

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <span
      className={cn(
        "inline-flex select-none items-center gap-[0.65em] font-body uppercase",
        className,
      )}
    >
      <span className="sr-only">Street Culture - Tattoo and Academy</span>

      <img
        src={brandMarkSrc}
        alt="Street Culture Tattoo and Academy"
        className="h-[2.75em] w-auto shrink-0 object-contain opacity-75"
        draggable="false"
      />

      <span aria-hidden="true" className="flex flex-col">
        <span className="font-display text-[1.6em] font-black uppercase leading-[0.85] tracking-[0.04em] text-bone">
          Street Culture
        </span>

        <span className="mt-[0.35em] text-[0.6em] font-bold uppercase leading-none tracking-[0.42em] text-bone/75">
          Tattoo <span className="text-bone/75">and</span> Academy
        </span>
      </span>
    </span>
  );
}
