import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLockBody } from "./ui-kit";

/**
 * Page-load sequence: black screen → hand-drawn ink line → wordmark reveal
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
            {/* hand-drawn ink line */}
            <svg viewBox="0 0 260 40" className="h-10 w-64 text-blood" fill="none">
              <motion.path
                d="M8 26 C 60 8, 96 36, 138 20 C 172 8, 210 18, 252 14"
                stroke="currentColor"
                strokeWidth="3.4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, ease: "easeInOut", delay: 0.2 }}
              />
              <motion.circle
                cx="248" cy="14" r="4" fill="currentColor"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, duration: 0.25 }}
              />
            </svg>

            <div className="mt-5 overflow-hidden">
              <motion.p
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-3xl font-bold uppercase tracking-[0.14em] text-bone sm:text-4xl"
              >
                Street<span className="text-blood">Culture</span>
              </motion.p>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.4 }}
              className="mt-3 text-[10px] uppercase tracking-[0.5em] text-bone/50"
            >
              Ink is culture
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
