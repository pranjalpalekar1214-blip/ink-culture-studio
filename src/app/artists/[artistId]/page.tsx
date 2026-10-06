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
  return metadataFromPage(pageMeta[artistId as "karan" | "lucky"] ?? pageMeta.artists);
}

export default async function ArtistRoute({ params }: PageProps) {
  const { artistId } = await params;
  if (!getArtist(artistId)) notFound();
  return <ClientRouteBoundary route="artist" />;
}
