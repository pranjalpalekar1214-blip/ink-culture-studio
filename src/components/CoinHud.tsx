import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { getCoins } from "@/lib/arcade";

/**
 * CoinHud — tiny arcade score display fixed under the navbar on the right.
 * Bounces +1 on every coin event; flashes "1UP!" at every 100-coin milestone.
 */
export function CoinHud() {
  const reduce = useReducedMotion();
  const [coins, setCoins] = useState(() => getCoins());
  const [bumpKey, setBumpKey] = useState(0);
  const [oneUp, setOneUp] = useState(false);

  useEffect(() => {
    const onCoins = (e: Event) => {
      const total = (e as CustomEvent<number>).detail;
      setBumpKey((k) => k + 1);
      setCoins((before) => {
        if (!reduce && Math.floor(total / 100) > Math.floor(before / 100)) {
          setOneUp(true);
          window.setTimeout(() => setOneUp(false), 1600);
        }
        return total;
      });
    };
    window.addEventListener("sc:coins", onCoins);
    return () => window.removeEventListener("sc:coins", onCoins);
  }, [reduce]);

  return (
    <div
      className="pointer-events-none fixed right-4 top-[72px] z-[60] md:right-8 md:top-[80px]"
      aria-live="polite"
    >
      <div className="flex items-center gap-2 border-2 border-ink bg-ink/90 px-2.5 py-1.5 shadow-[3px_3px_0_0_rgba(0,0,0,0.5)] backdrop-blur-sm">
        <motion.span
          key={bumpKey}
          className="block h-4 w-3.5 rounded-[2px] border-2 border-[#141414] bg-[#ffd94a] shadow-[inset_0_-2px_0_#c9a227]"
          initial={reduce ? false : { y: 0, scale: 1 }}
          animate={reduce ? {} : { y: [0, -5, 0], scale: [1, 1.25, 1] }}
          transition={{ duration: 0.35 }}
        />
        <span className="font-mono text-[11px] font-bold tracking-widest text-bone">
          ×{String(coins).padStart(2, "0")}
        </span>
      </div>

      <AnimatePresence>
        {oneUp && (
          <motion.p
            className="absolute right-0 top-9 font-display text-lg uppercase tracking-widest text-[#ffd94a]"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.8 }}
            animate={reduce ? { opacity: 0 } : { opacity: [0, 1, 1, 0], y: [4, -8, -16, -24], scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, times: [0, 0.15, 0.7, 1] }}
          >
            1UP!
          </motion.p>
        )}
      </AnimatePresence>
      <span className="sr-only">{coins} coins collected</span>
    </div>
  );
}
