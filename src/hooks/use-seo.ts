import { useEffect, useState } from "react";
import type { SeoInput } from "@/config/seo";
import { buildPageMeta } from "@/config/seo";

type SeoArgs = Omit<SeoInput, "path"> & { path?: string };

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(id: string, json: object) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.setAttribute("type", "application/ld+json");
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(json);
}

/**
 * Declaratively manage <head> content for a page.
 * Pass `null` while navigating/transitioning to reset managed tags.
 */
/** Accepts either a raw SeoInput or a prebuilt meta object from `pageMeta`. */
export function useSeo(input: SeoArgs | null) {
  useEffect(() => {
    if (!input) return;
    const meta = buildPageMeta({ ...input, path: input.path ?? "/" });

    document.title = meta.title;
    setMeta("name", "description", meta.description);
    setCanonical(meta.canonical);
    setMeta("name", "keywords", meta.keywords.join(", "));
    setMeta("name", "robots", "index, follow, max-image-preview:large");
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("property", "og:url", meta.canonical);
    setMeta("property", "og:type", meta.type);
    setMeta("property", "og:image", meta.image);
    setMeta("property", "og:site_name", meta.siteName);
    setMeta("property", "og:locale", meta.locale);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", meta.title);
    setMeta("name", "twitter:description", meta.description);
    setMeta("name", "twitter:image", meta.image);
    if (meta.type === "article" && meta.publishedTime) {
      setMeta("property", "article:published_time", meta.publishedTime);
    }
  }, [input]);
}

/** Inject one or more JSON-LD structured-data blocks scoped to this page. */
export function useJsonLd(schema: object | object[] | null) {
  useEffect(() => {
    if (!schema) return;
    const blocks = Array.isArray(schema) ? schema : [schema];
    const ids: string[] = [];
    blocks.forEach((block, i) => {
      const id = `ld-page-${i}`;
      ids.push(id);
      upsertJsonLd(id, block);
    });
    return () => {
      ids.forEach((id) => document.getElementById(id)?.remove());
    };
  }, [schema]);
}

/** Tracks the active media query as a boolean (SSR-safe). */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}
