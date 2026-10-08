import { RefreshCw } from "lucide-react";
import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { InkStroke, StarMotif, StickArtistFigure } from "@/components/art";
import { CursorLabel } from "@/components/CursorLabel";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { InkButton, MaskReveal, PageHero, Reveal, SectionHeading } from "@/components/ui-kit";
import { breadcrumbSchema, pageMeta, personSchema } from "@/config/seo";
import { galleryItems } from "@/data/gallery";
import { getArtist, statLabelsFor } from "@/data/artists";
import { useJsonLd, useSeo } from "@/hooks/use-seo";
import { cn } from "@/lib/utils";
import { trackFunnelEvent } from "@/lib/funnel";
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

export default function ArtistDetail() {
  const { artistId } = useParams();
  const artist = getArtist(artistId ?? "");
  useEffect(() => {
    if (artist) trackFunnelEvent("artist_viewed", artist.name);
  }, [artist]);
  const [showCard, setShowCard] = useState(false);
  const [photoFailed, setPhotoFailed] = useState(false);

  useSeo(
    artist
      ? {
          title:
            pageMeta[artist.id as "karan" | "lucky"]?.title ??
            `${artist.name} — ${artist.role} | Street Culture Tattoo Studio`,
          description: artist.bio,
          path: `/artists/${artist.id}`,
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
          ]),
          personSchema({ name: artist.name, role: artist.role, bio: artist.bio, slug: artist.id, image: artist.image }),
        ]
      : null,
  );

  if (!artist) return <NotFound />;

  const work = galleryItems.filter((g) => g.artistId === artist.id).slice(0, 6);

  return (
    <>
      {/* HERO */}
      <PageHero
        index={`0${artist.number}`}
        kicker="Tattoo Artist"
        title={<>{artist.name}<span className="text-blood">.</span></>}
        lead={artist.epithet + " — " + artist.style + ", Street Culture, Kandivali West."}
      >
          <div className="mt-8 flex flex-wrap gap-3">
            <InkButton href="#about-artist" size="lg">Read About {artist.name}</InkButton>
            <InkButton href={`/artists/${artist.id}/portfolio`} size="lg">View Portfolio</InkButton>
          <InkButton href="/book" size="lg">Book with {artist.name}</InkButton>
        </div>
      </PageHero>

      {/* PORTRAIT + CARD */}
      <section className="border-b border-bone/10 py-16 md:py-24" aria-label={`${artist.name} portrait and card`}>
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
          <div className="relative">
            <MaskReveal>
              <div className="relative aspect-[4/5] border border-bone/10 bg-gradient-to-br from-[#1b1b1b] to-[#0f0f0f]">
                <span aria-hidden className="absolute left-0 top-0 z-10 h-5 w-5 border-l-2 border-t-2 border-blood" />
                <span aria-hidden className="absolute right-0 top-0 z-10 h-5 w-5 border-r-2 border-t-2 border-blood" />
                <span aria-hidden className="absolute bottom-0 left-0 z-10 h-5 w-5 border-b-2 border-l-2 border-blood" />
                <span aria-hidden className="absolute bottom-0 right-0 z-10 h-5 w-5 border-b-2 border-r-2 border-blood" />
                <div className="absolute inset-0 grain opacity-50" aria-hidden />
                {/* Real studio photo — profile pages only; listing, home and the collectible card keep the doodle */}
                {(artist.id === "lucky" || artist.id === "karan") && !photoFailed ? (
                  <img
                    src={artist.image}
                    alt={`${artist.name}, tattoo artist at Street Culture, Kandivali West`}
                    loading="lazy"
                    decoding="async"
                    onError={() => setPhotoFailed(true)}
                    className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
                  />
                ) : (
                  <StickArtistFigure who={artist.portrait} className="absolute inset-0 m-auto h-4/5 text-bone/80" />
                )}
                <p className="absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/40">
                  SC·{artist.number} — {artist.name}, in the studio
                </p>
              </div>
            </MaskReveal>
            <div id="about-artist" className="mt-6 border border-bone/15 border-l-2 border-l-blood bg-bone/[0.03] p-6 md:p-8">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-blood">About {artist.name}</p>
              <p className="mt-4 font-body text-base leading-relaxed text-bone/85">{artist.bio}</p>
              <p className="mt-5 font-marker text-xl text-cream/80">{artist.philosophy}</p>
            </div>
          </div>

          <div>
            <Reveal>
              <h2 className="font-display text-3xl uppercase tracking-tight text-bone md:text-4xl">The Collectible</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-bone/60">
                Every Street Culture artist ships as a card — stats, specialties and all. Flip it open, then go see the real thing.
              </p>
            </Reveal>

            {/* mini flip card */}
            <Reveal delay={0.15}>
              <div className="mt-8 max-w-sm" style={{ perspective: 1600 }}>
                <button
                  onClick={() => setShowCard((v) => !v)}
                  aria-expanded={showCard}
                  className={cn(
                    "relative block w-full border bg-gradient-to-b from-[#1a1a1a] to-[#101010] p-6 text-left transition-all duration-500",
                    accentBorder[artist.accent],
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className={cn("font-mono text-[10px] font-bold uppercase tracking-[0.3em]", accentText[artist.accent])}>
                        Artist {artist.number}
                      </p>
                      <p className="mt-1 font-display text-2xl uppercase text-bone">{artist.name}</p>
                      <p className="font-marker text-sm text-bone/60">{artist.epithet}</p>
                    </div>
                    <StarMotif className={cn("h-6 w-6", accentText[artist.accent])} />
                  </div>

                  {/* card art — the collectible's stick-figure doodle */}
                  <div className="mt-4 overflow-hidden border border-bone/15 bg-ink">
                    <div className="relative h-36 sm:h-44">
                      <StickArtistFigure who={artist.portrait} className="absolute inset-0 m-auto h-full w-auto text-bone/70" />
                      <span aria-hidden className="pointer-events-none absolute inset-0 grain opacity-40" />
                    </div>
                  </div>

                  {showCard ? (
                    <div className="mt-5 space-y-3 border-t border-bone/10 pt-4 text-sm text-bone/75">
                      <p><span className="text-[10px] uppercase tracking-[0.2em] text-bone/40 block">Techniques</span>{artist.signatureTechniques.join(" · ")}</p>
                      <p><span className="text-[10px] uppercase tracking-[0.2em] text-bone/40 block">Experience</span>{artist.experience}</p>
                      <p><span className="text-[10px] uppercase tracking-[0.2em] text-bone/40 block">Personality</span><span className="font-marker">{artist.personality}</span></p>
                    </div>
                  ) : (
                    <div className="mt-5 space-y-2.5 border-t border-bone/10 pt-4">
                      {statLabelsFor(artist).slice(0, 3).map(({ key, label }) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-[0.2em] text-bone/60">{label}</span>
                          <span className={cn("font-mono text-xs font-bold", accentText[artist.accent])}>{artist.stats[key]}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <span className="mt-5 flex items-center justify-center gap-2 border border-bone/20 py-2.5 font-display text-[10px] font-bold uppercase tracking-[0.22em] text-bone/80">
                    <RefreshCw className="size-3.5" /> {showCard ? "Flip to stats" : "Flip to dossier"}
                  </span>
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ABOUT / STYLE / SPECIALTIES */}
      <section id="artist-details" className="scroll-mt-20 py-20 md:py-28" aria-label={`${artist.name} artistic details`}>
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <SectionHeading index="02" kicker={`About ${artist.name}`} title={<>About the<br />Artist.</>} />
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="border-l-2 border-blood pl-6">
              <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-blood">Artist story</p>
              <p className="font-body text-base leading-relaxed text-bone/85 md:text-lg">{artist.bio}</p>
              <p className="mt-6 font-marker text-xl text-cream/80">{artist.philosophy}</p>
            </div>
            <div className="space-y-8">
              <Reveal delay={0.1}>
                <div className="border border-bone/12 p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-bone/40">Artistic Style</p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-bone/75">{artist.artisticStyle}</p>
                </div>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="border border-bone/12 p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-bone/40">Specialties</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {artist.specialties.map((s) => (
                      <span key={s} className={cn("border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em]", accentBorder[artist.accent], accentText[artist.accent])}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.26}>
                <div className="border border-bone/12 p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-bone/40">Signature Techniques</p>
                  <ul className="mt-3 space-y-1.5 font-body text-sm text-bone/75">
                    {artist.signatureTechniques.map((t) => (
                      <li key={t} className="flex items-center gap-2">
                        <span className={cn("h-1 w-1 rounded-full bg-current", accentText[artist.accent])} aria-hidden />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="border-t border-bone/10 py-20 md:py-28" aria-label="Signature work">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <SectionHeading index="03" kicker="Signature Work" title={<>Fresh from<br />the machine.</>} />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {work.map((g) => (
              <CursorLabel key={g.id} label="VIEW">
                <Link to={`/artists/${artist.id}/portfolio`} className="group block border border-bone/10">
                  <div className="aspect-[3/4] overflow-hidden">
                    <PlaceholderImage seed={g.id} label={g.category} sub={g.title} className="transition-transform duration-700 group-hover:scale-105" />
                  </div>
                </Link>
              </CursorLabel>
            ))}
          </div>
          <Reveal className="mt-8">
            <InkButton href={`/artists/${artist.id}/portfolio`} variant="outline">See the Full Portfolio</InkButton>
          </Reveal>
        </div>
      </section>

      {/* PHILOSOPHY QUOTE */}
      <section className="relative overflow-hidden border-t border-bone/10 py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 grain opacity-40" aria-hidden />
        <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
          <Reveal>
            <InkStroke className="mx-auto mb-6 text-blood" />
            <blockquote className="font-display text-2xl uppercase leading-tight tracking-tight text-bone sm:text-3xl md:text-4xl">
              “{artist.philosophy}”
            </blockquote>
            <cite className="mt-6 block font-mono text-[11px] uppercase not-italic tracking-[0.3em] text-bone/50">
              — {artist.name}, Street Culture
            </cite>
          </Reveal>
        </div>
      </section>

      {/* BOOK CTA */}
      <section className="border-t border-bone/10 py-24 md:py-32">
        <div className="mx-auto w-full max-w-5xl px-5 text-center md:px-8">
          <Reveal>
            <h2 className="font-display text-4xl uppercase tracking-tight text-bone sm:text-6xl">
              Book with <span className="text-blood">{artist.name}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-5 max-w-md font-body text-sm leading-relaxed text-bone/60 md:text-base">
              Consultations are free and there's zero pressure — send the idea, get an honest plan and quote.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <InkButton href="/book" size="lg">Book Your Tattoo</InkButton>
              <InkButton href="/contact" variant="outline" size="lg">Visit the Studio</InkButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
