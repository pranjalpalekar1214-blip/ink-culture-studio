import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Magnetic hover wrapper (desktop only)                              */
/* ------------------------------------------------------------------ */

export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el || window.innerWidth < 1024) return;
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      }}
      onMouseLeave={() => {
        const el = ref.current;
        if (el) el.style.transform = "translate(0px, 0px)";
      }}
      style={{ transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)" }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  InkButton — primary CTA with ink-fill hover                        */
/* ------------------------------------------------------------------ */

import { Link } from "react-router";

type InkButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  external?: boolean;
  ariaLabel?: string;
};

export function InkButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  disabled,
  external,
  ariaLabel,
}: InkButtonProps) {
  const base =
    "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden font-display font-semibold uppercase tracking-[0.14em] transition-colors duration-300 disabled:opacity-40 disabled:pointer-events-none select-none";
  const sizes = {
    sm: "px-4 py-2 text-[11px]",
    md: "px-6 py-3 text-xs",
    lg: "px-8 py-4 text-sm",
  } as const;
  const variants = {
    primary:
      "bg-cream text-ink hover:text-cream border border-cream",
    outline:
      "bg-transparent text-bone border border-bone/40 hover:text-ink",
    ghost: "bg-transparent text-bone/80 hover:text-bone border border-transparent",
  } as const;

  const inner = (
    <>
      {/* ink spread fill */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 origin-bottom scale-y-0 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:scale-y-100",
          variant === "primary" && "bg-ink",
          variant === "outline" && "bg-cream",
          variant === "ghost" && "bg-bone/10",
        )}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  const cls = cn(base, sizes[size], variants[variant], className);

  if (href) {
    if (external) {
      return (
        <Magnetic>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel}
            className={cls}
          >
            {inner}
          </a>
        </Magnetic>
      );
    }
    return (
      <Magnetic>
        <Link to={href} aria-label={ariaLabel} className={cls}>
          {inner}
        </Link>
      </Magnetic>
    );
  }
  return (
    <Magnetic>
      <button type={type} onClick={onClick} disabled={disabled} aria-label={ariaLabel} className={cls}>
        {inner}
      </button>
    </Magnetic>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal — scroll-triggered fade/rise                                */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  MaskReveal — image clip reveal on scroll                           */
/* ------------------------------------------------------------------ */

export function MaskReveal({
  children,
  delay = 0,
  className,
  from = "left",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  from?: "left" | "bottom";
}) {
  const reduce = useReducedMotion();
  const initial = from === "left" ? { clipPath: "inset(0 100% 0 0)" } : { clipPath: "inset(100% 0 0 0)" };
  const animate = { clipPath: "inset(0 0 0 0)" };
  return (
    <motion.div
      className={className}
      initial={reduce ? false : initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  SectionHeading — numbered editorial section header                 */
/* ------------------------------------------------------------------ */

export function SectionHeading({
  index,
  kicker,
  title,
  className,
  align = "left",
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("mb-10 md:mb-14", align === "center" && "text-center", className)}>
      <Reveal>
        <div className={cn("flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em] text-blood/90", align === "center" && "justify-center")}>
          <span className="font-mono">{index}</span>
          <span aria-hidden className="h-px w-8 bg-blood/60" />
          <span>{kicker}</span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-tight text-bone sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </Reveal>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PageHero — shared hero shell for inner pages                       */
/* ------------------------------------------------------------------ */

export function PageHero({
  index,
  kicker,
  title,
  lead,
  children,
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-bone/10 pb-14 pt-32 md:pb-20 md:pt-44">
      <div className="pointer-events-none absolute inset-0 grain opacity-60" aria-hidden />
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em] text-blood">
            <span className="font-mono">{index}</span>
            <span aria-hidden className="h-px w-10 bg-blood/50" />
            <span>{kicker}</span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-6 max-w-5xl font-display text-[13vw] uppercase leading-[0.9] tracking-tight text-bone sm:text-6xl md:text-7xl lg:text-8xl">
            {title}
          </h1>
        </Reveal>
        {lead && (
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-bone/70 md:text-lg">{lead}</p>
          </Reveal>
        )}
        {children}
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Breadcrumbs                                                        */
/* ------------------------------------------------------------------ */

import { Link as RouterLink } from "react-router";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ items }: { items: { name: string; path?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-bone/50">
        {items.map((item, i) => (
          <li key={item.name} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="size-3 text-bone/30" aria-hidden />}
            {item.path ? (
              <RouterLink to={item.path} className="transition-colors hover:text-bone">
                {item.name}
              </RouterLink>
            ) : (
              <span aria-current="page" className="text-bone/80">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  useLockBody — body scroll lock for overlays                        */
/* ------------------------------------------------------------------ */

export function useLockBody(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}
