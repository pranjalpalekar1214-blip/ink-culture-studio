import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { DISCOUNT_GOAL, getCoins, getHeldDiscount } from "@/lib/arcade";
import { cn } from "@/lib/utils";

/**
 * PixelCloud — a pixel-art cloud that hovers over the hero question block
 * and explains the arcade: collect coins → every 30 coins unlocks a mystery
 * 5–35% discount on your booking. Switches to "unlocked" state showing the
 * held discount code.
 */
export function PixelCloud({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [coins, setCoins] = useState(() => getCoins());
  const [held, setHeld] = useState(() => getHeldDiscount());

  useEffect(() => {
    const onCoins = (e: Event) => setCoins((e as CustomEvent<number>).detail);
    const onDiscount = () => setHeld(getHeldDiscount());
    window.addEventListener("sc:coins", onCoins);
    window.addEventListener("sc:discount", onDiscount);
    return () => {
      window.removeEventListener("sc:coins", onCoins);
      window.removeEventListener("sc:discount", onDiscount);
    };
  }, []);

  const progress = Math.min(coins / DISCOUNT_GOAL, 1);
  const cells = 10;

  return (
    <motion.div
      aria-live="polite"
      className={cn("pointer-events-none select-none", className)}
      animate={reduce ? {} : { y: [0, -5, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* speech panel */}
      <div className="relative border-2 border-ink bg-ink/95 px-3 py-2.5 shadow-[4px_4px_0_0_rgba(0,0,0,0.45)]">
        {held ? (
          <>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#ffd94a]">
              Mystery block unlocked!
            </p>
            <p className="mt-1 font-display text-xl uppercase leading-none text-bone">
              {held.percent}% <span className="text-[10px] tracking-[0.2em] text-bone/60">off your booking</span>
            </p>
            <p className="mt-1 font-mono text-[9px] tracking-[0.14em] text-bone/75">CODE {held.code}</p>
            <p className="mt-1 text-[8px] uppercase tracking-[0.18em] text-bone/45">Auto-attached at booking →</p>
          </>
        ) : (
          <>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-bone">Collect coins!</p>
            <p className="mt-1 text-[8.5px] leading-snug text-bone/65">
              Hit buttons &amp; blocks — every {DISCOUNT_GOAL} coins unlocks a mystery{" "}
              <span className="font-semibold text-blood">5–35% discount</span> on your booking.
            </p>
            <div className="mt-1.5 flex items-center gap-1.5">
              <div className="flex flex-1 gap-[2px]" aria-hidden>
                {Array.from({ length: cells }).map((_, i) => (
                  <span
                    key={i}
                    className={cn("h-2 flex-1", i < Math.round(progress * cells) ? "bg-[#ffd94a]" : "bg-bone/15")}
                  />
                ))}
              </div>
              <span className="font-mono text-[8px] text-bone/60">
                {coins}/{DISCOUNT_GOAL}
              </span>
            </div>
          </>
        )}
      </div>

      {/* pixel cloud + tail pointing down at the block */}
      <svg
        viewBox="0 0 104 58"
        shapeRendering="crispEdges"
        className="mt-1 h-auto w-full drop-shadow-[3px_3px_0_rgba(0,0,0,0.45)]"
        aria-hidden
      >
        <path
          d="M8 46 V30 H16 V22 H30 V14 H46 V8 H66 V14 H82 V22 H90 V30 H98 V46 Z"
          fill="var(--bone)"
          stroke="var(--ink)"
          strokeWidth="3"
        />
        {/* face */}
        <rect x="32" y="28" width="5" height="6" fill="var(--ink)" />
        <rect x="58" y="28" width="5" height="6" fill="var(--ink)" />
        <rect x="40" y="38" width="16" height="3" fill="var(--ink)" />
        {/* shine */}
        <rect x="20" y="18" width="9" height="4" fill="#ffffff" opacity="0.65" />
        {/* tail down to the block */}
        <rect x="48" y="46" width="8" height="5" fill="var(--ink)" />
        <rect x="51" y="51" width="2" height="6" fill="var(--ink)" />
      </svg>
    </motion.div>
  );
}
