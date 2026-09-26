import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { PixelButton } from "@/components/PixelButton";

/** Mobile-only sticky BOOK NOW bar; appears after scrolling past the hero. */
export function StickyBookBar() {
  const [visible, setVisible] = useState(() => window.scrollY > 480);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/book") return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-bone/15 bg-ink/95 px-4 py-3 backdrop-blur-md sm:hidden"
        >
          <PixelButton href="/book" size="md" className="w-full py-3.5 text-sm">
            Book Your Tattoo
          </PixelButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
