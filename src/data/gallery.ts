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
  | "Happy Clients"
  | "BTS"
  | "Healed Tattoos"
  | "Students, Convocation + Awards"
  | "Skin Pads";

/** Ink palette used for the "colour" filter dimension. */
export type InkColor = "Black" | "Black & Grey" | "Colour" | "Fine B&W";

export const galleryCategories: ("All" | GalleryCategory)[] = [
  "All",
  "Portfolio",
  "Realism",
  "Colour Tattoos",
  "Religious",
  "Animal",
  "Cover Ups",
  "Line Art",
  "Script",
  "Feminine Tattoo Inspo",
  "Happy Clients",
  "BTS",
  "Healed Tattoos",
  "Students, Convocation + Awards",
  "Skin Pads",
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
  "Happy Clients": [
    "Friends getting tattoo.jpg", "Oct Story 10.jpg", "SEP 26 Highlights 01.jpg", "SEP 26 Highlights 02.jpg", "SEP 26 Highlights 03.jpg", "Sep Client Diaries 01.jpg", "Sep Client Diaries 04.jpg", "Smile We Tat for 03.jpg", "Smile We Tat for.jpg", "Warning client 02.jpg", "Warning client 03.jpg",
  ].map((file) => `/images/placeholder/Happy clients/${file}`),
  Script: [
    "/images/placeholder/Lettering.svg",
    "/images/placeholder/line art/Website LINE ART 1.jpg",
    "/images/placeholder/line art/Website LINE ART 2.jpg",
    "/images/placeholder/line art/Website LINE ART 3.jpg",
  ],
  Realism: [
    ...numbered("Realism", "Website Realistic ", 13),
    ...Array.from({ length: 11 }, (_, i) => `/images/placeholder/Realism/Website Realistic ${i + 15}.jpg`),
  ],
  "Cover Ups": ["Coverup 01.jpg", "Coverup 02.jpg", "Coverup 03.jpg", "Coverup 04.jpg", "Coverup 05.jpg", "Coverup 06.jpg", "Coverup 07.jpg", "Coverup 8.jpg"].map((file) => `/images/placeholder/cover ups/${file}`),
  "Healed Tattoos": ["Fresh Healed Harly joker.jpg", "Healed 02.jpg", "Healed 03.jpg", "Healed 04.jpg", "Healed 05.jpg", "Healed 5.jpg", "Healed Ardhanareshwar.jpg"].map((file) => `/images/placeholder/Healed tattoos/${file}`),
  "Students, Convocation + Awards": [
    "/images/placeholder/student's Achievement/AWARD Bagga.jpg",
    "/images/placeholder/student's Achievement/AWARD Bibin.jpg",
    "/images/placeholder/student's Achievement/AWARD DEBRAJ.jpg",
    "/images/placeholder/student's Achievement/AWARD Debraj 02.jpg",
    "/images/placeholder/student's Achievement/AWARD Mahesh.jpg",
    "/images/placeholder/student's Achievement/AWARD Santosh.jpg",
    "/images/placeholder/student's Achievement/AWARD Supriya.jpg",
    "/images/placeholder/student's Achievement/AWARD VINI.jpg",
    "/images/placeholder/student's Achievement/Convoc 02.jpg",
    "/images/placeholder/student's Achievement/Convoc 03.jpg",
    "/images/placeholder/student's Achievement/Convoc 04.jpg",
    "/images/placeholder/student's Achievement/Student Sachin .jpg",
    "/images/placeholder/student's Achievement/Bagga Hanya mask post.jpg",
    "/images/placeholder/student's Achievement/Bagga Madusa Post.jpg",
    "/images/placeholder/student's Achievement/Desi Colour 01.jpg",
    "/images/placeholder/student's Achievement/Dhiru Floral Skull post.jpg",
    "/images/placeholder/student's Achievement/Dhiru Watercolour Cat Post.jpg",
    "/images/placeholder/student's Achievement/Mnadeep Hanuman.jpg",
    "/images/placeholder/student's Achievement/NIRAV BATLI.jpg",
    "/images/placeholder/student's Achievement/Raj Colour Lotus.jpg",
    "/images/placeholder/student's Achievement/Rajveer joker.jpg",
    "/images/placeholder/student's Achievement/Rakshit Shell colour.jpg",
    "/images/placeholder/student's Achievement/Rakshit colour wok.jpg",
    "/images/placeholder/student's Achievement/Throwback B&G 02.jpg",
    "/images/placeholder/student's Achievement/Throwback Student tat Yogesh.jpg",
  ],
  "Skin Pads": [
    "/images/placeholder/skinpads/Backpiece 01.jpg",
    "/images/placeholder/skinpads/Bagga Scary portrait.jpg",
    "/images/placeholder/skinpads/Bagga pencil skinpad.jpg",
    "/images/placeholder/skinpads/Deepak Kingfisher Bird.jpg",
    "/images/placeholder/skinpads/Deepak Red Character.jpg",
    "/images/placeholder/skinpads/Desi Green Godess.jpg",
    "/images/placeholder/skinpads/Desi New school Nike.jpg",
    "/images/placeholder/skinpads/Desi abstract flower.jpg",
    "/images/placeholder/skinpads/Desmond practice skin.jpg",
    "/images/placeholder/skinpads/Dhiraj S - Sculpture.jpg",
    "/images/placeholder/skinpads/Dhiru Avatar.jpg",
    "/images/placeholder/skinpads/Dhiru Kukdo post.jpg",
    "/images/placeholder/skinpads/Hulk skin pad.jpg",
    "/images/placeholder/skinpads/INDRAYANI RAUT.jpg",
    "/images/placeholder/skinpads/Kapil Thenos .jpg",
    "/images/placeholder/skinpads/Keshav Newschool post.jpg",
    "/images/placeholder/skinpads/Keshav The Mask post.jpg",
    "/images/placeholder/skinpads/Kingfisher Frank Ronald.jpg",
    "/images/placeholder/skinpads/LE Desi tiger copy.jpg",
    "/images/placeholder/skinpads/Mayank Colour portrait Post.jpg",
    "/images/placeholder/skinpads/Mayank Flower post.jpg",
    "/images/placeholder/skinpads/Mermaid Frank Ronald.jpg",
    "/images/placeholder/skinpads/Morris Blue men.jpg",
    "/images/placeholder/skinpads/Nayan Wolf skinpad.jpg",
    "/images/placeholder/skinpads/Paakhi skinpad.jpg",
    "/images/placeholder/skinpads/Parrot Indrayani Post.jpg",
    "/images/placeholder/skinpads/RAJ Krishna Portrait.jpg",
    "/images/placeholder/skinpads/Rakshit Buddha.jpg",
    "/images/placeholder/skinpads/Rakshit Flower watercolour.jpg",
    "/images/placeholder/skinpads/Rakshit Owl.jpg",
    "/images/placeholder/skinpads/Rakshit Portrait.jpg",
    "/images/placeholder/skinpads/Rakshit Shiva.jpg",
    "/images/placeholder/skinpads/Rakshit shiva copy.jpg",
    "/images/placeholder/skinpads/Sachin Hellboy.jpg",
    "/images/placeholder/skinpads/Samson miduim b&g.jpg",
    "/images/placeholder/skinpads/Siva Sculpture.jpg",
    "/images/placeholder/skinpads/Skinpad Morgan.jpg",
    "/images/placeholder/skinpads/Sujal Alien.jpg",
    "/images/placeholder/skinpads/Sujal Flower.jpg",
    "/images/placeholder/skinpads/Sujal Parot.jpg",
    "/images/placeholder/skinpads/Supriya Cat skinpad.jpg",
    "/images/placeholder/skinpads/Thanos Frank Ronald.jpg",
    "/images/placeholder/skinpads/VINAYAK UNKI.jpg",
    "/images/placeholder/skinpads/Yogesh Practice skin.jpg",
  ],
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
