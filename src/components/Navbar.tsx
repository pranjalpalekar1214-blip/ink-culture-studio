import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Instagram, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { contact } from "@/config/contact";
import { cn } from "@/lib/utils";
import { InkButton, useLockBody } from "./ui-kit";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/artists", label: "Artists" },
  { to: "/gallery", label: "Gallery" },
  { to: "/academy", label: "Academy" },
  { to: "/blog", label: "Blog" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 24);
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  // Close the menu whenever the route changes (render-time state adjust).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLockBody(open);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-cream focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "border-b border-bone/10 bg-ink/85 backdrop-blur-md" : "bg-transparent",
        )}
      >
        {/* scroll progress */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[2px] origin-left bg-blood"
          style={{ scaleX: progress }}
        />
        <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 md:h-[72px] md:px-8" aria-label="Primary">
          <Link to="/" className="group flex items-center gap-2.5" aria-label="Street Culture — home">
            <svg viewBox="0 0 32 32" className="h-7 w-7 text-blood" aria-hidden>
              <path
                d="M16 2 L 20 12 L 30 13 L 22 20 L 25 30 L 16 24 L 7 30 L 10 20 L 2 13 L 12 12 Z"
                fill="currentColor"
              />
              <circle cx="16" cy="16" r="4.5" fill="#0d0d0d" />
            </svg>
            <span className="font-display text-sm font-bold uppercase tracking-[0.22em] text-bone">
              Street<span className="text-blood">Culture</span>
            </span>
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {links.slice(1).map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    "relative font-body text-[12px] font-medium uppercase tracking-[0.18em] text-bone/70 transition-colors hover:text-bone",
                    isActive && "text-bone",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute -bottom-1.5 left-0 h-px bg-blood transition-all duration-300",
                        isActive ? "w-full" : "w-0 group-hover:w-full",
                      )}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <InkButton href="/book" size="sm" className="hidden sm:inline-flex">
              Book Now
            </InkButton>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex size-10 items-center justify-center border border-bone/20 text-bone transition-colors hover:border-bone/50 lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="hidden size-10 items-center justify-center border border-bone/20 text-bone transition-colors hover:border-bone/50 lg:flex"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </nav>
      </header>

      <FullScreenMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function FullScreenMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[90] flex flex-col bg-ink"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="pointer-events-none absolute inset-0 grain opacity-60" aria-hidden />
          <div className="flex h-16 items-center justify-between border-b border-bone/10 px-5 md:h-[72px] md:px-8">
            <span className="font-display text-sm font-bold uppercase tracking-[0.22em] text-bone">
              Street<span className="text-blood">Culture</span>
            </span>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="flex size-10 items-center justify-center border border-bone/20 text-bone transition-colors hover:border-bone/50"
            >
              <X className="size-5" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center px-6 md:px-12" aria-label="Menu">
            <ul className="space-y-1">
              {links.map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.055, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={l.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        "group flex items-baseline gap-4 py-1.5 font-display text-4xl uppercase leading-none tracking-tight transition-colors sm:text-5xl md:text-6xl",
                        isActive ? "text-blood" : "text-bone hover:text-blood",
                      )
                    }
                  >
                    <span className="font-mono text-xs text-bone/40">0{i + 1}</span>
                    {l.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="flex flex-wrap items-center justify-between gap-4 border-t border-bone/10 px-6 py-5 md:px-12"
          >
            <div className="text-[11px] uppercase tracking-[0.25em] text-bone/50">
              Kandivali West · Mumbai
            </div>
            <div className="flex items-center gap-3">
              <a
                href={contact.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex size-9 items-center justify-center border border-bone/20 text-bone/70 transition-colors hover:border-blood hover:text-blood"
              >
                <Instagram className="size-4" />
              </a>
              <InkButton href="/book" size="sm">
                Book Now
              </InkButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
