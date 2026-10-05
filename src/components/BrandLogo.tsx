import { cn } from "@/lib/utils";

type BrandLogoProps = { className?: string };

const brandMarkSrc =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20icon-PLLW2xOjeNkZ6RaiVasReNC2CrkySE.png";

export function BrandMark({ className }: BrandLogoProps) {
  return (
    <img
      src={brandMarkSrc}
      alt="Street Culture Tattoo and Academy"
      className={cn("size-16 object-contain", className)}
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
        src={brandMarkSrc}
        alt="Street Culture Tattoo and Academy"
        className="size-[3.5em] shrink-0 object-contain"
        draggable="false"
      />

      <span aria-hidden="true" className="flex flex-col">
        <span className="text-[1.6em] font-medium uppercase leading-[0.95] tracking-[-0.04em]">
          Street Culture
        </span>

        <span className="mt-[0.35em] text-[0.6em] font-medium uppercase leading-none tracking-[0.42em] text-bone/80">
          Tattoo <span className="text-bone">and</span> Academy
        </span>
      </span>
    </span>
  );
}
