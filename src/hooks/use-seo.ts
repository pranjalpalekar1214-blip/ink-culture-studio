import { useEffect, useState } from "react";
import type { SeoInput } from "@/config/seo";
import { buildPageMeta, ogImageSize } from "@/config/seo";

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
  // Pages pass inline object literals, so the reference changes on every
  // render. Keying the effect on the serialised content means the head is
  // only touched when the metadata actually changes.
  const key = input ? JSON.stringify(input) : null;

  useEffect(() => {
    if (!input) return;
    const meta = buildPageMeta({ ...input, path: input.path ?? "/" });

    document.title = meta.title;
    setMeta("name", "description", meta.description);
    setCanonical(meta.canonical);
    setMeta("name", "keywords", meta.keywords.join(", "));
    setMeta(
      "name",
      "robots",
      meta.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large",
    );
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("property", "og:url", meta.canonical);
    setMeta("property", "og:type", meta.type);
    setMeta("property", "og:image", meta.image);
    setMeta("property", "og:image:width", String(ogImageSize.width));
    setMeta("property", "og:image:height", String(ogImageSize.height));
    setMeta("property", "og:image:alt", meta.title);
    setMeta("property", "og:site_name", meta.siteName);
    setMeta("property", "og:locale", meta.locale);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", meta.title);
    setMeta("name", "twitter:description", meta.description);
    setMeta("name", "twitter:image", meta.image);
    setMeta("name", "twitter:image:alt", meta.title);
    if (meta.type === "article" && meta.publishedTime) {
      setMeta("property", "article:published_time", meta.publishedTime);
    }
    if (meta.author) {
      setMeta("name", "author", meta.author);
      setMeta("property", "article:author", meta.author);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on serialised content above
  }, [key]);
}

/**
 * Data boundary for JSON-LD: pages pass either a bare schema object
 * (breadcrumbSchema(...) etc.) or an array of them — always return a clean
 * array of non-null objects so downstream code can rely on `.forEach`.
 */
function normalizeBlocks(schema: object | object[] | null): object[] {
  if (!schema) return [];
  const list = Array.isArray(schema) ? schema : [schema];
  return list.filter(
    (block): block is object => typeof block === "object" && block !== null,
  );
}

/** Inject one or more JSON-LD structured-data blocks scoped to this page. */
export function useJsonLd(schema: object | object[] | null) {
  // Same reason as useSeo: new array/object literal per render, so serialise
  // once and let the effect depend on the string. Stops JSON.stringify +
  // DOM writes on every render of motion-heavy pages.
  const blocks = normalizeBlocks(schema);
  const key = blocks.length > 0 ? JSON.stringify(blocks) : null;

  useEffect(() => {
    if (!key) return;
    const parsed: unknown = JSON.parse(key);
    if (!Array.isArray(parsed)) {
      // Invariant: `key` is serialised from an array above, so this cannot
      // happen — but if it ever does, fail with a real message instead of a
      // cryptic `blocks.forEach is not a function` deeper in the effect.
      throw new Error(
        `useJsonLd: expected an array of schema blocks, got ${typeof parsed}`,
      );
    }
    const ids: string[] = [];
    parsed.forEach((block, i) => {
      const id = `ld-page-${i}`;
      ids.push(id);
      upsertJsonLd(id, block as object);
    });
    return () => {
      ids.forEach((id) => document.getElementById(id)?.remove());
    };
  }, [key]);
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
