import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { BrandMark } from "./BrandLogo";
import { useLockBody } from "./ui-kit";

/**
 * Page-load sequence: black screen → badge pops in → wordmark reveal
 * → wipe transition into the site. Runs once per browser session and is
 * skipped entirely for prefers-reduced-motion.
 */
export function Intro() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(() => {
    if (typeof window === "undefined") return true;
    return sessionStorage.getItem("sc-intro-seen") === "1";
  });

  const active = !done && !reduce;
  useLockBody(active);

  useEffect(() => {
    if (done || reduce) return;
    const t = setTimeout(() => {
      sessionStorage.setItem("sc-intro-seen", "1");
      setDone(true);
    }, 2300);
    return () => clearTimeout(t);
  }, [done, reduce]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          <div className="flex flex-col items-center">
            {/* hexagram-heart badge pops in, then the lockup below */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-bone"
            >
              <BrandMark className="size-20 drop-shadow-[0_0_14px_rgba(241,237,228,0.35)] sm:size-24" />
            </motion.div>

            <div className="mt-5 overflow-hidden">
              <motion.p
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-4xl font-bold uppercase leading-[0.9] tracking-[0.06em] text-bone sm:text-6xl"
              >
                Street<span className="text-blood">Culture</span>
              </motion.p>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.4 }}
              className="mt-3 font-display text-[11px] uppercase tracking-[0.5em] text-bone/70 sm:text-xs"
            >
              Tattoo <span className="text-blood">and</span> Academy
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
