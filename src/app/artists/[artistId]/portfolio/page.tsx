import { notFound } from "next/navigation";
import { artists, getArtist } from "@/data/artists";
import ClientRouteBoundary from "@/next/ClientRouteBoundary";

type PageProps = { params: Promise<{ artistId: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return artists.map((artist) => ({ artistId: artist.id }));
}

export default async function ArtistPortfolioRoute({ params }: PageProps) {
  const { artistId } = await params;
  if (!getArtist(artistId)) notFound();
  return <ClientRouteBoundary route="artist" />;
}
