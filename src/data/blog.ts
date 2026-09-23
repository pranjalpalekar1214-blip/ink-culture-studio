/**
 * Blog data — categories, posts, full body content.
 * Article bodies are placeholder editorial copy; replace freely.
 * Each post's SEO title/description drive meta + Article schema.
 */

export type BlogCategory =
  | "Tattoo Guides"
  | "Tattoo Aftercare"
  | "Tattoo Styles"
  | "Tattoo Ideas"
  | "Artist Stories"
  | "Tattoo Culture"
  | "Academy"
  | "Studio News";

export const blogCategories: BlogCategory[] = [
  "Tattoo Guides",
  "Tattoo Aftercare",
  "Tattoo Styles",
  "Tattoo Ideas",
  "Artist Stories",
  "Tattoo Culture",
  "Academy",
  "Studio News",
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  author: string;
  date: string;
  /** ISO date for schema */
  dateISO: string;
  readTime: string;
  image: string;
  alt: string;
  seoTitle?: string;
  seoDescription?: string;
  /** Simple paragraph/heading blocks rendered on the post page */
  body: { type: "p" | "h2" | "quote"; text: string }[];
};

const img = (style: string) =>
  `/images/placeholder/${style.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.svg`;

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-choose-your-first-tattoo",
    title: "How To Choose Your First Tattoo",
    excerpt:
      "Placement, size, style, budget — a calm, practical guide to making your first tattoo something you'll still love in ten years.",
    category: "Tattoo Guides",
    author: "Street Culture Team",
    date: "12 Aug 2026",
    dateISO: "2026-08-12",
    readTime: "6 min read",
    image: img("Fine Line"),
    alt: "Fine line tattoo design sketch — placeholder image for the first tattoo guide",
    seoTitle: "How To Choose Your First Tattoo: A Practical Guide",
    seoDescription:
      "Choosing your first tattoo in Mumbai? Placement, size, style and budget advice from tattoo artists at Street Culture, Kandivali West.",
    body: [
      { type: "h2", text: "Start with the why, not the what" },
      {
        type: "p",
        text: "The first question we ask in a consultation is never \"what design do you want?\" — it's \"why this, and why now?\" A first tattoo works best when it marks something real: a person, a place, a change, a promise. The design can be abstract; the meaning doesn't have to be.",
      },
      { type: "h2", text: "Placement beats aesthetics" },
      {
        type: "p",
        text: "Wrists, forearms and collarbones heal differently and age differently. Think about visibility at work, sun exposure, and how the area changes when you move. During your consultation we map the design onto your actual body — not just a flat sketch.",
      },
      { type: "quote", text: "A first tattoo should feel like a door opening, not a door closing." },
      { type: "h2", text: "Size honestly" },
      {
        type: "p",
        text: "Fine line work photographs beautifully but heals soft. If you want detail that lasts, go slightly larger than feels comfortable. We'll tell you honestly what a design needs — even if that means talking you into less tattoo than you asked for.",
      },
      { type: "h2", text: "Budget for quality" },
      {
        type: "p",
        text: "Cheap tattoos are expensive to fix. Cover-ups cost more than the original piece would have. Get it done right the first time, by an artist whose healed work you've actually seen.",
      },
    ],
  },
  {
    slug: "how-much-does-a-tattoo-cost-in-mumbai",
    title: "How Much Does A Tattoo Cost In Mumbai?",
    excerpt:
      "What actually drives tattoo pricing in Mumbai — size, placement, artist experience — and how to think about budget without getting priced into a bad decision.",
    category: "Tattoo Guides",
    author: "Street Culture Team",
    date: "05 Aug 2026",
    dateISO: "2026-08-05",
    readTime: "5 min read",
    image: img("Custom"),
    alt: "Custom tattoo design sheet — placeholder image for the Mumbai tattoo cost guide",
    body: [
      { type: "h2", text: "The honest answer" },
      {
        type: "p",
        text: "Tattoo pricing in Mumbai typically depends on four things: size, placement, style complexity and the artist's experience. This article is a framework, not a price list — every studio quotes differently, and you should always ask what's included.",
      },
      { type: "h2", text: "What you're actually paying for" },
      {
        type: "p",
        text: "A professional tattoo price covers single-use needles and cartridges, medical-grade sterilisation, custom design time, the artist's years of practice, and a studio that would pass a hospital's hygiene walk-through. If a quote seems too good, something in that list is missing.",
      },
      { type: "quote", text: "Cheap tattoos aren't cheap. They're deferred payments with interest." },
      { type: "h2", text: "How to get a real quote" },
      {
        type: "p",
        text: "Send your idea, placement and approximate size on WhatsApp with a reference image. A studio that quotes without those three things is guessing. We quote consultations free — the tattoo itself is priced after the design is scoped.",
      },
    ],
  },
  {
    slug: "how-to-prepare-for-your-tattoo-appointment",
    title: "How To Prepare For Your Tattoo Appointment",
    excerpt:
      "Sleep, food, skin, clothing — the unglamorous checklist that makes your session smoother, less painful and better healed.",
    category: "Tattoo Guides",
    author: "Street Culture Team",
    date: "28 Jul 2026",
    dateISO: "2026-07-28",
    readTime: "4 min read",
    image: img("Traditional"),
    alt: "Traditional tattoo flash sheet — placeholder image for the appointment preparation guide",
    body: [
      { type: "h2", text: "The night before" },
      {
        type: "p",
        text: "Sleep properly. Hydrate. Skip alcohol for 24 hours — it thins your blood and makes both bleeding and healing worse. Moisturise the area you're getting tattooed, but skip heavy oils on the day itself.",
      },
      { type: "h2", text: "The morning of" },
      {
        type: "p",
        text: "Eat a real meal before you arrive — a tattoo session on an empty stomach is how people get dizzy. Wear clothing that exposes the placement easily and that you don't mind getting ink on. Bring headphones; long sessions are mental as much as physical.",
      },
      { type: "h2", text: "What to skip" },
      {
        type: "p",
        text: "No painkillers that thin blood, no tanning, no waxing or exfoliating the area for a few days before, and no arriving sunburnt. If you're unwell, reschedule — a compromised immune system heals worse.",
      },
    ],
  },
  {
    slug: "black-and-grey-vs-colour-tattoos",
    title: "Black & Grey vs Colour Tattoos",
    excerpt:
      "How the two really compare on healing, ageing, skin tone and style — from artists who work in both every week.",
    category: "Tattoo Styles",
    author: "Karan",
    date: "20 Jul 2026",
    dateISO: "2026-07-20",
    readTime: "6 min read",
    image: img("Black-Grey"),
    alt: "Black and grey realism tattoo — placeholder image comparing black & grey and colour tattoos",
    body: [
      { type: "h2", text: "Different languages, same grammar" },
      {
        type: "p",
        text: "Black & grey is built from value — light, shadow, depth. Colour is built from hue and saturation. Neither is harder; they're different disciplines. The right question is what the design demands, not which looks cooler on a feed.",
      },
      { type: "h2", text: "Ageing" },
      {
        type: "p",
        text: "Black & grey generally holds contrast longer and is more forgiving of sun exposure. Colour can age beautifully when packed correctly and cared for — but pastels on exposed placements will fade faster. Darker skin tones often read best with bold black work or saturated colour, not pale pastels.",
      },
      { type: "quote", text: "Choose the palette that serves the story — the story outlives the trend." },
      { type: "h2", text: "Mixing both" },
      {
        type: "p",
        text: "Some of our favourite pieces are black & grey with one deliberate colour accent — a red thread, a green eye. Restraint reads as intention.",
      },
    ],
  },
  {
    slug: "how-tattoo-aftercare-actually-works",
    title: "How Tattoo Aftercare Actually Works",
    excerpt:
      "Wash, moisturise, protect — and ignore the myths. What the healing timeline really looks like, day by day.",
    category: "Tattoo Aftercare",
    author: "Street Culture Team",
    date: "14 Jul 2026",
    dateISO: "2026-07-14",
    readTime: "5 min read",
    image: img("Small"),
    alt: "Freshly finished small tattoo — placeholder image for the tattoo aftercare guide",
    body: [
      { type: "h2", text: "Days 1–3: it's an open wound" },
      {
        type: "p",
        text: "Wash gently with lukewarm water and mild, fragrance-free soap, pat dry with clean paper towel, and follow your artist's specific wrap instructions. No gym, no swimming, no direct sun.",
      },
      { type: "h2", text: "Days 4–14: the itch" },
      {
        type: "p",
        text: "Peeling is normal; scratching is not. Thin layers of the recommended moisturiser, two to three times a day. It will look dull under the flaking skin — do not panic, that's temporary.",
      },
      { type: "h2", text: "Weeks 3–6: settle" },
      {
        type: "p",
        text: "The surface looks healed before the deeper layers are. Keep sunscreen on it for life — UV is the single biggest killer of tattoo contrast. If anything looks infected (spreading redness, heat, pus), contact the studio immediately, not the internet.",
      },
    ],
  },
  {
    slug: "best-tattoo-placements-for-your-first-tattoo",
    title: "Best Tattoo Placements For Your First Tattoo",
    excerpt:
      "Forearm, calf, shoulder, thigh — where first tattoos heal easiest, hurt least and stay looking good the longest.",
    category: "Tattoo Ideas",
    author: "Lucky",
    date: "08 Jul 2026",
    dateISO: "2026-07-08",
    readTime: "5 min read",
    image: img("Geometric"),
    alt: "Geometric forearm tattoo — placeholder image for the first tattoo placement guide",
    body: [
      { type: "h2", text: "Outer forearm" },
      {
        type: "p",
        text: "The classic first-tattoo placement: easy to show or cover, flat canvas, moderate pain, heals well. Great for linework, script and medium compositions.",
      },
      { type: "h2", text: "Calf and thigh" },
      {
        type: "p",
        text: "More canvas, more privacy. Ideal if your workplace requires covered tattoos. Thigh pieces heal slightly slower purely because of friction from clothing.",
      },
      { type: "h2", text: "Shoulder and upper arm" },
      {
        type: "p",
        text: "Good pain tolerance, ages well, expands naturally into half sleeves later. Curves demand design adjustments — that's a conversation, not a limitation.",
      },
      { type: "h2", text: "Think twice first" },
      {
        type: "p",
        text: "Hands, ribs, spine and feet are all tattooable — but for a first tattoo they combine higher pain, trickier healing or faster fading. There's no rush; the placement isn't going anywhere.",
      },
    ],
  },
  {
    slug: "things-you-should-never-do-before-a-tattoo",
    title: "Things You Should Never Do Before A Tattoo",
    excerpt:
      "Alcohol, sunburn, gym sessions, sleeping in — a short list of the mistakes we see most, and what to do instead.",
    category: "Tattoo Guides",
    author: "Street Culture Team",
    date: "30 Jun 2026",
    dateISO: "2026-06-30",
    readTime: "4 min read",
    image: img("Lettering"),
    alt: "Custom lettering tattoo sketch — placeholder image for the pre-tattoo mistakes guide",
    body: [
      { type: "h2", text: "Don't drink the night before" },
      {
        type: "p",
        text: "Alcohol thins your blood, increases bleeding during the session and interferes with healing for days. 24–48 hours clean is the standard we ask for.",
      },
      { type: "h2", text: "Don't come sunburnt" },
      {
        type: "p",
        text: "We cannot tattoo damaged skin. If you've burned the placement, reschedule — the tattoo will wait, your skin won't heal faster for being tattooed over.",
      },
      { type: "h2", text: "Don't shave the area yourself" },
      {
        type: "p",
        text: "We handle prep with sterile, single-use equipment. DIY shaving with nicks and irritation just gives us a worse canvas and you a worse heal.",
      },
      { type: "quote", text: "The best sessions start before you walk through the door." },
    ],
  },
  {
    slug: "cover-up-tattoos-what-you-need-to-know",
    title: "Cover Up Tattoos: What You Need To Know",
    excerpt:
      "What's possible, what isn't, and how artists design around old lines, dark ink and regret — honestly.",
    category: "Tattoo Styles",
    author: "Karan",
    date: "22 Jun 2026",
    dateISO: "2026-06-22",
    readTime: "6 min read",
    image: img("Cover-Up"),
    alt: "Cover up tattoo in progress — placeholder image for the cover up tattoo guide",
    body: [
      { type: "h2", text: "A cover-up is a redesign, not a patch" },
      {
        type: "p",
        text: "Old ink doesn't disappear — it gets incorporated. Dark existing lines constrain the new composition, so a good cover-up design is built around them from the first sketch, not after.",
      },
      { type: "h2", text: "Bigger is usually better" },
      {
        type: "p",
        text: "Expect the new piece to be 20–40% larger than what it's covering. That's physics, not upselling: we need room to distract the eye from the old lines.",
      },
      { type: "h2", text: "Laser isn't failure" },
      {
        type: "p",
        text: "A few laser fading sessions before a cover-up can open up design options dramatically. We'll tell you honestly when fading first is the better path — and when it's unnecessary.",
      },
    ],
  },
  {
    slug: "why-we-built-the-street-culture-academy",
    title: "Why We Built The Street Culture Academy",
    excerpt:
      "Tattoo education in India is full of shortcuts and secret syllabi. Here's the opposite: what we teach, in what order, and why.",
    category: "Academy",
    author: "Street Culture Team",
    date: "15 Jun 2026",
    dateISO: "2026-06-15",
    readTime: "7 min read",
    image: img("Portrait"),
    alt: "Apprentice practising tattoo linework — placeholder image for the academy announcement post",
    body: [
      { type: "h2", text: "The problem with shortcuts" },
      {
        type: "p",
        text: "Too many 'tattoo courses' teach a machine, not a craft. Skipping hygiene, skipping drawing, skipping client work — that's how bad habits and unsafe studios multiply. Our academy starts with paper and ends with clients.",
      },
      { type: "h2", text: "Structure over vibes" },
      {
        type: "p",
        text: "Fundamentals, machines, linework, shading, colour, hygiene, consultation, portfolio — in that order, with checkpoints. You advance when your work proves it, not when the calendar does.",
      },
      { type: "quote", text: "We don't want students who can copy a design. We want artists who can solve one." },
      { type: "h2", text: "Learn from working artists" },
      {
        type: "p",
        text: "Every session is taught inside a running studio — you watch real consultations, real hygiene routines and real client conversations, because that is the job.",
      },
    ],
  },
];

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);

export const relatedPosts = (post: BlogPost, count = 3) =>
  blogPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const score = (x: BlogPost) => (x.category === post.category ? 2 : 0);
      return score(b) - score(a);
    })
    .slice(0, count);
