import { motion } from "framer-motion";
import { Link } from "react-router";
import { galleryItems } from "@/data/gallery";
import { CursorLabel } from "./CursorLabel";
import { PlaceholderImage } from "./PlaceholderImage";

/** Horizontal swipeable strip of recent work — links to the full gallery. */
export function GalleryGridMini() {
  return (
    <CursorLabel label="DRAG">
      <div className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:px-0 [scrollbar-width:thin]">
        {galleryItems.slice(0, 10).map((item, i) => (
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
              <div className="aspect-[3/4] w-full overflow-hidden">
                <PlaceholderImage
                  seed={item.id}
                  label={item.category}
                  sub={item.artistName}
                  className="transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="truncate px-3 py-2.5 text-[10px] uppercase tracking-[0.2em] text-bone/50 group-hover:text-bone">
                {item.title} · {item.artistName}
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
