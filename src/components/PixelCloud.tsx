import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * PixelCloud — a medium silent pixel cloud that drifts around the site.
 * Visitors see a cute mascot; it quietly wanders toward their clicks as
 * part of the invisible Mystery Box engine. No copy, no counters —
 * the mechanic stays secret until the booking reveal.
 */

const SIZE = 72; // px — medium mascot, big enough to notice, small enough to ignore

export function PixelCloud({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [blink, setBlink] = useState(false);
  const [hop, setHop] = useState(0);

  // Drift target — the cloud floats near its last rest spot and glides
  // toward wherever the visitor interacts.
  const x = useMotionValue(typeof window !== "undefined" ? window.innerWidth - 84 : 0);
  const y = useMotionValue(typeof window !== "undefined" ? window.innerHeight - 150 : 0);
  const sx = useSpring(x, { stiffness: 90, damping: 16, mass: 0.7 });
  const sy = useSpring(y, { stiffness: 90, damping: 16, mass: 0.7 });

  useEffect(() => {
    if (reduce) return;
    const onDown = (e: PointerEvent) => {
      const pad = 40;
      const tx = Math.min(Math.max(e.clientX + 34, pad), window.innerWidth - SIZE - pad);
      const ty = Math.min(Math.max(e.clientY - 74, pad + 60), window.innerHeight - SIZE - pad);
      x.set(tx);
      y.set(ty);
      setHop((h) => h + 1);
    };
    document.addEventListener("pointerdown", onDown, { capture: true });
    return () => document.removeEventListener("pointerdown", onDown, { capture: true });
  }, [x, y, reduce]);

  useEffect(() => {
    if (reduce) return;
    const drift = window.setInterval(() => {
      const pad = 40;
      x.set(Math.max(pad, Math.min(window.innerWidth - SIZE - pad, x.get() + (Math.random() > 0.5 ? 42 : -42))));
      y.set(Math.max(pad + 60, Math.min(window.innerHeight - SIZE - pad, y.get() + (Math.random() > 0.5 ? 24 : -24))));
      setHop((value) => value + 1);
    }, 3600);
    return () => window.clearInterval(drift);
  }, [reduce, x, y]);

  // occasional blink so it feels alive
  useEffect(() => {
    if (reduce) return;
    const t = window.setInterval(() => {
      setBlink(true);
      window.setTimeout(() => setBlink(false), 140);
    }, 4200);
    return () => window.clearInterval(t);
  }, [reduce]);

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none fixed left-0 top-0 z-[65] ${className ?? ""}`}
      style={{ x: reduce ? undefined : sx, y: reduce ? undefined : sy }}
    >
      <motion.div
        key={reduce ? "static" : undefined}
        animate={reduce ? {} : { y: [0, -3, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.svg
          key={hop}
          viewBox="0 0 96 60"
          shapeRendering="crispEdges"
          style={{ width: SIZE, height: "auto" }}
          className="drop-shadow-[2px_2px_0_rgba(0,0,0,0.4)]"
          initial={reduce ? false : { scale: 1 }}
          animate={reduce ? {} : { scale: [1, 1.12, 1] }}
          transition={{ duration: 0.35 }}
        >
          {/* cloud body */}
          <path
            d="M10 50 V36 H18 V28 H30 V20 H44 V14 H62 V20 H74 V28 H84 V36 H90 V50 Z"
            fill="transparent"
            stroke="var(--ink)"
            strokeWidth="3"
          />
          {/* shine */}
          <rect x="22" y="24" width="8" height="4" fill="#ffffff" opacity="0.6" />
          {/* eyes */}
          {blink ? (
            <>
              <rect x="34" y="32" width="7" height="2" fill="var(--ink)" />
              <rect x="58" y="32" width="7" height="2" fill="var(--ink)" />
            </>
          ) : (
            <>
              <rect x="34" y="30" width="5" height="6" fill="var(--ink)" />
              <rect x="58" y="30" width="5" height="6" fill="var(--ink)" />
            </>
          )}
          {/* mouth */}
          <rect x="44" y="41" width="10" height="3" fill="var(--ink)" />
        </motion.svg>
      </motion.div>
    </motion.div>
  );
}
