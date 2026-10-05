import { useState, type ReactNode } from "react";
import { StickArtistFigure } from "@/components/art";
import { cn } from "@/lib/utils";
import type { Artist } from "@/data/artists";

/**
 * Artist portrait plate.
 *
 * Renders the real studio photo from /public/images/artists/<id>.jpg and falls
 * back to the illustrated stick figure if the file isn't there yet, so dropping
 * the photos in later needs no code change.
 *
 * `className` styles the photo box, `fallbackClassName` the illustration, and
 * `fallback` swaps in a custom illustration entirely (the collectible card uses
 * it so a missing photo degrades to the artist's caricature, not a stick figure).
 */
export function ArtistPhoto({
  artist,
  className,
  fallbackClassName,
  alt,
  fallback,
}: {
  artist: Artist;
  className?: string;
  fallbackClassName?: string;
  alt?: string;
  fallback?: ReactNode;
}) {
  const [failed, setFailed] = useState(false);
  const src = `/images/artists/${artist.id}.jpg`;

  if (failed) {
    if (fallback) return <>{fallback}</>;
    return (
      <StickArtistFigure
        who={artist.portrait}
        className={cn("mx-auto h-56 w-auto text-bone/85 sm:h-64", fallbackClassName)}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt ?? `${artist.name}, ${artist.role} at Street Culture`}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={cn(
        // Grayscale + contrast so the portraits sit inside the site's
        // dark-editorial look regardless of how the photo was shot.
        "h-56 w-full object-cover object-center grayscale contrast-[1.05] sm:h-64",
        className,
      )}
    />
  );
}