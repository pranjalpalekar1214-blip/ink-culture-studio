/**
 * Gallery data — categories, items, ink colors.
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
  | "Portfolio"
  | "Colour Tattoos"
  | "Religious"
  | "Animal"
  | "Cover Ups"
  | "Line Art"
  | "Script"
  | "Feminine Tattoo Inspo"
  | "Academy + Studio"
  | "BTS"
  | "Healed Tattoos"
  | "Students, Convocation + Awards";

/** Ink palette used for the "colour" filter dimension. */
export type InkColor = "Black" | "Black & Grey" | "Colour" | "Fine B&W";

export const galleryCategories: ("All" | GalleryCategory)[] = [
  "All",
  "Portfolio",
  "Colour Tattoos",
  "Religious",
  "Animal",
  "Cover Ups",
  "Line Art",
  "Script",
  "Feminine Tattoo Inspo",
  "Academy + Studio",
  "BTS",
  "Healed Tattoos",
  "Students, Convocation + Awards",
];

/** Derived from items — but ordered explicitly for the UI. */
export const inkColorFilters: ("All" | InkColor)[] = [
  "All",
  "Black",
  "Black & Grey",
  "Colour",
  "Fine B&W",
];

export type GalleryItem = {
  id: string;
  title: string;
  category: GalleryCategory;
  /** Ink palette dimension for filtering */
  inkColor: InkColor;
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
const styles: { style: string; artist: 0 | 1; cat: GalleryCategory; ink: InkColor }[] = [
  { style: "Portfolio", artist: 0, cat: "Portfolio", ink: "Black & Grey" },
  { style: "Colour Tattoos", artist: 1, cat: "Colour Tattoos", ink: "Colour" },
  { style: "Religious", artist: 0, cat: "Religious", ink: "Black & Grey" },
  { style: "Animal", artist: 1, cat: "Animal", ink: "Colour" },
  { style: "Cover Ups", artist: 0, cat: "Cover Ups", ink: "Black" },
  { style: "Line Art", artist: 1, cat: "Line Art", ink: "Fine B&W" },
  { style: "Script", artist: 0, cat: "Script", ink: "Black" },
  { style: "Feminine", artist: 1, cat: "Feminine Tattoo Inspo", ink: "Fine B&W" },
  { style: "Academy Studio", artist: 0, cat: "Academy + Studio", ink: "Black & Grey" },
  { style: "BTS", artist: 1, cat: "BTS", ink: "Black & Grey" },
  { style: "Healed", artist: 0, cat: "Healed Tattoos", ink: "Black & Grey" },
  { style: "Students Awards", artist: 1, cat: "Students, Convocation + Awards", ink: "Colour" },
];

const uploadedPhotos: Record<string, string[]> = {
  "Colour Tattoos": Array.from({ length: 26 }, (_, i) => `/images/placeholder/color tattoos/Website clr ${i === 25 ? "26" : i + 1}.jpg`),
  Religious: Array.from({ length: 22 }, (_, i) => `/images/placeholder/religious tattoos/Website Religeous ${i + 1}.jpg`),
  Animal: Array.from({ length: 16 }, (_, i) => `/images/placeholder/animal tattoos/Website Animal ${i + 1}.jpg`),
  "Line Art": Array.from({ length: 26 }, (_, i) => `/images/placeholder/line art/Website LINE ART ${i + 1}.jpg`),
  "Feminine Tattoo Inspo": Array.from({ length: 29 }, (_, i) => `/images/placeholder/feminine/Website WOMENS IDEA ${i + 1}.jpg`),
  Portfolio: Array.from({ length: 25 }, (_, i) => `/images/placeholder/Realism/Website Realistic ${i + 1}.jpg`),
};

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
        inkColor: s.ink,
        artistId: artist.id,
        artistName: artist.name,
        src: uploadedPhotos[s.cat]?.[idx % uploadedPhotos[s.cat].length] ?? `/images/placeholder/${slug(s.style)}.svg`,
        alt: `${s.style} tattoo artwork at Street Culture Tattoo Studio, Kandivali West`,
        description: undefined,
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
