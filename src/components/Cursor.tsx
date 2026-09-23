import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useMediaQuery } from "@/hooks/use-seo";

type CursorState = { label: string | null; variant: "default" | "view" };

const CursorCtx = createContext<{
  setLabel: (label: string | null, variant?: "default" | "view") => void;
}>({ setLabel: () => {} });

export const useCursor = () => useContext(CursorCtx);

export function CursorProvider({ children }: { children: ReactNode }) {
  const fine = useMediaQuery("(pointer: fine)");
  const [state, setState] = useState<CursorState>({ label: null, variant: "default" });

  const setLabel = useCallback((label: string | null, variant: "default" | "view" = label ? "view" : "default") => {
    setState({ label, variant });
  }, []);

  return (
    <CursorCtx.Provider value={{ setLabel }}>
      {children}
      {fine && <CursorDot label={state.label} variant={state.variant} />}
    </CursorCtx.Provider>
  );
}

function CursorDot({ label, variant }: CursorState) {
  const dotRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    let raf = 0;
    let tx = 0, ty = 0, x = 0, y = 0;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      setVisible(true);
      if (document.body.dataset.cursorHidden !== "1") {
        document.body.dataset.cursorHidden = "1";
        document.body.style.cursor = "none";
      }
    };

    // Let native cursor show over form fields & text inputs
    const isFormField = (el: EventTarget | null) =>
      el instanceof Element && !!el.closest("input, textarea, select");
    const onOver = (e: MouseEvent) => {
      const form = isFormField(e.target);
      document.body.style.cursor = form ? "" : "none";
    };
    window.addEventListener("mouseover", onOver, { passive: true });
    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    const loop = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.body.style.cursor = "";
      delete document.body.dataset.cursorHidden;
    };
  }, []);

  const isView = variant === "view" && label;

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden lg:block"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.25s" }}
    >
      <div
        className="flex items-center justify-center rounded-full border border-bone/70 mix-blend-difference"
        style={{
          width: isView ? 72 : pressed ? 14 : 18,
          height: isView ? 72 : pressed ? 14 : 18,
          background: isView ? "rgba(232,226,213,0.92)" : "rgba(232,226,213,0.9)",
          transition: "width 0.25s cubic-bezier(0.22,1,0.36,1), height 0.25s cubic-bezier(0.22,1,0.36,1), background 0.25s",
        }}
      >
        {isView && (
          <span className="font-display text-[10px] font-bold uppercase tracking-[0.18em] text-ink mix-blend-normal">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
