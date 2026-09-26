import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router";
import { addCoins } from "@/lib/arcade";
import { cn } from "@/lib/utils";

/**
 * PixelButton — CTA styled as a pixelated Mario block: bevel edges,
 * corner rivets, chunky shadow. Pressing it bumps the block and pops
 * a coin into the on-screen score. Renders as Link / a / button.
 */

/** Pixel-art coin that pops out of the button on press. */
function CoinPop({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute left-1/2 -top-1 z-20"
      initial={{ x: "-50%", y: 0, opacity: 1 }}
      animate={{ y: -38, opacity: [1, 1, 0], scaleX: [1, 0.35, 1] }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <span className="block h-5 w-4 rounded-[2px] border-2 border-[#141414] bg-[#ffd94a] shadow-[inset_0_-2px_0_#c9a227]" />
    </motion.span>
  );
}

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
  const reduce = useReducedMotion();
  const [pop, setPop] = useState(false);
  const timer = useRef(0);

  const fire = () => {
    if (disabled) return;
    if (!reduce) {
      setPop(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setPop(false), 550);
    }
    addCoins(1);
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
      <CoinPop show={pop} />
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
