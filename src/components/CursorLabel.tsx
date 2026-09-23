import { useRef, type ReactNode } from "react";
import { useCursor } from "./Cursor";

/** Wraps an element to drive the custom cursor label on desktop hover. */
export function CursorLabel({
  label,
  children,
  className,
  as: As = "div",
}: {
  label: string;
  children: ReactNode;
  className?: string;
  as?: "div" | "span";
}) {
  const { setLabel } = useCursor();
  const wrapRef = useRef<HTMLDivElement>(null);

  return (
    <As
      ref={wrapRef as never}
      className={className}
      onMouseEnter={() => setLabel(label)}
      onMouseLeave={() => setLabel(null)}
    >
      {children}
    </As>
  );
}
