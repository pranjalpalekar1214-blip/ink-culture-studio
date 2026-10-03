/**
 * ============================================================
 *  STREET CULTURE — CONTACT & INTEGRATION CONFIG
 * ============================================================
 *  Every phone number, form endpoint and external link on the
 *  website is driven from this single file. Edit the values
 *  below — never hardcode them inside components.
 * ============================================================
 */

export const contact = {
  /** Studio display name */
  studioName: "Street Culture Tattoo Studio and Academy",
  shortName: "Street Culture",
  tagline: "INK IS CULTURE.",

  /**
   * WhatsApp number in international format WITHOUT "+", spaces or dashes.
   * Used for wa.me links. Example: 919999999999
   */
  whatsappNumber: "910000000000",

  /** Number shown to humans on the site */
  displayPhone: "+91 00000 00000",

  /** Email shown on the site + used in mailto links */
  email: "hello@streetculture.tattoo",

  /** Address — keep NAP (Name / Address / Phone) consistent everywhere */
  address: {
    street: "Shop G-XX, Example Plaza, S.V. Road",
    locality: "Kandivali West",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400067",
    country: "India",
    /** Full one-line address used in footer / schema */
    full: "Kandivali West, Mumbai, Maharashtra 400067, India",
  },

  /** Geo coordinates for LocalBusiness schema (Kandivali West approx.) */
  geo: { latitude: 19.2046, longitude: 72.8497 },

  /**
   * Google Maps embed (interactive map). Replace with the studio's real
   * embed URL from Google Maps → Share → Embed a map.
   */
  mapEmbedUrl:
    "https://www.google.com/maps?q=Kandivali+West,+Mumbai,+Maharashtra&output=embed",

  /** Directions link (opens Google Maps with directions) */
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Kandivali+West,+Mumbai,+Maharashtra",

  /** Google Business Profile — replace with real profile URL */
  googleBusinessUrl: "",

  /** Google reviews — replace with real review link */
  googleReviewUrl: "",

  /** Average Google rating (out of 5) — shown on the contact page */
  googleRating: 4.58,

  social: {
    instagram: "https://instagram.com/streetculture.tattoo",
    instagramHandle: "@streetculture.tattoo",
    facebook: "",
    youtube: "",
  },

  /** Editable opening hours — key order is display order. "Closed" = day off. */
  openingHours: [
    { day: "Monday", hours: "12:00 PM – 9:00 PM" },
    { day: "Tuesday", hours: "12:00 PM – 9:00 PM" },
    { day: "Wednesday", hours: "12:00 PM – 9:00 PM" },
    { day: "Thursday", hours: "12:00 PM – 9:00 PM" },
    { day: "Friday", hours: "Closed" },
    { day: "Saturday", hours: "12:00 PM – 9:00 PM" },
    { day: "Sunday", hours: "12:00 PM – 9:00 PM" },
  ],
} as const;

/**
 * ============================================================
 *  GOOGLE FORMS INTEGRATION (configurable)
 * ============================================================
 *  1. Create a Google Form with fields matching your needs.
 *  2. Get the form's action URL (viewform → formResponse) and set
 *     `googleForm.bookingsUrl`.
 *  3. For each entry, right-click the form → Inspect → find
 *     `entry.xxxxxxxx` input names and map them below.
 *  4. The submit logic lives in src/lib/forms.ts and posts
 *     application/x-www-form-urlencoded so no CORS preflight is needed.
 *  Until configured, the site falls back to WhatsApp + mailto only.
 * ============================================================
 */
export const googleForm = {
  bookingsUrl: "",
  careersUrl: "",
  academyUrl: "",
  /** Map semantic field names → Google Form entry ids */
  bookingsEntryFields: {
    name: "entry_000000001",
    whatsapp: "entry_000000002",
    email: "entry_000000003",
    service: "entry_000000004",
    artist: "entry_000000005",
    idea: "entry_000000006",
    placement: "entry_000000007",
    size: "entry_000000008",
    style: "entry_000000009",
    budget: "entry_000000010",
    date: "entry_000000011",
    time: "entry_000000012",
    contactPreference: "entry_000000013",
    notes: "entry_000000014",
  },
  careersEntryFields: {
    name: "entry_000000021",
    email: "entry_000000022",
    whatsapp: "entry_000000023",
    role: "entry_000000024",
    experience: "entry_000000025",
    portfolio: "entry_000000026",
    instagram: "entry_000000027",
    message: "entry_000000028",
  },
  academyEntryFields: {
    name: "entry_000000031",
    email: "entry_000000032",
    whatsapp: "entry_000000033",
    experience: "entry_000000034",
    message: "entry_000000035",
  },
} as const;

/** Site-wide deployment URL used for canonical URLs, sitemap & schema. */
export const siteUrl =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SITE_URL) ||
  "https://streetculture.tattoo";
