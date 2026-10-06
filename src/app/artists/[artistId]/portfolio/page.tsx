import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { metadataFromPage } from "@/next/metadata";
import { pageMeta } from "@/config/seo";
import { artists, getArtist } from "@/data/artists";
import ClientRouteBoundary from "@/next/ClientRouteBoundary";

type PageProps = { params: Promise<{ artistId: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return artists.map((artist) => ({ artistId: artist.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { artistId } = await params;
  const artistMeta = pageMeta[artistId as "karan" | "lucky"] ?? pageMeta.artists;
  return metadataFromPage({ ...artistMeta, title: `${artistMeta.title} Portfolio | Street Culture Tattoo & Academy`, canonical: `https://streetculture.tattoo/artists/${artistId}/portfolio`, path: `/artists/${artistId}/portfolio` });
}

export default async function ArtistPortfolioRoute({ params }: PageProps) {
  const { artistId } = await params;
  if (!getArtist(artistId)) notFound();
  return <ClientRouteBoundary route="artist" />;
}
