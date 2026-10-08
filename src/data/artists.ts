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
    bio: "I didn’t start with a tattoo machine. I started with a pencil. My love for art began in high school, where blank pages and classroom desks became my first canvases. I spent years drawing, sketching, experimenting and learning from every opportunity I could find before tattooing became my profession. My first hands-on experience came during industrial training in Hotel Management, and it changed the direction of my life. Eventually, I opened my own studio and built a career around the art I loved. After 16+ years in the tattoo industry, I specialise in Colour, Realism, Portrait, Black & Grey and Freestyle tattooing. Tattooing has taught me patience, discipline, consistency and the importance of never stopping learning. Today, I also enjoy teaching and sharing what I have learned with the next generation of artists. Street Culture Tattoo is more than a studio to me — it is the result of practice, mistakes, persistence and thousands of hours behind the machine. Keep learning. Keep creating. Never give up.",
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
    bio: "For me, tattooing is where creativity becomes something you can carry with you forever. My journey into tattooing started in 2017, but my connection with art and creativity goes back much further. Before tattooing became my profession, I was deeply involved in hip-hop culture, with B-boying as my primary dance style. Skateboarding and other creative expression taught me to appreciate individuality, movement and freedom. In 2019, I joined Street Culture Tattoo Academy, where I developed my skills and learned the fundamentals of professional tattooing. After completing my training, I joined Street Culture Tattoo Studio as a professional artist. Today, as the Lead Tattoo & Piercing Artist, I combine technical precision with creativity and take time to understand what makes each client's style unique. Every person who walks into the studio has a different story, and I believe the tattoo should reflect that individuality. For me, a tattoo is never just ink on skin — it is a piece of art that represents a story, an idea, a memory, or simply a part of who you are.",
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
