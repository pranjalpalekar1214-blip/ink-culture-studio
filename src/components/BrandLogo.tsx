import { cn } from "@/lib/utils";

/**
 * Brand emblem — bold star badge inside a broken ring (diagonal notches),
 * echoing the studio's circular badge mark. Uses currentColor so it can be
 * tinted per context. The star spins one point (72°) on group hover.
 */
export function BrandMark({
  className,
  starClassName,
}: {
  className?: string;
  starClassName?: string;
}) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <circle
        cx="24"
        cy="24"
        r="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeDasharray="13.7 4 27.4 4 27.4 4 27.4 4 13.7"
      />
      <path
        d="M24 7.5 28.1 18.3 39.7 18.9 30.7 26.2 33.7 37.4 24 31 14.3 37.4 17.3 26.2 8.3 18.9 19.9 18.3Z"
        fill="currentColor"
        className={cn(
          "[transform-box:fill-box] origin-center transition-transform duration-500 ease-out",
          starClassName,
        )}
      />
    </svg>
  );
}

/**
 * Full identity lockup: [badge] STREET CULTURE / TATTOO AND ACADEMY.
 * Scales from a single root font-size (all inner sizing is in em), so
 * `<BrandLogo className="text-sm" />` … `text-3xl` gives nav → hero sizes.
 * Hover: star spins a point, CULTURE throws a hard offset shadow.
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
        starClassName="group-hover/brand:rotate-[72deg] motion-reduce:transition-none motion-reduce:group-hover/brand:rotate-0"
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
