import { contact, siteUrl } from "./contact";

/** Brand accent (yellow). Single source of truth for schema colors. */
export const BRAND_COLOR = "#F5C518";

export const siteName = "Street Culture Tattoo Studio and Academy";

/** Shared OG image path — replace public/og-image.png with a real 1200×630 image. */
export const ogImage = "/og-image.png";

export type SeoInput = {
  title: string;
  description: string;
  /** Path starting with "/" */
  path: string;
  /** Optional distinct OG image */
  image?: string;
  type?: "website" | "article";
  /** For articles */
  publishedTime?: string;
  author?: string;
  keywords?: string[];
};

export function seoUrl(path: string) {
  return `${siteUrl}${path === "/" ? "" : path}`;
}

export function absoluteUrl(path: string) {
  return `${siteUrl}${path}`;
}

/** Default keyword clusters — used sparingly, never stuffed */
export const defaultKeywords = [
  "tattoo studio in Kandivali",
  "tattoo artist in Kandivali West",
  "tattoo studio Mumbai",
  "custom tattoo Kandivali",
];

export function buildPageMeta(input: SeoInput) {
  const url = seoUrl(input.path);
  const image = input.image ? absoluteUrl(input.image) : absoluteUrl(ogImage);
  return {
    title: input.title,
    description: input.description,
    path: input.path,
    canonical: url,
    image,
    type: input.type ?? "website",
    keywords: [...(input.keywords ?? []), ...defaultKeywords],
    publishedTime: input.publishedTime,
    author: input.author,
    siteName,
    locale: "en_IN",
  };
}

/* ------------------------------------------------------------------ */
/*  Per-page static metadata (edit copy freely)                        */
/* ------------------------------------------------------------------ */

export const pageMeta = {
  home: buildPageMeta({
    title: `${siteName} | Tattoo Studio in Kandivali West, Mumbai`,
    description:
      "Street Culture is a custom tattoo studio & academy in Kandivali West, Mumbai. Artists Karan & Lucky specialise in black & grey, fine line, realism and custom tattoos. Book a consultation.",
    path: "/",
  }),
  about: buildPageMeta({
    title: `About the Studio | ${siteName}`,
    description:
      "The story, philosophy and process behind Street Culture — a custom tattoo studio in Kandivali West, Mumbai. Consultation-first, hygiene-obsessed, custom design only.",
    path: "/about",
  }),
  artists: buildPageMeta({
    title: `Tattoo Artists in Kandivali West | Karan & Lucky — ${siteName}`,
    description:
      "Meet Karan and Lucky — resident tattoo artists at Street Culture, Kandivali West, Mumbai. Styles, specialties, signature work and how to book with each artist.",
    path: "/artists",
  }),
  karan: buildPageMeta({
    title: `Karan — Custom Tattoo Artist, Kandivali West | ${siteName}`,
    description:
      "Karan is a resident tattoo artist at Street Culture, Kandivali West, Mumbai. Style, specialties, philosophy and selected work — book a consultation with Karan.",
    path: "/artists/karan",
  }),
  lucky: buildPageMeta({
    title: `Lucky — Custom Tattoo Artist, Kandivali West | ${siteName}`,
    description:
      "Lucky is a resident tattoo artist at Street Culture, Kandivali West, Mumbai. Style, specialties, philosophy and selected work — book a consultation with Lucky.",
    path: "/artists/lucky",
  }),
  gallery: buildPageMeta({
    title: `Tattoo Gallery | ${contact.shortName} ${"Tattoo Studio"}, Kandivali West`,
    description:
      "Browse the Street Culture tattoo gallery — black & grey, realism, fine line, traditional, lettering, cover ups and custom work from our Kandivali West, Mumbai studio.",
    path: "/gallery",
  }),
  book: buildPageMeta({
    title: `Book a Tattoo | ${contact.shortName} Tattoo Studio, Kandivali West`,
    description:
      "Book a tattoo at Street Culture, Kandivali West, Mumbai. Choose your artist, share your idea and get a consultation on WhatsApp — the fastest way to start your custom tattoo.",
    path: "/book",
  }),
  academy: buildPageMeta({
    title: `Tattoo Academy in Mumbai | ${siteName}`,
    description:
      "Street Culture Academy — structured, practical tattoo training in Mumbai. Fundamentals, machines, linework, shading, hygiene and portfolio building under working artists.",
    path: "/academy",
  }),
  blog: buildPageMeta({
    title: `Tattoo Journal — Guides, Aftercare & Culture | ${siteName}`,
    description:
      "Guides and stories from Street Culture Tattoo Studio, Mumbai — first tattoos, aftercare, styles, cost of tattoos in Mumbai and life inside the studio.",
    path: "/blog",
  }),
  careers: buildPageMeta({
    title: `Careers & Apprenticeships | ${siteName}`,
    description:
      "Join Street Culture in Kandivali West, Mumbai — artist, apprentice, content and studio roles. See how to apply and what we look for.",
    path: "/careers",
  }),
  contact: buildPageMeta({
    title: `Contact & Location — Kandivali West, Mumbai | ${siteName}`,
    description:
      "Find Street Culture Tattoo Studio in Kandivali West, Mumbai. Address, WhatsApp number, opening hours, directions and how to reach us by train.",
    path: "/contact",
  }),
  concept: buildPageMeta({
    title: `AI Tattoo Concept Lab | ${siteName}`,
    description:
      "Upload a reference image, describe your tattoo idea and get a personalized AI-drafted concept brief from Street Culture — style notes, placement guidance and the right artist for the job.",
    path: "/concept",
  }),
};

/* ------------------------------------------------------------------ */
/*  Structured data generators                                         */
/* ------------------------------------------------------------------ */

/** Convert "11:00 AM" to "11:00" schema time format. */
function toSchemaTime(t: string): string {
  const m = t.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m) return "11:00";
  let h = parseInt(m[1], 10);
  const min = m[2];
  const ap = m[3].toUpperCase();
  if (ap === "PM" && h !== 12) h += 12;
  if (ap === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${min}`;
}

export function localBusinessSchema() {
  const a = contact.address;
  return {
    "@context": "https://schema.org",
    "@type": ["TattooShop", "LocalBusiness"],
    "@id": `${siteUrl}/#business`,
    name: contact.studioName,
    alternateName: contact.shortName,
    slogan: contact.tagline,
    url: siteUrl,
    image: absoluteUrl(ogImage),
    telephone: `+${contact.whatsappNumber}`,
    email: contact.email,
    priceRange: "₹₹",
    /** Brand accent (yellow) surfaced for rich results. */
    color: BRAND_COLOR,
    address: {
      "@type": "PostalAddress",
      streetAddress: a.street,
      addressLocality: a.locality,
      addressRegion: a.state,
      postalCode: a.postalCode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: contact.geo.latitude,
      longitude: contact.geo.longitude,
    },
    openingHoursSpecification: contact.openingHours
      .filter((h) => !h.hours.toLowerCase().includes("appointment"))
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.day,
        opens: toSchemaTime(h.hours.split("–")[0]?.trim() || "11:00 AM"),
        closes: toSchemaTime(h.hours.split("–")[1]?.trim() || "8:00 PM"),
      })),
    sameAs: [contact.social.instagram].filter(Boolean),
    areaServed: ["Kandivali West", "Kandivali", "Malad", "Borivali", "Goregaon", "Mumbai"].map(
      (name) => ({ "@type": "Place", name }),
    ),
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: contact.studioName,
    url: siteUrl,
    logo: absoluteUrl("/logo.svg"),
    slogan: contact.tagline,
    sameAs: [contact.social.instagram].filter(Boolean),
  };
}

export function personSchema(artist: {
  name: string;
  role: string;
  bio: string;
  slug: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: artist.name,
    jobTitle: artist.role,
    description: artist.bio,
    url: seoUrl(`/artists/${artist.slug}`),
    image: artist.image ? absoluteUrl(artist.image) : undefined,
    worksFor: { "@type": "TattooShop", name: contact.studioName, "@id": `${siteUrl}/#business` },
  };
}

export function articleSchema(post: {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: contact.studioName,
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo.svg") },
    },
    mainEntityOfPage: seoUrl(`/blog/${post.slug}`),
    image: post.image ? absoluteUrl(post.image) : absoluteUrl(ogImage),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: seoUrl(item.path),
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
