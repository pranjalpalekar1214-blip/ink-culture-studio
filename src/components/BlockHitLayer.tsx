import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { trackPress } from "@/lib/mystery";

/**
 * Global "hit the block" juice — every interactive control bumps like a
 * Mario block and throws pixel shards. Purely cosmetic: no coins, no
 * counters, no rewards are shown. It also feeds the invisible Mystery Box
 * engine with interaction signals.
 */

const INTERACTIVE = 'a, button, [role="button"], summary, label';
const BURST_LIFE = 700;

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

/** Pixel shards popping from the press point. */
function PixelBurst({ x, y }: { x: number; y: number }) {
  const shards = [
    { dx: -24, dy: -32, size: 6, color: "#f5c518" },
    { dx: 22, dy: -36, size: 5, color: "#c9a227" },
    { dx: -32, dy: -10, size: 5, color: "#fff3c4" },
    { dx: 32, dy: -12, size: 6, color: "#f5c518" },
    { dx: 0, dy: -48, size: 4, color: "#e8e2d5" },
  ];
  return (
    <div className="absolute" style={{ left: x, top: y }}>
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
          transition={{ duration: 0.5 + i * 0.04, ease: "easeOut" }}
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

    const bump = (el: Element) => {
      if (el.classList.contains("sc-block-hit")) return;
      el.classList.add("sc-block-hit");
      window.setTimeout(() => el.classList.remove("sc-block-hit"), 320);
    };

    const onPointerDown = (e: PointerEvent) => {
      if (reduced()) return;
      const target = e.target as HTMLElement | null;
      // The hero block has its own richer effect — skip it here.
      if (target?.closest?.("[data-block-native]")) return;
      const el = target?.closest?.(INTERACTIVE);
      if (!el) return;
      bump(el);
      spawn(e.clientX, e.clientY);
      trackPress("cta");
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      if (reduced()) return;
      const el = document.activeElement;
      if (!el || !el.matches?.(INTERACTIVE)) return;
      const r = el.getBoundingClientRect();
      bump(el);
      spawn(r.left + r.width / 2, r.top + r.height / 2);
      trackPress("cta");
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
