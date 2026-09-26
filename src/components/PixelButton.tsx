import { useRef } from "react";
import { Link } from "react-router";
import { trackPress } from "@/lib/mystery";
import { cn } from "@/lib/utils";

/**
 * PixelButton — CTA styled as a pixelated Mario block: bevel edges,
 * corner rivets, chunky shadow, squash-on-press. Renders as Link / a /
 * button. No visible game mechanics — presses feed the Mystery Box engine.
 */
export function PixelButton({
  children,
  href,
  onClick,
  external,
  className,
  ariaLabel,
  type = "button",
  disabled,
  size = "md",
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const pressed = useRef(false);

  const fire = () => {
    if (disabled || pressed.current) return;
    pressed.current = true;
    window.setTimeout(() => (pressed.current = false), 250);
    trackPress("cta");
    onClick?.();
  };

  const sizes = {
    sm: "px-4 py-2 text-[11px]",
    md: "px-6 py-3 text-xs",
    lg: "px-8 py-4 text-sm",
  } as const;

  const base =
    "group/px relative inline-flex select-none items-center justify-center gap-2 border-2 border-ink font-display font-semibold uppercase tracking-[0.1em] text-ink";
  const skin = [
    "bg-blood",
    "shadow-[4px_4px_0_0_#e8e2d5]",
    "transition-[transform,box-shadow] duration-150",
    "hover:-translate-y-[3px] hover:shadow-[7px_7px_0_0_#e8e2d5]",
    "active:translate-x-[2px] active:translate-y-[3px] active:shadow-[0px_0px_0_0_#e8e2d5]",
  ].join(" ");

  const cls = cn(base, skin, sizes[size], className);

  const inner = (
    <>
      {/* bevel highlight + corner rivets */}
      <span aria-hidden className="pointer-events-none absolute inset-[2px] border border-[#ffdf6b]/50" />
      <span aria-hidden className="pointer-events-none absolute left-1 top-1 size-[5px] bg-[#141414]/85" />
      <span aria-hidden className="pointer-events-none absolute right-1 top-1 size-[5px] bg-[#141414]/85" />
      <span aria-hidden className="pointer-events-none absolute bottom-1 left-1 size-[5px] bg-[#141414]/85" />
      <span aria-hidden className="pointer-events-none absolute bottom-1 right-1 size-[5px] bg-[#141414]/85" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} className={cls} onClick={fire} data-pixel-btn>
        {inner}
      </a>
    );
  }
  if (href) {
    return (
      <Link to={href} aria-label={ariaLabel} className={cls} onClick={fire} data-pixel-btn>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} disabled={disabled} onClick={fire} aria-label={ariaLabel} className={cls} data-pixel-btn>
      {inner}
    </button>
  );
}
