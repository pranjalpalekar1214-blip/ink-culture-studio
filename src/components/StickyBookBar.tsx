import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router";

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
          <Link
            to="/book"
            className="flex w-full items-center justify-center gap-2 bg-cream px-4 py-3.5 font-display text-sm font-bold uppercase tracking-[0.18em] text-ink active:scale-[0.98] transition-transform"
          >
            Book Your Tattoo
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
