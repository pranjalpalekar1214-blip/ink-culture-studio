import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { statLabels, type Artist } from "@/data/artists";
import { cn } from "@/lib/utils";
import { ArtistPortrait, BoltMotif, SparkMotif, StarMotif } from "./art";
import { CursorLabel } from "./CursorLabel";

const accentText: Record<Artist["accent"], string> = {
  red: "text-blood",
  green: "text-acid",
  orange: "text-ember",
  cream: "text-cream",
};

const accentBg: Record<Artist["accent"], string> = {
  red: "bg-blood",
  green: "bg-acid",
  orange: "bg-ember",
  cream: "bg-cream",
};

/** CSS variable that holds the raw accent color — used for glows/shadows. */
const accentVar: Record<Artist["accent"], string> = {
  red: "--blood",
  green: "--acid",
  orange: "--ember",
  cream: "--cream",
};

function StatBar({ label, value, delay, accent }: { label: string; value: number; delay: number; accent: string }) {
  const reduce = useReducedMotion();
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-bone/60">{label}</span>
        <span className={cn("font-mono text-[10px] font-bold", accent)}>{value}</span>
      </div>
      <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-bone/10">
        <motion.div
          className={cn("h-full rounded-full", accentBg[accent as Artist["accent"]])}
          initial={reduce ? false : { width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

/* ==================== POWER AURA (visible once flipped) ==================== */

const SPARKS = [
  { x: 8, rise: 240, dur: 2.6, delay: 0, size: 12, drift: 14 },
  { x: 21, rise: 300, dur: 3.4, delay: 0.6, size: 8, drift: -12 },
  { x: 37, rise: 210, dur: 2.9, delay: 1.2, size: 14, drift: 10 },
  { x: 54, rise: 330, dur: 3.8, delay: 0.3, size: 9, drift: -10 },
  { x: 67, rise: 230, dur: 2.4, delay: 0.9, size: 12, drift: 16 },
  { x: 79, rise: 290, dur: 3.2, delay: 1.6, size: 8, drift: -14 },
  { x: 91, rise: 250, dur: 3.6, delay: 0.4, size: 11, drift: 12 },
  { x: 46, rise: 350, dur: 4.1, delay: 2, size: 7, drift: -18 },
] as const;

const FLOATING = [
  { Icon: SparkMotif, pos: "left-[-7%] top-[6%]", size: "h-8 w-8", dur: 5, drift: -14, rot: 20 },
  { Icon: StarMotif, pos: "right-[-8%] top-[16%]", size: "h-10 w-10", dur: 6.5, drift: 12, rot: -24 },
  { Icon: BoltMotif, pos: "left-[-9%] bottom-[12%]", size: "h-12 w-12", dur: 7.5, drift: 10, rot: -12 },
  { Icon: StarMotif, pos: "right-[-5%] bottom-[6%]", size: "h-7 w-7", dur: 5.5, drift: -10, rot: 18 },
] as const;

/** Electric backdrop that charges up behind the card when it flips. */
function PowerAura({ accent, active }: { accent: Artist["accent"]; active: boolean }) {
  const reduce = useReducedMotion();
  const color = `var(${accentVar[accent]})`;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-8 z-0 sm:-inset-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          {/* core energy glow */}
          <motion.div
            className="absolute inset-0 rounded-[48px] blur-3xl"
            style={{ background: `radial-gradient(closest-side, ${color}, transparent 72%)` }}
            animate={reduce ? { opacity: 0.28 } : { opacity: [0.22, 0.5, 0.22], scale: [0.94, 1.04, 0.94] }}
            transition={reduce ? { duration: 0.4 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* tighter hot core */}
          <motion.div
            className="absolute inset-6 rounded-[40px] blur-2xl"
            style={{ background: `radial-gradient(closest-side, ${color}, transparent 65%)` }}
            animate={reduce ? { opacity: 0.2 } : { opacity: [0.14, 0.34, 0.14], scale: [1, 1.06, 1] }}
            transition={reduce ? { duration: 0.4 } : { duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          />

          {/* rotating summoning rings */}
          <motion.div
            className="absolute -inset-3 rounded-[40px] border-2 border-dashed"
            style={{ borderColor: color, opacity: 0.35 }}
            animate={reduce ? undefined : { rotate: 360 }}
            transition={reduce ? undefined : { duration: 28, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -inset-1 rounded-[36px] border border-dotted"
            style={{ borderColor: color, opacity: 0.25 }}
            animate={reduce ? undefined : { rotate: -360 }}
            transition={reduce ? undefined : { duration: 20, repeat: Infinity, ease: "linear" }}
          />

          {/* floating motifs */}
          {FLOATING.map(({ Icon, pos, size, dur, drift, rot }, i) => (
            <motion.div
              key={i}
              className={cn("absolute", pos, size)}
              style={{ color }}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.4, rotate: rot * 2 }}
              animate={
                reduce
                  ? { opacity: 0.7 }
                  : { opacity: 1, scale: 1, rotate: [rot, rot * -1, rot], y: [0, drift, 0] }
              }
              transition={
                reduce
                  ? { duration: 0.4 }
                  : {
                      opacity: { duration: 0.35, delay: 0.1 + i * 0.08 },
                      scale: { duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] },
                      rotate: { duration: dur, repeat: Infinity, ease: "easeInOut" },
                      y: { duration: dur, repeat: Infinity, ease: "easeInOut" },
                    }
              }
            >
              <Icon className="h-full w-full" />
            </motion.div>
          ))}

          {/* rising sparks */}
          {SPARKS.map((s, i) => (
            <motion.span
              key={`spark-${i}`}
              className="absolute bottom-[4%]"
              style={{ left: `${s.x}%`, color }}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 0 }}
              animate={reduce ? { opacity: 0.5 } : { opacity: [0, 1, 1, 0], y: [0, -s.rise], rotate: [0, s.drift] }}
              transition={
                reduce
                  ? { duration: 0.4 }
                  : { duration: s.dur, repeat: Infinity, delay: s.delay, ease: "easeOut" }
              }
            >
              <svg viewBox="0 0 12 12" fill="none" style={{ width: s.size, height: s.size }}>
                <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </motion.span>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ==================== CARD ==================== */

/** Large collectible artist card with flip-to-details interaction. */
export function ArtistCard({ artist, index }: { artist: Artist; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const reduce = useReducedMotion();

  return (
    <CursorLabel label={flipped ? "BACK" : "FLIP"} className="w-full">
      <motion.article
        initial={reduce ? false : { opacity: 0, y: 48, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="group relative"
        style={{ perspective: 1600 }}
        onKeyDown={(e) => {
          if (e.key === "Escape" && flipped) setFlipped(false);
        }}
      >
        {/* powers backdrop — charges up once flipped */}
        <PowerAura accent={artist.accent} active={flipped} />

        <div
          className="relative z-10 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* ============ FRONT ============ */}
          <div
            className="relative flex flex-col border border-bone/15 bg-gradient-to-b from-[#1a1a1a] to-[#101010] p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] sm:p-7"
            style={{ backfaceVisibility: "hidden", pointerEvents: flipped ? "none" : undefined }}
          >
            {/* corner ticks */}
            <span aria-hidden className="absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-blood" />
            <span aria-hidden className="absolute right-0 top-0 h-5 w-5 border-r-2 border-t-2 border-blood" />
            <span aria-hidden className="absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-blood" />
            <span aria-hidden className="absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-blood" />

            <div className="flex items-start justify-between">
              <div>
                <p className={cn("font-mono text-[10px] font-bold uppercase tracking-[0.3em]", accentText[artist.accent])}>
                  Artist {artist.number}
                </p>
                <h3 className="mt-1 font-display text-3xl uppercase leading-none tracking-tight text-bone sm:text-4xl">
                  {artist.name}
                </h3>
                <p className="mt-1 font-marker text-sm text-bone/60">{artist.epithet}</p>
              </div>
              <StarMotif className={cn("h-7 w-7 shrink-0", accentText[artist.accent])} />
            </div>

            {/* portrait plate — tap to open portfolio */}
            <Link
              to={`/artists/${artist.id}/portfolio`}
              tabIndex={flipped ? -1 : undefined}
              aria-label={`Open ${artist.name}'s portfolio`}
              className="relative mt-5 block overflow-hidden border border-bone/10 bg-ink transition-transform duration-300 hover:-rotate-1"
            >
              <div className="pointer-events-none absolute inset-0 grain opacity-40" aria-hidden />
              <div className="relative aspect-[4/5] bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d]">
                <ArtistPortrait who={artist.portrait} className="absolute inset-0 m-auto h-4/5 text-bone/80" />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex justify-between border-t border-bone/10 bg-ink/80 px-3 py-2 text-[9px] uppercase tracking-[0.25em] text-bone/50 backdrop-blur-sm">
                <span>{artist.style}</span>
                <span className="text-blood">tap for portfolio →</span>
              </div>
            </Link>

            {/* specialties chips */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {artist.specialties.map((s) => (
                <span key={s} className="border border-bone/15 px-2 py-1 text-[9px] font-medium uppercase tracking-[0.16em] text-bone/70">
                  {s}
                </span>
              ))}
            </div>

            {/* stats */}
            <div className="mt-5 space-y-2.5">
              {statLabels.map(({ key, label }, i) => (
                <StatBar
                  key={key}
                  label={label}
                  value={artist.stats[key]}
                  delay={0.15 + i * 0.08}
                  accent={artist.accent}
                />
              ))}
            </div>

            {/* flavor text — collectible-card style */}
            <div className="mt-4 border border-bone/15 bg-ink/60 px-3 py-2.5">
              <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-bone/40">Flavor Text</p>
              <p className="mt-1 font-marker text-[15px] leading-snug text-cream/90">{artist.cardFlavor}</p>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <Link
                to={`/artists/${artist.id}/portfolio`}
                tabIndex={flipped ? -1 : undefined}
                className="group/v flex flex-1 items-center justify-center gap-2 border border-bone/25 bg-bone/5 py-3 font-display text-xs font-bold uppercase tracking-[0.2em] text-bone transition-colors hover:bg-bone/10"
              >
                View Portfolio
                <ArrowUpRight className="size-4 transition-transform group-hover/v:translate-x-0.5 group-hover/v:-translate-y-0.5" />
              </Link>
              <button
                onClick={() => setFlipped(true)}
                aria-label={`Flip ${artist.name}'s card for details`}
                className="flex size-11 items-center justify-center border border-bone/25 text-bone/70 transition-colors hover:border-blood hover:text-blood"
              >
                <RefreshCw className="size-4" />
              </button>
            </div>
          </div>

          {/* ============ BACK ============ */}
          <div
            className="absolute inset-0 flex flex-col border border-bone/15 bg-gradient-to-b from-[#161616] to-[#0d0d0d] p-5 sm:p-7"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", pointerEvents: flipped ? undefined : "none" }}
          >
            <span aria-hidden className="absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-blood" />
            <span aria-hidden className="absolute right-0 top-0 h-5 w-5 border-r-2 border-t-2 border-blood" />
            <span aria-hidden className="absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-blood" />
            <span aria-hidden className="absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-blood" />

            <p className={cn("font-mono text-[10px] font-bold uppercase tracking-[0.3em]", accentText[artist.accent])}>
              Dossier · {artist.name}
            </p>

            {/* studio portrait — appears on the flipped face too */}
            <div className="mt-3 overflow-hidden border border-bone/15 bg-ink">
              <div className="relative aspect-[4/5] bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d]">
                <ArtistPortrait who={artist.portrait} className="absolute inset-0 m-auto h-3/4 text-bone/70" />
              </div>
            </div>

            <div className="mt-4 min-h-0 flex-1 space-y-4 overflow-y-auto pr-1 text-sm leading-relaxed text-bone/75">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-bone/40">Signature Techniques</p>
                <ul className="mt-1.5 space-y-1">
                  {artist.signatureTechniques.map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <span aria-hidden className={cn("h-1 w-1 rounded-full", accentBg[artist.accent])} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-bone/40">Experience</p>
                <p className="mt-1">{artist.experience} — professional studio practice</p>
              </div>
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-bone/40">Personality</p>
                <p className="mt-1 font-marker text-base text-bone/85">{artist.personality}</p>
              </div>
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-bone/40">Style Notes</p>
                <p className="mt-1">{artist.artisticStyle}</p>
              </div>
            </div>

            <button
              onClick={() => setFlipped(false)}
              tabIndex={flipped ? 0 : -1}
              className="mt-4 flex items-center justify-center gap-2 border border-bone/25 py-3 font-display text-xs font-bold uppercase tracking-[0.2em] text-bone transition-colors hover:bg-bone/5"
            >
              <RefreshCw className="size-4" /> Flip Back
            </button>
          </div>
        </div>
      </motion.article>
    </CursorLabel>
  );
}
