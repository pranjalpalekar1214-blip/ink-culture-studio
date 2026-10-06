import type { Metadata } from "next";
import ClientRouteBoundary from "@/next/ClientRouteBoundary";
import { metadataFromPage } from "@/next/metadata";
import { staticMetadata } from "@/next/route-metadata";

export const metadata: Metadata = metadataFromPage(staticMetadata.careers);
export default function CareersPage() {
  return <ClientRouteBoundary routePath="/careers" />;
}
