import type { Metadata } from "next";
import ClientRouteBoundary from "@/next/ClientRouteBoundary";
import { metadataFromPage } from "@/next/metadata";
import { staticMetadata } from "@/next/route-metadata";

export const metadata: Metadata = metadataFromPage(staticMetadata.contact);
export default function ContactPage() {
  return <ClientRouteBoundary routePath="/contact" />;
}
