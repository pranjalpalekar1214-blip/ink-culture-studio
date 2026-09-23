import { GalleryGrid } from "@/components/GalleryGrid";
import { InkButton, PageHero, Reveal } from "@/components/ui-kit";
import { breadcrumbSchema, pageMeta } from "@/config/seo";
import { useJsonLd, useSeo } from "@/hooks/use-seo";

export default function Gallery() {
  useSeo(pageMeta.gallery);
  useJsonLd(
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Gallery", path: "/gallery" },
    ]),
  );

  return (
    <>
      <PageHero
        index="02"
        kicker="The Archive"
        title={<>Proof of<br />work.</>}
        lead="Black & grey, realism, fine line, traditional, lettering, cover ups — recent pieces from the Street Culture chairs in Kandivali West, Mumbai. Filter by style, tap to view."
      >
        <Reveal delay={0.3} className="mt-8">
          <InkButton href="/book" size="lg">Book Your Tattoo</InkButton>
        </Reveal>
      </PageHero>

      <section className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <GalleryGrid />
          <Reveal className="mt-16 border border-dashed border-bone/20 p-6 text-center md:p-10">
            <p className="font-marker text-xl text-cream/70">Most of these started as a blurry reference and a WhatsApp message.</p>
            <p className="mx-auto mt-2 max-w-lg font-body text-sm text-bone/55">
              Every piece here is custom — we don't repeat designs. Yours gets drawn from scratch, for you.
            </p>
            <div className="mt-6">
              <InkButton href="/book">Start Yours</InkButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
