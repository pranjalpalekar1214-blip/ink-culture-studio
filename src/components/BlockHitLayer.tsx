import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { addCoins, checkDiscountUnlock } from "@/lib/arcade";

/**
 * Global "hit the block" FX — every interactive control on the site reacts
 * like a Mario question block: the element bumps when pressed and a coin
 * + pixel shards pop out at the click point.
 *
 * Mounted once in the site layout; fully pointer-events-none and
 * disabled for prefers-reduced-motion users.
 */

const INTERACTIVE = 'a, button, [role="button"], summary, label';
const BURST_LIFE = 750;

type Burst = { id: number; x: number; y: number };

/** Inject the shared bump keyframes once. */
function ensureStyles() {
  if (document.getElementById("sc-block-fx-style")) return;
  const style = document.createElement("style");
  style.id = "sc-block-fx-style";
  style.textContent = `
    @keyframes sc-block-bump {
      0% { transform: translateY(0); }
      35% { transform: translateY(-7px) scale(0.98); }
      70% { transform: translateY(2px); }
      100% { transform: translateY(0); }
    }
    .sc-block-hit { animation: sc-block-bump 0.3s cubic-bezier(0.22, 1, 0.36, 1) both; }
  `;
  document.head.appendChild(style);
}

/** Coin + pixel shards popping out of the press point. */
function PixelBurst({ x, y }: { x: number; y: number }) {
  const shards = [
    { dx: -24, dy: -32, size: 6, color: "#ffd94a" },
    { dx: 22, dy: -36, size: 5, color: "#c9a227" },
    { dx: -32, dy: -10, size: 5, color: "#fff3c4" },
    { dx: 32, dy: -12, size: 6, color: "#ffd94a" },
    { dx: 0, dy: -48, size: 4, color: "#e8e2d5" },
  ];
  return (
    <div className="absolute" style={{ left: x, top: y }}>
      {/* +1 score popup */}
      <motion.span
        className="absolute -translate-x-1/2 font-mono text-[11px] font-bold tracking-widest text-[#ffd94a]"
        style={{ textShadow: "1px 1px 0 #141414" }}
        initial={{ x: "-50%", y: -34, opacity: 1 }}
        animate={{ y: -64, opacity: [1, 1, 0] }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        +1
      </motion.span>
      {/* coin */}
      <motion.span
        className="absolute h-5 w-4 rounded-[2px] border-2 border-[#141414] bg-[#ffd94a] shadow-[inset_0_-2px_0_#c9a227]"
        initial={{ x: -8, y: 0, opacity: 1, scaleX: 1 }}
        animate={{ x: -8, y: [0, -44, -32], opacity: [1, 1, 0], scaleX: [1, 0.35, 1] }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />
      {/* pixel shards */}
      {shards.map((s, i) => (
        <motion.span
          key={i}
          className="absolute"
          style={{ width: s.size, height: s.size, background: s.color }}
          initial={{ x: -s.size / 2, y: -s.size / 2, opacity: 1 }}
          animate={{
            x: [-s.size / 2, s.dx - s.size / 2, s.dx - s.size / 2],
            y: [-s.size / 2, s.dy - s.size / 2, s.dy + 12 - s.size / 2],
            opacity: [1, 1, 0],
          }}
          transition={{ duration: 0.55 + i * 0.04, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

/** Press feedback layer — mount once near the app root. */
export function BlockHitLayer() {
  const [bursts, setBursts] = useState<Burst[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    ensureStyles();

    const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const spawn = (x: number, y: number) => {
      const id = ++idRef.current;
      setBursts((b) => [...b.slice(-7), { id, x, y }]);
      window.setTimeout(() => setBursts((b) => b.filter((p) => p.id !== id)), BURST_LIFE);
    };

    /** Score a coin, then check whether it unlocked a mystery discount. */
    const score = (n = 1) => {
      addCoins(n);
      checkDiscountUnlock();
    };

    const bump = (el: Element) => {
      if (el.classList.contains("sc-block-hit")) return;
      el.classList.add("sc-block-hit");
      window.setTimeout(() => el.classList.remove("sc-block-hit"), 320);
    };

    const onPointerDown = (e: PointerEvent) => {
      if (reduced()) return;
      const target = e.target as HTMLElement | null;
      // Elements with their own richer block FX (e.g. hero "?" block) handle everything themselves.
      if (target?.closest?.("[data-block-native]")) return;
      const el = target?.closest?.(INTERACTIVE);
      if (!el) return;
      bump(el);
      spawn(e.clientX, e.clientY);
      // PixelButtons score their own coin — avoid double-counting.
      if (!target?.closest?.("[data-pixel-btn]")) score(1);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      if (reduced()) return;
      const el = document.activeElement;
      if (!el || !el.matches?.(INTERACTIVE)) return;
      const r = el.getBoundingClientRect();
      bump(el);
      spawn(r.left + r.width / 2, r.top + r.height / 2);
      if (!el.closest?.("[data-pixel-btn]")) score(1);
    };

    document.addEventListener("pointerdown", onPointerDown, { capture: true });
    document.addEventListener("keydown", onKeyDown, { capture: true });
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, { capture: true });
      document.removeEventListener("keydown", onKeyDown, { capture: true });
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
      <AnimatePresence>
        {bursts.map((b) => (
          <PixelBurst key={b.id} x={b.x} y={b.y} />
        ))}
      </AnimatePresence>
    </div>
  );
}
