import { ArtistCard } from "@/components/ArtistCard";
import { InkButton, PageHero, Reveal } from "@/components/ui-kit";
import { artists } from "@/data/artists";
import { useJsonLd, useSeo } from "@/hooks/use-seo";
import { breadcrumbSchema, pageMeta, personSchema } from "@/config/seo";

export default function Artists() {
  useSeo(pageMeta.artists);
  useJsonLd([
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Artists", path: "/artists" },
    ]),
    ...artists.map((a) =>
      personSchema({ name: a.name, role: a.role, bio: a.bio, slug: a.id, image: a.image }),
    ),
  ]);

  return (
    <>
      <PageHero
        index="01"
        kicker="The Roster"
        title={<>Meet the<br />artists.</>}
        lead="Two resident artists, one standard: custom work only, drawn for your body and your story. Every booking starts with a free consultation."
      >
        <Reveal delay={0.3} className="mt-8">
          <InkButton href="/book" size="lg">Book Your Tattoo</InkButton>
        </Reveal>
      </PageHero>

      <section className="py-20 md:py-28" aria-label="Artist cards">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <div className="grid gap-8 md:grid-cols-2 md:gap-10">
            {artists.map((a, i) => (
              <ArtistCard key={a.id} artist={a} index={i} />
            ))}
          </div>
          <Reveal className="mt-14">
            <div className="border border-dashed border-bone/20 p-8 text-center md:p-12">
              <p className="font-marker text-2xl text-cream/70">Want to be card 03?</p>
              <p className="mx-auto mt-3 max-w-md font-body text-sm text-bone/60">
                We occasionally open resident and guest spots — and the Academy trains future ones.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <InkButton href="/careers" variant="outline">Join the Studio</InkButton>
                <InkButton href="/academy" variant="ghost">See the Academy</InkButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
