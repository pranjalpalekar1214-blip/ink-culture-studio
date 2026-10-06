import type { Metadata } from "next";
import ClientRouteBoundary from "@/next/ClientRouteBoundary";
import { metadataFromPage } from "@/next/metadata";
import { staticMetadata } from "@/next/route-metadata";

export const metadata: Metadata = metadataFromPage(staticMetadata.artists);
export default function ArtistsPage() {
  return <ClientRouteBoundary routePath="/artists" />;
}
