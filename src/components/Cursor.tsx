import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { useMediaQuery } from "@/hooks/use-seo";

const CursorCtx = createContext<{
  setLabel: (label: string | null, variant?: "default" | "view") => void;
}>({ setLabel: () => {} });

export const useCursor = () => useContext(CursorCtx);

export function CursorProvider({ children }: { children: ReactNode }) {
  const fine = useMediaQuery("(pointer: fine)");
  const setLabel = useCallback(() => {}, []);

  return (
    <CursorCtx.Provider value={{ setLabel }}>
      {children}
      {fine && <CursorDot />}
    </CursorCtx.Provider>
  );
}

function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const onMove = (e: MouseEvent) => {
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      dot.style.opacity = "1";
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
    const onLeave = () => {
      dot.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.body.style.cursor = "";
      delete document.body.dataset.cursorHidden;
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden lg:block"
      style={{ opacity: 0, transform: "translate3d(-100px, -100px, 0)" }}
    >
      <div
        className="h-0 w-0 border-y-[8px] border-y-transparent border-l-[14px] border-l-black"
        style={{ transform: "rotate(-18deg)" }}
      />
    </div>
  );
}
