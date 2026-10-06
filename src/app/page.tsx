import type { Metadata } from "next";
import ClientRouteBoundary from "@/next/ClientRouteBoundary";
import { metadataFromPage } from "@/next/metadata";
import { staticMetadata } from "@/next/route-metadata";

export const metadata: Metadata = metadataFromPage(staticMetadata.home);
export default function HomePage() {
  return <ClientRouteBoundary routePath="/" />;
}
