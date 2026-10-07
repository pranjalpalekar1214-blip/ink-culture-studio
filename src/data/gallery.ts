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
  | "Realism"
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
  "Realism",
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

const numbered = (folder: string, prefix: string, count: number, extension = "jpg") =>
  Array.from({ length: count }, (_, i) => `/images/placeholder/${folder}/${prefix}${i + 1}.${extension}`);

const uploadedPhotos: Record<string, string[]> = {
  "Colour Tattoos": [
    ...numbered("color tattoos", "Website clr ", 25),
    "/images/placeholder/color tattoos/Website clr 27.jpg",
    "/images/placeholder/color tattoos/Website clr26.jpg",
  ],
  Religious: numbered("religious tattoos", "Website Religeous ", 22),
  Animal: numbered("animal tattoos", "Website Animal ", 16),
  "Line Art": numbered("line art", "Website LINE ART ", 26),
  "Feminine Tattoo Inspo": numbered("feminine", "Website WOMENS IDEA ", 29),
  Realism: [
    ...numbered("Realism", "Website Realistic ", 13),
    ...Array.from({ length: 11 }, (_, i) => `/images/placeholder/Realism/Website Realistic ${i + 15}.jpg`),
  ],
  "Students, Convocation + Awards": [
    "AWARD Bagga.jpg", "AWARD Bibin.jpg", "AWARD DEBRAJ.jpg", "AWARD Debraj 02.jpg", "AWARD Mahesh.jpg", "AWARD Santosh.jpg", "AWARD Supriya.jpg", "AWARD VINI.jpg", "Bagga Hanya mask post.jpg", "Bagga Madusa Post.jpg", "CONVO CEREMONY 03.JPG", "Convo Ceremony 06.JPG", "Convo ceremony 02.JPG", "Convo ceremony cover.JPG", "Convo ceremony last slide.JPG", "Convoc 02.jpg", "Convoc 03.jpg", "Convoc 04.jpg", "Convocation slide 01.JPG", "Desi Colour 01.jpg", "Dhiru Floral Skull post.jpg", "Dhiru Watercolour Cat Post.jpg", "Mnadeep Hanuman.jpg", "NIRAV BATLI.jpg", "Raj Colour Lotus.jpg", "Rajveer joker.jpg", "Rakshit Shell colour.jpg", "Rakshit colour wok.jpg", "Student Sachin .jpg", "Throwback B&G 02.jpg", "Throwback Student tat Yogesh.jpg",
  ].map((file) => `/images/placeholder/student's Achievement/${file}`),
  "Academy + Studio": [
    "Backpiece 01.jpg", "Bagga Scary portrait.jpg", "Bagga pencil skinpad.jpg", "Deepak Kingfisher Bird.jpg", "Deepak Red Character.jpg", "Desi Green Godess.jpg", "Desi New school Nike.jpg", "Desi abstract flower.jpg", "Desmond practice skin.jpg", "Dhiraj S - Sculpture.jpg", "Dhiru Avatar.jpg", "Dhiru Kukdo post.jpg", "Hulk skin pad.jpg", "INDRAYANI RAUT.jpg", "Kapil Thenos .jpg", "Keshav Newschool post.jpg", "Keshav The Mask post.jpg", "Kingfisher Frank Ronald.jpg", "LE Desi tiger copy.jpg", "Mayank Colour portrait Post.jpg", "Mayank Flower post.jpg", "Mermaid Frank Ronald.jpg", "Morris Blue men.jpg", "Nayan Wolf skinpad.jpg", "Paakhi skinpad.jpg", "Parrot Indrayani Post.jpg", "RAJ Krishna Portrait.jpg", "Rakshit Buddha.jpg", "Rakshit Flower watercolour.jpg", "Rakshit Owl.jpg", "Rakshit Portrait.jpg", "Rakshit Shiva.jpg", "Rakshit shiva copy.jpg", "Sachin Hellboy.jpg", "Samson miduim b&g.jpg", "Siva Sculpture.jpg", "Skinpad Morgan.jpg", "Sujal Alien.jpg", "Sujal Flower.jpg", "Sujal Parot.jpg", "Supriya Cat skinpad.jpg", "Thanos Frank Ronald.jpg", "VINAYAK UNKI.jpg", "Yogesh Practice skin.jpg",
  ].map((file) => `/images/placeholder/skinpads/${file}`),
};

const uploadedCategories = Object.entries(uploadedPhotos).flatMap(([category, photos]) =>
  photos.map((src, index) => ({ category, src, index })),
);

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
  return uploadedCategories.map(({ category, src, index }, itemIndex) => ({
    id: `g-${itemIndex + 1}`,
    title: `${category} ${index + 1}`,
    category: category as GalleryCategory,
    inkColor: category === "Colour Tattoos" ? "Colour" : "Black & Grey",
    artistId: "studio",
    artistName: "Street Culture Studio",
    src,
    alt: `${category} tattoo artwork at Street Culture Tattoo Studio, Kandivali West`,
    description: undefined,
    ratio: ratios[itemIndex % ratios.length],
  }));
}

// Avoid circular import with artists data; minimal shim of what we need
const artistsShim = [
  { id: "karan", name: "Karan" },
  { id: "lucky", name: "Lucky" },
];

export const galleryItems: GalleryItem[] = build();
