import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { BrandLogo } from "./BrandLogo";
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
    }, 900);
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
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="text-base sm:text-xl"
            >
              <BrandLogo />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
