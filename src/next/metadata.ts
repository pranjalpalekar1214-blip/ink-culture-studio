import type { Metadata } from "next";
import { absoluteUrl, ogImage, ogImageSize, pageMeta, siteName } from "@/config/seo";

export function metadataFromPage(meta: (typeof pageMeta)[keyof typeof pageMeta]): Metadata {
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: { canonical: meta.canonical },
    robots: meta.noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: meta.canonical,
      siteName,
      locale: "en_IN",
      type: meta.type,
      images: [{ url: meta.image, width: ogImageSize.width, height: ogImageSize.height, alt: meta.title }],
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description, images: [meta.image] },
  };
}

export const defaultImage = absoluteUrl(ogImage);
