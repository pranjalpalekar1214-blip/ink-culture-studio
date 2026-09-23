/**
 * Gallery data — categories and items.
 * Categories are deliberately configurable: the studio's specialties may
 * change, and the gallery UI adapts automatically.
 *
 * IMAGE REPLACEMENT:
 * Each item's `src` currently points to a generated SVG placeholder
 * (public/images/placeholder/[style].svg). To replace with real work:
 *   1. Drop optimised images into public/images/gallery/
 *   2. Update `src` (and optionally `srcSet`) below.
 * Images are lazy-loaded with decoding="async" and animate in on view.
 */

export type GalleryCategory =
  | "Black & Grey"
  | "Realism"
  | "Fine Line"
  | "Traditional"
  | "Neo Traditional"
  | "Lettering"
  | "Custom"
  | "Cover Ups"
  | "Small Tattoos"
  | "Large Tattoos";

export const galleryCategories: ("All" | GalleryCategory)[] = [
  "All",
  "Black & Grey",
  "Realism",
  "Fine Line",
  "Traditional",
  "Neo Traditional",
  "Lettering",
  "Custom",
  "Cover Ups",
  "Small Tattoos",
  "Large Tattoos",
];

export type GalleryItem = {
  id: string;
  title: string;
  category: GalleryCategory;
  artistId: string;
  artistName: string;
  /** WebP/AVIF-ready: set srcSet when real photos are added */
  src: string;
  alt: string;
  description?: string;
  /** 0..5, varies masonry tile heights */
  ratio: number;
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/** Placeholder pool — duplicated across categories to fill the grid until real work is added. */
const styles: { style: string; artist: 0 | 1; cat: GalleryCategory }[] = [
  { style: "Black & Grey", artist: 0, cat: "Black & Grey" },
  { style: "Realism", artist: 0, cat: "Realism" },
  { style: "Geometric", artist: 0, cat: "Black & Grey" },
  { style: "Fine Line", artist: 1, cat: "Fine Line" },
  { style: "Lettering", artist: 1, cat: "Lettering" },
  { style: "Neo Trad", artist: 1, cat: "Neo Traditional" },
  { style: "Traditional", artist: 1, cat: "Traditional" },
  { style: "Custom", artist: 0, cat: "Custom" },
  { style: "Cover Up", artist: 0, cat: "Cover Ups" },
  { style: "Small", artist: 1, cat: "Small Tattoos" },
  { style: "Large", artist: 0, cat: "Large Tattoos" },
  { style: "Portrait", artist: 0, cat: "Realism" },
];

const titles = [
  "Saint of Streets",
  "Mumbai Monsoon",
  "Concrete Bloom",
  "Third Eye Open",
  "Local Train Serpent",
  "Ghost Type",
  "Sea-Link Serpent",
  "Paper Rose",
  "Second Chances",
  "Tiny Thunder",
  "Full Back Saga",
  "Watchful",
];

const ratios = [1, 1.45, 0.8, 1.2, 0.9, 1.6, 1.1, 0.85, 1.3, 0.95, 1.5, 1.05];

function build(): GalleryItem[] {
  const items: GalleryItem[] = [];
  // Two passes over the pool to create 24 items with unique ids
  for (let pass = 0; pass < 2; pass++) {
    styles.forEach((s, i) => {
      const idx = pass * styles.length + i;
      const artist = s.artist === 0 ? artistsShim[0] : artistsShim[1];
      items.push({
        id: `g-${idx + 1}`,
        title: titles[idx % titles.length] + (pass === 1 ? " II" : ""),
        category: s.cat,
        artistId: artist.id,
        artistName: artist.name,
        src: `/images/placeholder/${slug(s.style)}.svg`,
        alt: `${s.style} tattoo by ${artist.name} at Street Culture Tattoo Studio, Kandivali West — placeholder image awaiting studio photo`,
        description:
          pass === 0
            ? "Placeholder piece — replace with a real healed-healed photo, artist notes and session details."
            : undefined,
        ratio: ratios[idx % ratios.length],
      });
    });
  }
  return items;
}

// Avoid circular import with artists data; minimal shim of what we need
const artistsShim = [
  { id: "karan", name: "Karan" },
  { id: "lucky", name: "Lucky" },
];

export const galleryItems: GalleryItem[] = build();
