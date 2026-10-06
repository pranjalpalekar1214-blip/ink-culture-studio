import type { MetadataRoute } from "next";

const siteUrl = "https://streetculture.tattoo";

const routes = [
  ["/", 1, "weekly"],
  ["/about", 0.8, "monthly"],
  ["/artists", 0.9, "monthly"],
  ["/artists/karan", 0.8, "monthly"],
  ["/artists/karan/portfolio", 0.7, "monthly"],
  ["/artists/lucky", 0.8, "monthly"],
  ["/artists/lucky/portfolio", 0.7, "monthly"],
  ["/gallery", 0.9, "weekly"],
  ["/book", 1, "monthly"],
  ["/academy", 0.9, "monthly"],
  ["/blog", 0.8, "weekly"],
  ["/blog/how-to-choose-your-first-tattoo", 0.7, undefined],
  ["/blog/how-much-does-a-tattoo-cost-in-mumbai", 0.7, undefined],
  ["/blog/how-to-prepare-for-your-tattoo-appointment", 0.7, undefined],
  ["/blog/black-and-grey-vs-colour-tattoos", 0.7, undefined],
  ["/blog/how-tattoo-aftercare-actually-works", 0.7, undefined],
  ["/blog/best-tattoo-placements-for-your-first-tattoo", 0.7, undefined],
  ["/blog/things-you-should-never-do-before-a-tattoo", 0.7, undefined],
  ["/blog/cover-up-tattoos-what-you-need-to-know", 0.7, undefined],
  ["/blog/why-we-built-the-street-culture-academy", 0.7, undefined],
  ["/careers", 0.6, "monthly"],
  ["/contact", 0.9, "monthly"],
  ["/concept", 0.8, "monthly"],
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(([path, priority, changeFrequency]) => ({
    url: `${siteUrl}${path}`,
    priority,
    ...(changeFrequency ? { changeFrequency } : {}),
  }));
}
