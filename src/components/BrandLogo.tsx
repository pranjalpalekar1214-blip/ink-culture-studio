import { cn } from "@/lib/utils";

type BrandLogoProps = { className?: string };

export function BrandMark({ className }: BrandLogoProps) {
  return (
    <img
      src="/logo.png"
      alt="Street Culture Tattoo and Academy"
      className={cn("size-12 object-contain", className)}
      draggable="false"
    />
  );
}

export function BrandLogo({ className }: BrandLogoProps) {
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
