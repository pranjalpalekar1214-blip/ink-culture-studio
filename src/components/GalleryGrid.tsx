import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { galleryCategories, galleryItems, type GalleryItem } from "@/data/gallery";
import { contact } from "@/config/contact";
import { cn } from "@/lib/utils";
import { CursorLabel } from "./CursorLabel";
import { PlaceholderImage } from "./PlaceholderImage";

/** Filter chips — categories come from data, so they stay configurable. */
function CategoryFilter({
  active,
  onChange,
}: {
  active: string;
  onChange: (c: string) => void;
}) {
  return (
    <div className="-mx-5 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0" role="tablist" aria-label="Filter gallery by style">
      <div className="flex w-max gap-2 md:w-auto md:flex-wrap">
        {galleryCategories.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={active === c}
            onClick={() => onChange(c)}
            className={cn(
              "whitespace-nowrap border px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors",
              active === c
                ? "border-blood bg-blood text-ink"
                : "border-bone/20 text-bone/60 hover:border-bone/50 hover:text-bone",
            )}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

function Tile({ item, onOpen, index }: { item: GalleryItem; onOpen: () => void; index: number }) {
  return (
    <CursorLabel label="VIEW" className="w-full">
      <motion.button
        layout
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.55, delay: (index % 8) * 0.05, ease: [0.22, 1, 0.36, 1] }}
        onClick={onOpen}
        className="group relative block w-full overflow-hidden border border-bone/10 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-blood"
        aria-label={`View ${item.title} — ${item.category} tattoo by ${item.artistName}`}
      >
        <div style={{ aspectRatio: `3.2 / ${item.ratio * 2}` }} className="w-full">
          {/* Swap PlaceholderImage for a real <img loading="lazy"> when photos are added */}
          <PlaceholderImage
            seed={item.id}
            label={item.category}
            sub={`${item.artistName} · ${item.title}`}
            className="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
        </div>
        {/* hover overlay */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/95 via-ink/20 to-transparent p-4 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
          <p className="font-display text-lg uppercase tracking-tight text-bone">{item.title}</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-bone/60">
            {item.category} · {item.artistName}
          </p>
          <span className="mt-3 inline-flex w-max items-center gap-1.5 border border-bone/40 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-bone">
            View Tattoo
          </span>
        </div>
        {/* grayscale → color feel: dim until hover on desktop */}
        <div className="absolute inset-0 bg-ink/20 transition-opacity duration-500 group-hover:opacity-0" aria-hidden />
      </motion.button>
    </CursorLabel>
  );
}

export function GalleryGrid() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const items = useMemo(
    () => (filter === "All" ? galleryItems : galleryItems.filter((g) => g.category === filter)),
    [filter],
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

  return (
    <div>
      <CategoryFilter active={filter} onChange={setFilter} />

      <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => (
            <div key={item.id} className="mb-4 break-inside-avoid">
              <Tile item={item} index={i} onOpen={() => setLightbox(item)} />
            </div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox item={lightbox} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function Lightbox({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  // lock scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const waHref = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
    `Hey ${contact.studioName}! I saw "${item.title}" (${item.category}) by ${item.artistName} in your gallery. I'd love something similar.`,
  )}`;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} by ${item.artistName}`}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center border border-bone/25 text-bone transition-colors hover:border-blood hover:text-blood"
      >
        <X className="size-5" />
      </button>

      <motion.figure
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="max-h-full w-full max-w-3xl overflow-y-auto border border-bone/15 bg-[#141414]"
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ aspectRatio: "3.2 / 4" }} className="w-full">
          <PlaceholderImage seed={item.id} label={item.category} sub={`${item.artistName} · ${item.title}`} />
        </div>
        <figcaption className="border-t border-bone/10 p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-2xl uppercase tracking-tight text-bone">{item.title}</h3>
              <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-bone/50">
                {item.category} · by {item.artistName}
              </p>
            </div>
            <Link
              to={`/artists/${item.artistId}`}
              className="hidden border border-bone/25 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-bone transition-colors hover:bg-bone hover:text-ink sm:block"
              onClick={onClose}
            >
              View Artist
            </Link>
          </div>
          {item.description && <p className="mt-3 text-sm leading-relaxed text-bone/65">{item.description}</p>}
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-acid px-5 py-3 font-display text-xs font-bold uppercase tracking-[0.18em] text-ink transition-transform hover:scale-[1.02]"
            >
              <MessageCircle className="size-4" /> Book a Similar Tattoo
            </a>
            <Link
              to={`/artists/${item.artistId}`}
              className="inline-flex items-center border border-bone/25 px-5 py-3 font-display text-xs font-bold uppercase tracking-[0.18em] text-bone transition-colors hover:bg-bone hover:text-ink sm:hidden"
              onClick={onClose}
            >
              View Artist
            </Link>
          </div>
        </figcaption>
      </motion.figure>
    </motion.div>
  );
}
