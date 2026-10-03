import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MessageCircle, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { galleryCategories, galleryItems, inkColorFilters, type GalleryItem } from "@/data/gallery";
import { contact } from "@/config/contact";
import { cn } from "@/lib/utils";
import { CursorLabel } from "./CursorLabel";
import { PlaceholderImage } from "./PlaceholderImage";

/** Filter chips — categories come from data, so they stay configurable. */
function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      role="tab"
      aria-selected={active}
      className={cn(
        "whitespace-nowrap border-2 px-3.5 py-2 font-display text-[10px] uppercase tracking-[0.14em] transition-all",
        active
          ? "border-blood bg-blood text-ink shadow-[3px_3px_0_0_#e8e2d5]"
          : "border-bone/20 text-bone/60 hover:border-blood hover:text-bone",
      )}
    >
      {children}
    </button>
  );
}

/** A gallery tile — the artist name is itself a link into the portfolio. */
function Tile({ item, onOpen, index }: { item: GalleryItem; onOpen: () => void; index: number }) {
  return (
    <CursorLabel label="VIEW" className="w-full">
      <motion.div
        layout
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.55, delay: (index % 8) * 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="group relative block w-full overflow-hidden border-2 border-bone/10 transition-colors hover:border-blood/60"
      >
        <button
          onClick={onOpen}
          className="block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-blood"
          aria-label={`View ${item.category} tattoo by ${item.artistName}`}
        >
          <div style={{ aspectRatio: `3.2 / ${item.ratio * 2}` }} className="w-full">
            <PlaceholderImage
              seed={item.id}
              label={item.category}
              className="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
          </div>
          {/* hover overlay — no piece name, just style + ink */}
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/95 via-ink/20 to-transparent p-4 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
            <p className="font-display text-lg uppercase tracking-tight text-bone">{item.category}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-bone/60">
              {item.inkColor} ink · by {item.artistName}
            </p>
            <span className="mt-3 inline-flex w-max items-center gap-1.5 border-2 border-blood bg-blood px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-ink">
              View Tattoo
            </span>
          </div>
        </button>
        {/* artist credit chip → portfolio */}
        <Link
          to={`/artists/${item.artistId}/portfolio`}
          className="absolute left-2 top-2 z-10 border-2 border-ink bg-ink/85 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-bone/85 backdrop-blur-sm transition-colors hover:border-blood hover:text-blood"
          aria-label={`See all work by ${item.artistName}`}
        >
          {item.artistName} →
        </Link>
      </motion.div>
    </CursorLabel>
  );
}

export function GalleryGrid() {
  const [filter, setFilter] = useState("All");
  const [artist, setArtist] = useState<string>("All");
  const [ink, setInk] = useState<string>("All");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const items = useMemo(
    () =>
      galleryItems.filter(
        (g) =>
          (filter === "All" || g.category === filter) &&
          (artist === "All" || g.artistId === artist) &&
          (ink === "All" || g.inkColor === ink),
      ),
    [filter, artist, ink],
  );

  // keyboard nav for lightbox
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const idx = items.findIndex((i) => i.id === lightbox.id);
        const next = e.key === "ArrowRight" ? idx + 1 : idx - 1;
        if (next >= 0 && next < items.length) setLightbox(items[next]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, items]);

  const lightboxIndex = lightbox ? items.findIndex((i) => i.id === lightbox.id) : -1;

  return (
    <div>
      {/* filter rows */}
      <div className="space-y-3">
        <div className="-mx-5 overflow-x-auto px-5 pb-1 md:mx-0 md:px-0" role="tablist" aria-label="Filter by style">
          <div className="flex w-max gap-2 md:flex-wrap md:w-auto">
            {galleryCategories.map((c) => (
              <Chip key={c} active={filter === c} onClick={() => setFilter(c)}>
                {c}
              </Chip>
            ))}
          </div>
        </div>
        <div className="-mx-5 overflow-x-auto px-5 pb-1 md:mx-0 md:px-0" role="tablist" aria-label="Filter by artist">
          <div className="flex w-max items-center gap-2 md:flex-wrap md:w-auto">
            <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-bone/35">Artist</span>
            {["All", "Karan", "Lucky"].map((a) => (
              <Chip key={a} active={artist === a} onClick={() => setArtist(a)}>
                {a}
              </Chip>
            ))}
            {artist !== "All" && (
              <Link
                to={`/artists/${artist.toLowerCase()}/portfolio`}
                className="ml-1 border-2 border-bone/25 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-bone/70 transition-colors hover:border-blood hover:text-blood"
              >
                open portfolio →
              </Link>
            )}
          </div>
        </div>
        <div className="-mx-5 overflow-x-auto px-5 pb-1 md:mx-0 md:px-0" role="tablist" aria-label="Filter by ink colour">
          <div className="flex w-max items-center gap-2 md:flex-wrap md:w-auto">
            <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-bone/35">Ink</span>
            {inkColorFilters.map((c) => (
              <Chip key={c} active={ink === c} onClick={() => setInk(c)}>
                {c}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/40">
        {items.length} piece{items.length === 1 ? "" : "s"} showing
      </p>

      {items.length === 0 ? (
        <div className="mt-8 border-2 border-dashed border-bone/20 p-12 text-center">
          <p className="font-marker text-2xl text-cream/60">nothing matches that combo — yet</p>
          <p className="mt-2 font-body text-sm text-bone/50">Try clearing a filter. Or come make the first one.</p>
        </div>
      ) : (
        <div className="mt-6 columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <div key={item.id} className="mb-4 break-inside-avoid">
                <Tile item={item} index={i} onOpen={() => setLightbox(item)} />
              </div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            item={lightbox}
            index={lightboxIndex}
            total={items.length}
            onClose={() => setLightbox(null)}
            onNav={(dir) => {
              const next = lightboxIndex + dir;
              if (next >= 0 && next < items.length) setLightbox(items[next]);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Lightbox({
  item,
  index,
  total,
  onClose,
  onNav,
}: {
  item: GalleryItem;
  index: number;
  total: number;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
}) {
  // lock scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const waHref = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
    `Hey ${contact.studioName}! I saw a ${item.category} piece (${item.inkColor} ink) by ${item.artistName} in your gallery. I'd love something similar.`,
  )}`;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.category} tattoo by ${item.artistName}`}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute right-4 top-4 z-20 flex size-11 items-center justify-center border-2 border-bone/25 text-bone transition-colors hover:border-blood hover:text-blood"
      >
        <X className="size-5" />
      </button>

      {/* prev / next */}
      {index > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNav(-1);
          }}
          aria-label="Previous piece"
          className="absolute left-3 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center border-2 border-bone/25 bg-ink/70 text-bone transition-colors hover:border-blood hover:text-blood"
        >
          <ChevronLeft className="size-5" />
        </button>
      )}
      {index < total - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNav(1);
          }}
          aria-label="Next piece"
          className="absolute right-3 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center border-2 border-bone/25 bg-ink/70 text-bone transition-colors hover:border-blood hover:text-blood"
        >
          <ChevronRight className="size-5" />
        </button>
      )}

      <motion.figure
        key={item.id}
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="max-h-full w-full max-w-3xl overflow-y-auto border-2 border-bone/20 bg-[#141414] shadow-[10px_10px_0_0_rgba(245,197,24,0.25)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ aspectRatio: "3.2 / 4" }} className="w-full">
          <PlaceholderImage seed={item.id} label={item.category} />
        </div>
        <figcaption className="border-t-2 border-bone/10 p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-2xl uppercase tracking-tight text-bone">{item.category}</h3>
              <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-bone/50">
                {item.inkColor} ink · piece {index + 1}/{total}
              </p>
            </div>
            <Link
              to={`/artists/${item.artistId}/portfolio`}
              className="border-2 border-blood bg-blood px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-ink transition-transform hover:-translate-y-0.5"
            >
              {item.artistName}'s Portfolio
            </Link>
          </div>
          {item.description && <p className="mt-3 text-sm leading-relaxed text-bone/65">{item.description}</p>}
          <div className="mt-5">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-ink bg-cream px-5 py-3 font-display text-xs font-bold uppercase tracking-[0.18em] text-ink shadow-[4px_4px_0_0_var(--blood)] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--blood)]"
            >
              <MessageCircle className="size-4" /> Book a Similar Tattoo
            </a>
          </div>
        </figcaption>
      </motion.figure>
    </motion.div>
  );
}
