import { notFound } from "next/navigation";
import { getArtist, artists } from "@/data/artists";
import { blogPosts } from "@/data/blog";
import LegacySiteIsland from "@/next/LegacySiteIsland";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

const staticRoutes = new Set([
  "",
  "about",
  "artists",
  "gallery",
  "academy",
  "blog",
  "book",
  "redeem",
  "careers",
  "contact",
  "concept",
]);

export default async function Page({ params }: PageProps) {
  const { slug = [] } = await params;
  const path = slug.join("/");
  const isArtistRoute = slug[0] === "artists" &&
    (slug.length === 2 || (slug.length === 3 && slug[2] === "portfolio")) &&
    Boolean(getArtist(slug[1]));
  const isBlogPostRoute = slug[0] === "blog" && slug.length === 2 &&
    blogPosts.some((post) => post.slug === slug[1]);

  if (!staticRoutes.has(path) && !isArtistRoute && !isBlogPostRoute) {
    notFound();
  }

  return <LegacySiteIsland />;
}

export function generateStaticParams() {
  return [
    ...artists.flatMap((artist) => [
      { slug: ["artists", artist.id] },
      { slug: ["artists", artist.id, "portfolio"] },
    ]),
    ...blogPosts.map((post) => ({ slug: ["blog", post.slug] })),
  ];
}
