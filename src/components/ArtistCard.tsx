import { motion, useReducedMotion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { statLabels, type Artist } from "@/data/artists";
import { cn } from "@/lib/utils";
import { ArtistPortrait, StarMotif } from "./art";
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
      >
        <div
          className="relative transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          {/* ============ FRONT ============ */}
          <div
            className="relative flex flex-col border border-bone/15 bg-gradient-to-b from-[#1a1a1a] to-[#101010] p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] sm:p-7"
            style={{ backfaceVisibility: "hidden" }}
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
              aria-label={`Open ${artist.name}'s portfolio`}
              className="relative mt-5 block overflow-hidden border border-bone/10 bg-ink transition-transform duration-300 hover:-rotate-1"
            >
              <div className="pointer-events-none absolute inset-0 grain opacity-40" aria-hidden />
              <ArtistPortrait who={artist.portrait} className="mx-auto h-64 w-auto text-bone/85 sm:h-72" />
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

            <div className="mt-6 flex items-center gap-3">
              <Link
                to={`/artists/${artist.id}/portfolio`}
                className="group/v flex flex-1 items-center justify-center gap-2 border border-bone/25 bg-bone/5 py-3 font-display text-xs font-bold uppercase tracking-[0.2em] text-bone transition-colors hover:bg-bone hover:text-ink"
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
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <span aria-hidden className="absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-blood" />
            <span aria-hidden className="absolute right-0 top-0 h-5 w-5 border-r-2 border-t-2 border-blood" />
            <span aria-hidden className="absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-blood" />
            <span aria-hidden className="absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-blood" />

            <p className={cn("font-mono text-[10px] font-bold uppercase tracking-[0.3em]", accentText[artist.accent])}>
              Dossier · {artist.name}
            </p>

            <div className="mt-4 space-y-4 overflow-y-auto pr-1 text-sm leading-relaxed text-bone/75">
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
              className="mt-auto flex items-center justify-center gap-2 border border-bone/25 py-3 font-display text-xs font-bold uppercase tracking-[0.2em] text-bone transition-colors hover:bg-bone hover:text-ink"
            >
              <RefreshCw className="size-4" /> Flip Back
            </button>
          </div>
        </div>
      </motion.article>
    </CursorLabel>
  );
}
