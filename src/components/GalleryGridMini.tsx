import { motion } from "framer-motion";
import { Link } from "@/next/Link";
import { galleryItems } from "@/data/gallery";
import { CursorLabel } from "./CursorLabel";

/** Horizontal swipeable strip of recent work — links to the full gallery. */
export function GalleryGridMini() {
  return (
    <CursorLabel label="DRAG">
      <div className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:px-0 [scrollbar-width:thin]">
        {[...galleryItems]
          .sort((a, b) => a.category.localeCompare(b.category) || a.id.localeCompare(b.id))
          .filter((item, index, items) => index === items.findIndex((candidate) => candidate.category === item.category) || index < 10)
          .slice(0, 10)
          .map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
            className="w-[240px] shrink-0 snap-start md:w-[300px]"
          >
            <Link
              to="/gallery"
              className="group block border border-bone/10"
              aria-label={`${item.title} — see more in the gallery`}
            >
              <div className="flex aspect-[4/5] w-full items-center justify-center overflow-hidden bg-[#111] p-2">
                <img
                  src={item.src}
                  alt={`${item.category} tattoo artwork`}
                  loading={i < 4 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <p className="truncate px-3 py-2.5 text-[10px] uppercase tracking-[0.2em] text-bone/50 group-hover:text-bone">
                {item.category}
              </p>
            </Link>
          </motion.div>
        ))}
        {/* end card */}
        <Link
          to="/gallery"
          className="flex w-[200px] shrink-0 snap-start items-center justify-center border border-dashed border-bone/25 font-display text-sm uppercase tracking-[0.2em] text-bone/60 transition-colors hover:border-blood hover:text-blood"
        >
          View All →
        </Link>
      </div>
    </CursorLabel>
  );
}
