import { useMemo } from "react";
import { Link, useParams } from "react-router";
import { InkStroke, StarMotif, StickArtistFigure } from "@/components/art";
import { CursorLabel } from "@/components/CursorLabel";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { InkButton, MaskReveal, PageHero, Reveal, SectionHeading } from "@/components/ui-kit";
import { breadcrumbSchema, pageMeta, personSchema } from "@/config/seo";
import { galleryItems } from "@/data/gallery";
import { getArtist, statLabels } from "@/data/artists";
import { useJsonLd, useSeo } from "@/hooks/use-seo";
import { cn } from "@/lib/utils";
import NotFound from "./NotFound";

const accentText = {
  red: "text-blood",
  green: "text-acid",
  orange: "text-ember",
  cream: "text-cream",
} as const;

const accentBorder = {
  red: "border-blood",
  green: "border-acid",
  orange: "border-ember",
  cream: "border-cream",
} as const;

const accentBg = {
  red: "bg-blood",
  green: "bg-acid",
  orange: "bg-ember",
  cream: "bg-cream",
} as const;

/** Dedicated per-artist portfolio — deep link target for the collectible cards. */
export default function Portfolio() {
  const { artistId } = useParams();
  const artist = getArtist(artistId ?? "");

  useSeo(
    artist
      ? {
          title:
            pageMeta[artist.id as "karan" | "lucky"]?.title ??
            `${artist.name} — Portfolio | Street Culture Tattoo Studio & Academy`,
          description: `${artist.name}'s tattoo portfolio — ${artist.style} work from Street Culture Tattoo Studio & Academy, Kandivali West, Mumbai. Browse pieces and book a session.`,
          path: `/artists/${artist.id}/portfolio`,
        }
      : null,
  );
  useJsonLd(
    artist
      ? [
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Artists", path: "/artists" },
            { name: artist.name, path: `/artists/${artist.id}` },
            { name: "Portfolio", path: `/artists/${artist.id}/portfolio` },
          ]),
          personSchema({ name: artist.name, role: artist.role, bio: artist.bio, slug: artist.id, image: artist.image }),
        ]
      : null,
  );

  const work = useMemo(() => galleryItems.filter((g) => g.artistId === artist?.id), [artist?.id]);

  if (!artist) return <NotFound />;

  return (
    <>
      <PageHero
        index={`0${artist.number}`}
        kicker="Portfolio"
        title={
          <>
            {artist.name}
            <span className="text-blood">'s</span>
            <br />
            work.
          </>
        }
        lead={`${artist.style} — every piece below was drawn from scratch for one body, one story. Custom only, no repeats.`}
      >
        <Reveal delay={0.25} className="mt-8 flex flex-wrap items-center gap-3">
          <InkButton href="/book" size="lg">
            Book with {artist.name}
          </InkButton>
          <InkButton href={`/artists/${artist.id}`} variant="outline" size="lg">
            Full Profile
          </InkButton>
        </Reveal>
      </PageHero>

      {/* quick stat strip */}
      <section className="border-b border-bone/10 py-10 md:py-14" aria-label="Artist stat strip">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {statLabels.map(({ key, label }, i) => (
              <Reveal key={key} delay={i * 0.06}>
                <div className="border-2 border-bone/12 p-4">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-bone/45">{label}</p>
                  <p className={cn("mt-1 font-display text-3xl uppercase text-bone", accentText[artist.accent])}>
                    {artist.stats[key]}
                  </p>
                  <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-bone/10">
                    <div className={cn("h-full rounded-full", accentBg[artist.accent])} style={{ width: `${artist.stats[key]}%` }} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* portrait + specialties */}
      <section className="py-16 md:py-24" aria-label="About the work">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-[0.9fr_1.4fr]">
          <div className="relative">
            <MaskReveal>
              <div className="relative aspect-[4/5] border border-bone/10 bg-gradient-to-br from-[#1b1b1b] to-[#0f0f0f]">
                <div className="absolute inset-0 grain opacity-50" aria-hidden />
                <StickArtistFigure who={artist.portrait} className="absolute inset-0 m-auto h-4/5 text-bone/80" />
                <p className="absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/40">
                  SC·{artist.number} — {artist.name}, in the studio
                </p>
              </div>
            </MaskReveal>
          </div>
          <div>
            <SectionHeading index="01" kicker="Specialties" title={<>What {artist.name}<br />does best.</>} />
            <div className="flex flex-wrap gap-2">
              {artist.specialties.map((s) => (
                <span
                  key={s}
                  className={cn(
                    "border-2 px-4 py-2 font-display text-xs uppercase tracking-[0.14em]",
                    accentBorder[artist.accent],
                    accentText[artist.accent],
                  )}
                >
                  {s}
                </span>
              ))}
            </div>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-bone/70">{artist.artisticStyle}</p>
            </Reveal>
            <Reveal delay={0.22}>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-body text-sm text-bone/60">
                {artist.signatureTechniques.map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", accentBg[artist.accent])} />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* the portfolio grid */}
      <section className="border-t border-bone/10 py-16 md:py-24" aria-label="Portfolio gallery">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading index="02" kicker="The Wall" title={<>Fresh from<br />the machine.</>} className="mb-0" />
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-bone/40">
                {work.length} piece{work.length === 1 ? "" : "s"} · {artist.style}
              </p>
            </Reveal>
          </div>

          <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {work.map((g, i) => (
              <Reveal key={g.id} delay={(i % 6) * 0.05} className="mb-4 break-inside-avoid">
                <CursorLabel label="VIEW">
                  <Link to="/gallery" className="group block border-2 border-bone/10 transition-colors hover:border-blood/60">
                    <div className="aspect-[3/4] overflow-hidden">
                      <PlaceholderImage
                        seed={g.id}
                        label={g.category}
                        className="transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="flex items-center justify-between border-t-2 border-bone/10 px-3 py-2.5">
                      <span className="font-display text-[10px] uppercase tracking-[0.16em] text-bone/70">{g.category}</span>
                      <StarMotif className={cn("h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100", accentText[artist.accent])} />
                    </div>
                  </Link>
                  </CursorLabel>
              </Reveal>
            ))}
          </div>

          {work.length === 0 && (
            <div className="mt-8 border-2 border-dashed border-bone/20 p-12 text-center">
              <p className="font-marker text-2xl text-cream/60">fresh ink coming soon</p>
              <p className="mt-2 font-body text-sm text-bone/50">New work lands here after every session.</p>
            </div>
          )}

          <Reveal className="mt-12 flex flex-wrap justify-center gap-3">
            <InkButton href="/gallery" variant="outline">Browse the Full Gallery</InkButton>
            <InkButton href="/book" size="lg">Start Your Piece</InkButton>
          </Reveal>
        </div>
      </section>

      {/* philosophy quote */}
      <section className="relative overflow-hidden border-t border-bone/10 py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 grain opacity-40" aria-hidden />
        <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
          <Reveal>
            <InkStroke className="mx-auto mb-6 text-blood" />
            <blockquote className="font-display text-2xl uppercase leading-tight tracking-tight text-bone sm:text-3xl md:text-4xl">
              "{artist.philosophy}"
            </blockquote>
            <cite className="mt-6 block font-mono text-[11px] uppercase not-italic tracking-[0.3em] text-bone/50">
              — {artist.name}, Street Culture Tattoo Studio and Academy
            </cite>
          </Reveal>
        </div>
      </section>

      {/* other artist cross-link */}
      <section className="border-t border-bone/10 py-20 md:py-28">
        <div className="mx-auto w-full max-w-5xl px-5 text-center md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl uppercase tracking-tight text-bone sm:text-4xl">
              Book with <span className="text-blood">{artist.name}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-4 max-w-md font-body text-sm leading-relaxed text-bone/60 md:text-base">
              Consultations are free and there's zero pressure — send the idea, get an honest plan and quote.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <InkButton href="/book" size="lg">Book Your Tattoo</InkButton>
              <InkButton href="/artists" variant="outline" size="lg">All Artists</InkButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
