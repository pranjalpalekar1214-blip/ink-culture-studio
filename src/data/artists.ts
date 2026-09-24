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
  /** Accent tint used across card + profile page */
  accent: "red" | "green" | "orange" | "cream";
  /** Photo — drop a real image in /public/images/artists/ and update */
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
    epithet: "The Story Keeper",
    specialties: ["Fine Line", "Lettering", "Neo Traditional"],
    style: "Fine Line & Lettering",
    experience: "[X]+ years",
    signatureTechniques: ["Script lettering", "Micro-detail", "Bold traditional outlines"],
    personality:
      "Lucky talks through every idea before he ever touches a machine — the story comes first, the tattoo second.",
    bio: "Lucky is a resident artist at Street Culture, Kandivali West. He specialises in fine line work and custom lettering that carries meaning — names, dates, mantras and memories drawn from scratch for every client. Equally at home in bold neo-traditional colour.",
    artisticStyle:
      "Delicate fine line compositions paired with confident script. Clean heals, readable at any size, with neo-traditional flourishes when the story calls for it.",
    philosophy:
      "Your skin is a diary, not a billboard. I want the tattoo to feel inevitable — like it was always meant to be exactly there.",
    cardFlavor:
      "Face like a thundercloud, punchlines like a comedian. Temper sparks the second you touch his stencil. Weakness: his own jokes — he always laughs first.",
    stats: { linework: 94, shading: 86, detail: 92, creativity: 95, customDesign: 97 },
    accent: "green",
    image: "/images/artists/lucky.svg",
    portrait: "lucky",
    instagram: "",
  },
  {
    id: "karan",
    number: "02",
    name: "Karan",
    role: "Tattoo Artist",
    epithet: "The Linework Surgeon",
    specialties: ["Black & Grey", "Realism", "Geometric"],
    style: "Black & Grey Realism",
    experience: "[X]+ years",
    signatureTechniques: ["Whip-shading", "Single-needle detail", "Negative space"],
    personality: "Quiet focus, loud tattoos. Karan believes every line should earn its place.",
    bio: "Karan is a resident artist at Street Culture, Kandivali West. He works primarily in black & grey, building portraits and geometric compositions with patient, deliberate linework. Every piece starts with a consultation and a custom drawing — never a repeat of someone else's flash.",
    artisticStyle:
      "High-contrast black & grey with cinematic depth. Fine single-needle detail over soft whip-shaded gradients, with negative space doing half the work.",
    philosophy:
      "A tattoo should look like it grew there. I design around the body — its lines, its movement, its story — so the piece belongs to you, not to a trend.",
    cardFlavor:
      "Says only 14 words per session — all of them are about your linework. Weakness: being told his shading is \"nice\".",
    stats: { linework: 96, shading: 90, detail: 94, creativity: 88, customDesign: 92 },
    accent: "red",
    image: "/images/artists/karan.svg",
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
