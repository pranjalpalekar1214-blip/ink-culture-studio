import { cn } from "@/lib/utils";

type BrandLogoProps = { className?: string };

const brandMarkSrc = "/images/sct-logo-white.png";

export function BrandMark({ className }: BrandLogoProps) {
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
        <span className="font-display text-[1.6em] font-semibold uppercase leading-[0.95] tracking-[0.12em] text-bone/90 [text-shadow:0_2px_3px_rgba(0,0,0,0.8),0_0_10px_rgba(235,231,224,0.2)]">
          Street Culture
        </span>

        <span className="mt-[0.35em] text-[0.6em] font-normal uppercase leading-none tracking-[0.42em] text-bone/65">
          Tattoo <span className="text-bone/75">and</span> Academy
        </span>
      </span>
    </span>
  );
}
