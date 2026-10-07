export type ArtistStats = {
  linework: number;
  shading: number;
  detail: number;
  creativity: number;
  customDesign: number;
};

export type Artist = {
  id: string;
  /** Artist number printed on the card, e.g. "01" */
  number: string;
  name: string;
  role: string;
  /** Short personality line, e.g. "The Story Keeper" */
  epithet: string;
  specialties: string[];
  style: string;
  /** e.g. "X+ years" — replace with real info when known */
  experience: string;
  signatureTechniques: string[];
  personality: string;
  bio: string;
  artisticStyle: string;
  philosophy: string;
  /** Pokémon-card-style flavor line printed at the bottom of the collectible card */
  cardFlavor: string;
  stats: ArtistStats;
  /** Per-artist label overrides for the shared stat bars (Karan's "shading" prints as "COLOUR") */
  statLabelOverrides?: Partial<Record<keyof ArtistStats, string>>;
  /** Accent tint used across card + profile page */
  accent: "red" | "green" | "orange" | "cream";
  /** Studio photo, only referenced by JSON-LD person markup — the site itself renders stick-figure doodles */
  image: string;
  /** Illustrated caricature (SVG component name rendered by <ArtistPortrait/>) */
  portrait: "karan" | "lucky";
  /** Instagram handle or "" */
  instagram: string;
};

/**
 * ⚠️ PLACEHOLDER CONTENT — every bio, stat and "experience" value below is
 * illustrative. Replace with real artist information before launch.
 * Do not invent certifications or claims; keep facts editable here only.
 *
 * Card order: Card 01 = Lucky, Card 02 = Karan.
 */
export const artists: Artist[] = [
  {
    id: "lucky",
    number: "01",
    name: "Lucky",
    role: "Tattoo Artist",
    epithet: "Tattoo Artist",
    specialties: ["Colour Tattoo", "Realistic Tattoo", "Portraits", "Geometric", "Freestyle"],
    style: "Abstract / Watercolour",
    experience: "16+ Years",
    signatureTechniques: ["Abstract / Watercolour", "Smooth Blending", "Saturated Vibrant Colour", "Strong Contrast", "OCD — 100%"],
    personality: "Colour, contrast, and control — every piece is pushed until it feels complete.",
    bio: "Lucky is a tattoo artist at Street Culture with 16+ years of experience, specialising in colour tattoo, realistic tattoo, portraits, geometric work, and freestyle designs.",
    artisticStyle: "Abstract and watercolour-led compositions with smooth blending, saturated vibrant colour, and strong contrast.",
    philosophy: "Every detail is refined until the colour, contrast, and composition work together.",
    cardFlavor: "Abstract colour, smooth blending, and strong contrast — finished with OCD-level attention to detail.",
    stats: { linework: 83, shading: 91, detail: 93, creativity: 89, customDesign: 90 },
    statLabelOverrides: { detail: "PRECISION" },
    accent: "green",
    image: "/images/artists/lucky.jpg",
    portrait: "lucky",
    instagram: "",
  },
  {
    id: "karan",
    number: "02",
    name: "Karan",
    role: "Tattoo Artist",
    epithet: "The Linework Surgeon",
    specialties: ["Fine Line", "Lettering", "Miniature", "Colour", "Neo School"],
    style: "Fine Line & Lettering",
    experience: "9 years",
    signatureTechniques: ["Fine line detailing", "Comic character", "Clean script & lettering", "Miniature tattoos"],
    personality: "Quiet focus, loud tattoos. Karan believes every line should earn its place.",
    bio: "Karan is a resident artist at Street Culture, Kandivali West. He works in fine line detailing, comic characters, clean script and lettering, and miniature tattoos. Every piece starts with a consultation and a custom drawing — never a repeat of someone else's flash.",
    artisticStyle: "Fine line, lettering, miniature, colour, neo school.",
    philosophy:
      "A tattoo should look like it grew there. I design around the body — its lines, its movement, its story — so the piece belongs to you, not to a trend.",
    cardFlavor:
      "Fine line detailing, comic characters, clean script & lettering, and miniature tattoos.",
    stats: { linework: 98, shading: 98, detail: 92, creativity: 88, customDesign: 86 },
    statLabelOverrides: { shading: "COLOUR" },
    accent: "red",
    image: "/images/artists/karan.jpg",
    portrait: "karan",
    instagram: "",
  },
];

export const getArtist = (id: string) => artists.find((a) => a.id === id);

export const statLabels: { key: keyof ArtistStats; label: string }[] = [
  { key: "linework", label: "LINEWORK" },
  { key: "shading", label: "SHADING" },
  { key: "detail", label: "DETAIL" },
  { key: "creativity", label: "CREATIVITY" },
  { key: "customDesign", label: "CUSTOM DESIGN" },
];

/** Stat labels for one artist, applying any per-artist label overrides. */
export const statLabelsFor = (artist: Artist): { key: keyof ArtistStats; label: string }[] =>
  statLabels.map(({ key, label }) => ({ key, label: artist.statLabelOverrides?.[key] ?? label }));
