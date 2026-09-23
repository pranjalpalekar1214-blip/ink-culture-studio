import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router";
import { ArrowMotif, EyeMotif, HandMotif, RoseMotif, SkullMotif, SnakeMotif, StarMotif } from "@/components/art";
import { InkButton, MaskReveal, PageHero, Reveal, SectionHeading } from "@/components/ui-kit";
import { contact } from "@/config/contact";
import { breadcrumbSchema, localBusinessSchema, organizationSchema, pageMeta } from "@/config/seo";
import { useJsonLd, useSeo } from "@/hooks/use-seo";

const values = [
  {
    title: "Custom Only",
    body: "No wall-picking, no copies of someone else's skin. Every piece is drawn from your consultation — yours exists once.",
  },
  {
    title: "Hygiene Is Sacred",
    body: "Single-use needles, cartridges and grips. Medical-grade sterilisation, disinfected surfaces between every client, no exceptions ever.",
  },
  {
    title: "Honest Guidance",
    body: "If a design won't heal well, we say so. If a placement will age badly, we redraw. Your skin outlives the trend.",
  },
  {
    title: "Culture Over Ego",
    body: "Street Culture is built on Mumbai's street energy — art for the people, respect for everyone who sits in the chair.",
  },
];

const processSteps = [
  { n: "01", t: "Idea", d: "It starts with a message — a sketch, a screenshot, a sentence. Bring anything." },
  { n: "02", t: "Consultation", d: "Free, honest and unhurried. We map the idea to your body and budget." },
  { n: "03", t: "Design", d: "Your artist draws a custom piece. Revisions until it feels inevitable." },
  { n: "04", t: "Stencil", d: "Positioned on your anatomy — checked standing, sitting, moving." },
  { n: "05", t: "Ink", d: "The session. Breaks whenever you need them, music whatever you like." },
  { n: "06", t: "Aftercare", d: "A written heal plan, follow-up check-ins and touch-up guidance." },
  { n: "07", t: "Your Story", d: "The piece becomes yours — worn for life, healed like it grew there." },
];

export default function About() {
  useSeo(pageMeta.about);
  useJsonLd([
    organizationSchema(),
    localBusinessSchema(),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ]),
  ]);

  return (
    <>
      <PageHero
        index="01"
        kicker="The Story"
        title={<>This is<br />Street Culture.</>}
        lead="A custom tattoo studio & academy in Kandivali West, Mumbai — built on street energy, editorial craft and the belief that ink is culture."
      />

      {/* ORIGIN */}
      <section className="py-20 md:py-28" aria-label="Studio story">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="font-body text-base leading-relaxed text-bone/75 md:text-lg">
                Street Culture started the way most good things in Mumbai do — with a couple of artists, a
                shared sketchbook and a refusal to do things the lazy way. We were tired of studios that
                treated tattoos like printer jobs: pick a design, pay, next.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 font-body text-base leading-relaxed text-bone/75 md:text-lg">
                So we built the opposite. A studio where every piece starts with a conversation and a blank
                sheet. Where hygiene is treated like surgery and design like art. Where the city outside —
                the trains, the streets, the noise — shows up in the work.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-6 font-body text-base leading-relaxed text-bone/75 md:text-lg">
                And where the next generation of artists gets trained properly through the{" "}
                <Link to="/academy" className="text-blood underline decoration-blood/50 underline-offset-4 hover:text-bone">
                  Street Culture Academy
                </Link>{" "}
                — because the craft deserves better shortcuts than it usually gets.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-wrap gap-3">
                <InkButton href="/artists">Meet the Artists</InkButton>
                <InkButton href="/gallery" variant="outline">See the Work</InkButton>
              </div>
            </Reveal>
          </div>

          <div className="relative">
            <MaskReveal>
              <div className="relative border border-bone/10 bg-gradient-to-br from-[#1b1b1b] to-[#0f0f0f] p-8">
                <div className="absolute inset-0 grain opacity-40" aria-hidden />
                <div className="flex items-start justify-between text-bone/30">
                  <RoseMotif className="h-20 w-20" />
                  <SkullMotif className="h-20 w-20" />
                </div>
                <div className="mt-8 flex items-start justify-between text-bone/30">
                  <SnakeMotif className="h-24 w-24" />
                  <HandMotif className="h-24 w-20" />
                </div>
                <p className="mt-8 font-marker text-xl text-cream/60">
                  flash sheet — original line art, drawn in-studio
                </p>
              </div>
            </MaskReveal>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="border-t border-bone/10 py-20 md:py-28" aria-labelledby="values-heading">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <SectionHeading index="02" kicker="What We Stand On" title={<>The ground<br />rules.</>} />
          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="group h-full border border-bone/12 bg-white/[0.02] p-7 transition-colors hover:border-blood/50">
                  <p className="font-mono text-[10px] text-blood/70">0{i + 1}</p>
                  <h3 className="mt-3 font-display text-2xl uppercase tracking-tight text-bone">{v.title}</h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-bone/65">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS TIMELINE — cinematic scroll storytelling */}
      <section className="border-t border-bone/10 py-20 md:py-32" aria-labelledby="process-heading">
        <div className="mx-auto w-full max-w-5xl px-5 md:px-8">
          <SectionHeading index="03" kicker="Idea → Icon" title={<>The journey<br />of a tattoo.</>} />
          <ol className="relative space-y-0 border-l border-bone/15 pl-8 md:pl-14">
            {processSteps.map((s, i) => (
              <ProcessStep key={s.n} step={s} last={i === processSteps.length - 1} />
            ))}
          </ol>
        </div>
      </section>

      {/* ENVIRONMENT + ACADEMY */}
      <section className="border-t border-bone/10 py-20 md:py-28">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-5 md:grid-cols-2 md:px-8">
          <Reveal>
            <div className="h-full border border-bone/12 p-8">
              <EyeMotif className="h-10 w-16 text-blood/60" />
              <h3 className="mt-5 font-display text-2xl uppercase tracking-tight text-bone">The Space</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-bone/65">
                A gallery that happens to hold tattoo machines — low light, loud art, quiet focus. Private
                session areas, hospital-grade sterilisation, and a couch that has heard a thousand first-timer
                nerves. {contact.address.locality}, {contact.address.city}.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full border border-acid/25 bg-gradient-to-br from-[#131a12] to-[#0d0d0d] p-8">
              <StarMotif className="h-8 w-8 text-acid/70" />
              <h3 className="mt-5 font-display text-2xl uppercase tracking-tight text-bone">The Academy</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-bone/65">
                Structured, practical training for future tattoo artists — drawing first, machines later,
                clients last. If you've ever thought about picking up the machine properly, start here.
              </p>
              <div className="mt-6">
                <InkButton href="/academy" variant="outline">Learn the Craft</InkButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-bone/10 py-24 md:py-32 text-center">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <Reveal>
            <h2 className="font-display text-4xl uppercase tracking-tight text-bone sm:text-6xl">
              Come see it<br /><span className="text-blood">in person.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-5 max-w-md font-body text-sm text-bone/60 md:text-base">
              Walk the space, meet the artists, talk the idea. First consultations are always free.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <InkButton href="/book" size="lg">Book Your Tattoo</InkButton>
              <InkButton href="/contact" variant="outline" size="lg">Find the Studio</InkButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ProcessStep({ step, last }: { step: { n: string; t: string; d: string }; last: boolean }) {
  const reduce = useReducedMotion();
  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative pb-12 ${last ? "pb-0" : ""}`}
    >
      <span
        aria-hidden
        className={`absolute -left-[41px] top-1 flex size-5 items-center justify-center rounded-full border-2 border-blood bg-ink md:-left-[65px]`}
      >
        <span className="size-1.5 rounded-full bg-blood" />
      </span>
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-blood/70">{step.n}</p>
      <h3 className="mt-1 font-display text-2xl uppercase tracking-tight text-bone md:text-3xl">{step.t}</h3>
      <p className="mt-2 max-w-xl font-body text-sm leading-relaxed text-bone/65">{step.d}</p>
      {!last && <ArrowMotif className="mt-4 hidden h-3 w-16 text-bone/20 md:block" />}
    </motion.li>
  );
}
