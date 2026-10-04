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
  studioName: "Street Culture Tattoo & Academy",
  shortName: "Street Culture",
  tagline: "INK IS CULTURE.",

  /**
   * Google listing title (the verified business name on Google Maps).
   * Used for SEO titles where the full brand name is wanted.
   */
  googleListingName:
    "Street Culture Tattoo & Academy | Best Colour Tattoo Studio in Mumbai",

  /** Short business description used in meta/structured data. */
  description:
    "Professional tattoo and piercing studio specialising in custom designs and hygienic artistry.",

  /**
   * WhatsApp number in international format WITHOUT "+", spaces or dashes.
   * Used for wa.me links. Example: 919999999999
   */
  whatsappNumber: "919819700071",

  /** Number shown to humans on the site */
  displayPhone: "+91 98197 00071",

  /** Email shown on the site + used in mailto links */
  email: "streetculturetattoos@gmail.com",

  /** Address — keep NAP (Name / Address / Phone) consistent everywhere */
  address: {
    street:
      "Metro Station Pillar No. 283, Street Culture Tattoo & Academy, opp. Gaurav Heights",
    locality: "Kandivali West",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400067",
    country: "India",
    /** Landmarks / neighbourhoods that make the shop findable */
    areas: ["Adarsh Nagar", "Shravan Nagar", "Kandivali"],
    /** Full one-line address used in footer / schema */
    full:
      "Metro Station Pillar No. 283, Street Culture Tattoo & Academy, opp. Gaurav Heights, Adarsh Nagar, Shravan Nagar, Kandivali West, Mumbai, Maharashtra 400067",
  },

  /**
   * Geo coordinates for LocalBusiness schema + map pin.
   * NOTE: still an approximation for the Kandivali West area — send the Google
   * Maps share link to replace with the exact shopfront coordinates.
   */
  geo: { latitude: 19.2046, longitude: 72.8497 },

  /**
   * Google Maps embed (interactive map) and directions link. Both resolve to
   * the shopfront via the full street address. For a hard-pinned map, replace
   * with the embed URL from Google Maps → Share → Embed a map.
   */
  mapEmbedUrl:
    "https://www.google.com/maps?q=" +
    encodeURIComponent(
      "Street Culture Tattoo & Academy, Metro Station Pillar No. 283, opp. Gaurav Heights, Kandivali West, Mumbai 400067",
    ) +
    "&output=embed",

  /** Directions link (opens Google Maps with directions to the shopfront) */
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent(
      "Street Culture Tattoo & Academy, Metro Station Pillar No. 283, opp. Gaurav Heights, Kandivali West, Mumbai 400067",
    ),

  /** Google Business Profile — paste the "Own this business" listing URL */
  googleBusinessUrl: "",

  /** Google reviews — paste the listing's reviews URL */
  googleReviewUrl: "",

  /** Average Google rating (out of 5) — shown on the contact page + schema */
  googleRating: 4.86,

  social: {
    /**
     * Instagram accounts. `studio` is the main profile (also used as
     * `social.instagram` for schema sameAs + existing single links).
     */
    instagram: "https://instagram.com/streetculturetattoo_official",
    instagramHandle: "@streetculturetattoo_official",
    instagramStudio: {
      handle: "@streetculturetattoo_official",
      url: "https://instagram.com/streetculturetattoo_official",
      label: "Studio",
    },
    instagramAcademy: {
      handle: "@streetculturetattoo_academy",
      url: "https://instagram.com/streetculturetattoo_academy",
      label: "Academy",
    },
    /**
     * Facebook — PLACEHOLDER. Send the page URL/handle and it will switch on
     * across the footer, the contact page and the social dock.
     */
    facebook: "",
    facebookHandle: "",
    youtube: "",
  },

  /** Landing page (Instagram) description, verbatim from the profile */
  profileBio:
    "TATTOOS | PIERCING | ACADEMY. Team of multiple award winning tattoo artists. Sharing Art - Culture & Love.",

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
