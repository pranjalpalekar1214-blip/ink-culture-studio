import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ChevronDown } from "lucide-react";
import { useRef } from "react";
import { ArtistCard } from "@/components/ArtistCard";
import { BrandLogo } from "@/components/BrandLogo";
import { ArtistPortrait, EyeMotif, FloatingMotifs, HandMotif, InkStroke, LocalTrainMotif, QuestionBlock, SnakeMotif, StarMotif, TickerStrip } from "@/components/art";
import { CursorLabel } from "@/components/CursorLabel";
import { GalleryGridMini } from "@/components/GalleryGridMini";
import { InkButton, MaskReveal, Reveal, SectionHeading } from "@/components/ui-kit";
import { contact } from "@/config/contact";
import { artists } from "@/data/artists";
import { faqs, testimonials } from "@/data/faqs";
import { useJsonLd, useSeo } from "@/hooks/use-seo";
import { breadcrumbSchema, faqSchema, localBusinessSchema, organizationSchema, pageMeta } from "@/config/seo";

export default function Home() {
  useSeo(pageMeta.home);
  useJsonLd([organizationSchema(), localBusinessSchema(), faqSchema(faqs.slice(0, 6)), breadcrumbSchema([{ name: "Home", path: "/" }])]);

  return (
    <>
      <Hero />
      <TickerStrip
        items={[
          "INK IS CULTURE",
          "CUSTOM ONLY — NO REPEATS",
          "PIERCINGS · TATTOOS · TRAINING",
          "KANDIVALI WEST, MUMBAI",
          "WALK IN LOUD, WALK OUT ICONIC",
        ]}
      />
      <Philosophy />
      <ArtistsSection />
      <GalleryStrip />
      <InkLabTeaser />
      <AcademyTeaser />
      <Testimonials />
      <ProcessTeaser />
      <FaqSection />
      <FinalCta />
    </>
  );
}

/* ------------------------------- HERO ------------------------------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  const word = (t: string, i: number) => (
    <span key={t} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
      <motion.span
        className="inline-block"
        initial={reduce ? false : { y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay: 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
      >
        {t}
      </motion.span>
    </span>
  );

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden" aria-label="Introduction">
      {/* backdrop layers */}
      <motion.div style={{ y: yBg }} className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 grain opacity-70" />
        <div className="absolute -right-24 top-1/4 h-[420px] w-[420px] rounded-full bg-blood/10 blur-[120px]" />
        <div className="absolute -left-32 bottom-0 h-[360px] w-[360px] rounded-full bg-acid/5 blur-[100px]" />
      </motion.div>

      <FloatingMotifs className="absolute inset-0 hidden lg:block" />

      <motion.div style={{ opacity }} className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pt-28 md:px-8 md:pt-32">
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.4em] text-bone/50 md:text-[11px]"
        >
          <span className="h-px w-10 bg-blood/70" aria-hidden />
          Tattoo Studio & Academy — Kandivali West, Mumbai
        </motion.p>

        <h1 className="mt-6 font-display text-[11vw] font-black uppercase leading-[0.85] tracking-[-0.02em] text-bone sm:text-[9vw] lg:text-[6.5rem]">
          <span className="block">{word("Ink", 0)}&nbsp;{word("Is", 1)}</span>
          <span className="block text-blood">{word("Culture.", 2)}</span>
        </h1>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-xl font-body text-base leading-relaxed text-bone/70 md:text-lg">
            <BrandLogo className="text-base md:text-lg" />
            <span className="mt-1.5 block">
              Custom tattoos drawn for your body, your story, your streets — in Kandivali West, Mumbai.
            </span>
          </p>
          <div className="flex flex-wrap gap-3">
            <InkButton href="/book" size="lg">Book Your Tattoo</InkButton>
            <InkButton href="/artists" variant="outline" size="lg">Explore the Artists</InkButton>
          </div>
        </motion.div>

        {/* illustrated strip */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-10 flex items-end justify-between gap-6 text-bone/25 md:mt-14"
        >
          <SnakeMotif className="h-16 w-16 md:h-24 md:w-24" />
          <LocalTrainMotif className="hidden h-16 w-24 text-bone/20 sm:block" />
          <HandMotif className="h-20 w-16 md:h-28 md:w-24" />
          <InkStroke className="hidden w-40 md:block" />
          <StarMotif className="h-7 w-7 text-blood/40" />
        </motion.div>

        {/* hit the block — quiet arcade easter egg */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto absolute right-5 top-40 z-10 md:right-8 md:top-44"
        >
          <QuestionBlock className="h-11 w-11 md:h-14 md:w-14" />
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="relative z-10 mx-auto flex w-full max-w-7xl items-center gap-3 px-5 pb-8 text-[10px] uppercase tracking-[0.35em] text-bone/45 md:px-8"
      >
        <motion.span animate={reduce ? {} : { y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown className="size-3.5 text-blood" />
        </motion.span>
        Scroll to enter Street Culture
      </motion.div>
    </section>
  );
}

/* ---------------------------- PHILOSOPHY ---------------------------- */

function Philosophy() {
  return (
    <section className="relative border-t border-bone/10 py-24 md:py-36" aria-labelledby="philosophy">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em] text-blood">
                <span className="font-mono">01</span>
                <span aria-hidden className="h-px w-8 bg-blood/60" /> The Philosophy
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="philosophy" className="mt-6 font-display text-4xl uppercase leading-[0.95] tracking-tight text-bone sm:text-6xl">
                Not just a tattoo.
                <span className="block text-bone/40">A piece of you.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-8 max-w-lg font-body text-base leading-relaxed text-bone/70 md:text-lg">
                Anyone can copy a design off a wall. We don't. Every piece at Street Culture starts with a
                conversation — who you are, what you carry, what you want to wear for the rest of your life —
                and ends with artwork drawn only for you.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mt-5 max-w-lg font-body text-base leading-relaxed text-bone/70">
                Professional tattooing, obsessive attention to detail, medical-grade hygiene and a studio that
                treats your skin like the gallery it is. That's the deal.
              </p>
            </Reveal>
            <Reveal delay={0.28}>
              <div className="mt-9">
                <InkButton href="/about" variant="outline">Our Story & Process</InkButton>
              </div>
            </Reveal>
          </div>

          <div className="relative">
            <MaskReveal>
              <div className="relative aspect-[4/5] border border-bone/10 bg-gradient-to-br from-[#1b1b1b] to-[#0f0f0f]">
                <div className="absolute inset-0 grain opacity-50" aria-hidden />
                <ArtistPortrait who="karan" className="absolute inset-0 m-auto h-3/4 text-bone/20" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <p className="font-marker text-2xl text-cream/80">every line means something</p>
                  <EyeMotif className="h-10 w-16 text-blood/50" />
                </div>
              </div>
            </MaskReveal>
            <Reveal delay={0.3} className="absolute -bottom-8 -left-4 hidden rotate-[-4deg] border border-bone/15 bg-ink p-4 shadow-xl md:block">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-blood">Est. Kandivali</p>
              <p className="mt-1 font-display text-xl uppercase text-bone">West, Mumbai</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- ARTISTS ------------------------------ */

function ArtistsSection() {
  return (
    <section className="relative border-t border-bone/10 py-24 md:py-36" aria-labelledby="artists-heading">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <SectionHeading index="02" kicker="The Roster" title={<>Meet the<br />artists.</>} />
        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          {artists.map((a, i) => (
            <ArtistCard key={a.id} artist={a} index={i} />
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <p className="font-marker text-xl text-bone/50">collect the full set — book your session</p>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------- GALLERY STRIP -------------------------- */

function GalleryStrip() {
  return (
    <section className="border-t border-bone/10 py-24 md:py-36" aria-labelledby="gallery-heading">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading index="03" kicker="Fresh From The Machine" title={<>The work<br />speaks first.</>} className="mb-0" />
          <Reveal>
            <InkButton href="/gallery" variant="outline">Full Gallery</InkButton>
          </Reveal>
        </div>
        <div className="mt-12">
          <GalleryGridMini />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- INK LAB TEASER ------------------------- */

function InkLabTeaser() {
  return (
    <section className="relative overflow-hidden border-t-2 border-bone/10 py-20 md:py-28" aria-labelledby="inklab-heading">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="relative border-2 border-bone/15 bg-gradient-to-br from-[#1a160a] to-[#0d0d0d] p-8 shadow-[10px_10px_0_0_rgba(245,197,24,0.15)] md:p-12">
          <div className="pointer-events-none absolute inset-0 grain opacity-40" aria-hidden />
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <Reveal>
                <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em] text-blood">
                  <span className="font-mono">NEW</span>
                  <span aria-hidden className="h-px w-8 bg-blood/60" /> AI Concept Lab
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 id="inklab-heading" className="mt-6 font-display text-4xl uppercase leading-[0.95] tracking-tight text-bone sm:text-5xl">
                  Can't explain it?<br />
                  <span className="text-blood">Let the machine try.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-5 max-w-md font-body text-base leading-relaxed text-bone/70">
                  Drop a reference image, mumble your idea, and get a full concept brief back — concept name,
                  style notes, placement, and which artist should hold the machine.
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <InkButton href="/concept" variant="sticker">Try the Ink Lab — Free</InkButton>
                  <InkButton href="/book" variant="ghost">or just book a chair →</InkButton>
                </div>
              </Reveal>
            </div>
            <div className="relative hidden lg:block">
              <Reveal delay={0.2}>
                <div className="rotate-2 border-2 border-ink bg-[#151310] p-6 shadow-[8px_8px_0_0_var(--blood)]">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-blood">Concept Brief · Draft 01</p>
                  <p className="mt-3 font-display text-2xl uppercase text-bone">“Monsoon Moth”</p>
                  <div className="mt-4 space-y-2 font-body text-sm text-bone/70">
                    <p><span className="text-blood">THE IDEA —</span> A black & grey moth cradling a tiny umbrella, riding a downpour of fine-line rain…</p>
                    <p><span className="text-blood">PLACEMENT —</span> Wraps the forearm; wings open with the muscle.</p>
                    <p><span className="text-blood">ARTIST MATCH —</span> Karan. Whip-shaded gradients, single-needle rain.</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- ACADEMY TEASER -------------------------- */

function AcademyTeaser() {
  return (
    <section className="relative overflow-hidden border-t border-bone/10 py-24 md:py-36" aria-labelledby="academy-heading">
      <div className="pointer-events-none absolute inset-0 grain opacity-40" aria-hidden />
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em] text-acid">
                <span className="font-mono">04</span>
                <span aria-hidden className="h-px w-8 bg-acid/60" /> The Academy
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="academy-heading" className="mt-6 font-display text-4xl uppercase leading-[0.95] tracking-tight text-bone sm:text-6xl">
                Learn the<br />craft.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-md font-body text-base leading-relaxed text-bone/70">
                Structured, practical tattoo education inside a working studio — drawing first, machines later,
                clients last. Taught by artists who do this every day.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-8">
                <InkButton href="/academy" variant="outline">Explore the Academy</InkButton>
              </div>
            </Reveal>
          </div>
          <div className="relative">
            <MaskReveal from="bottom">
              <div className="border border-acid/25 bg-gradient-to-br from-[#131a12] to-[#0d0d0d] p-8 md:p-12">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-acid/70">Curriculum · 09 Modules</p>
                <ul className="mt-6 space-y-3">
                  {["Beginner Tattoo Fundamentals", "Machine & Needle Fundamentals", "Linework", "Shading", "Hygiene & Studio Practice", "Portfolio Building"].map((m, i) => (
                    <li key={m} className="flex items-baseline gap-3 border-b border-bone/10 pb-3 font-display text-lg uppercase tracking-tight text-bone/85 md:text-xl">
                      <span className="font-mono text-[10px] text-acid/60">0{i + 1}</span> {m}
                    </li>
                  ))}
                </ul>
              </div>
            </MaskReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- TESTIMONIALS --------------------------- */

function Testimonials() {
  return (
    <section className="border-t border-bone/10 py-24 md:py-32" aria-labelledby="testimonials-heading">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <SectionHeading index="05" kicker="Word On The Street" title={<>Carried with pride.</>} />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure className="flex h-full flex-col border border-bone/12 bg-white/[0.02] p-6 md:p-7">
                <div className="flex gap-1 text-blood" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <StarMotif key={s} className="h-3.5 w-3.5" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 font-body text-sm leading-relaxed text-bone/75">“{t.quote}”</blockquote>
                <figcaption className="mt-5 border-t border-bone/10 pt-4">
                  <p className="font-display text-sm uppercase tracking-[0.14em] text-bone">{t.name}</p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-bone/45">{t.piece}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- PROCESS TEASER -------------------------- */

const steps = ["Idea", "Consultation", "Design", "Stencil", "Ink", "Aftercare", "Your Story"];

function ProcessTeaser() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden border-t border-bone/10 py-24 md:py-32" aria-labelledby="process-heading">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <SectionHeading index="06" kicker="The Process" title={<>From idea<br />to icon.</>} />
        <div className="relative">
          <motion.ol
            className="flex flex-wrap items-center gap-x-6 gap-y-4 md:gap-x-10"
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true }}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          >
            {steps.map((s, i) => (
              <motion.li
                key={s}
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                className="flex items-center gap-6 md:gap-10"
              >
                <span className="font-display text-2xl uppercase tracking-tight text-bone/80 md:text-3xl">
                  <span className="mr-2 font-mono text-[10px] text-blood/70">0{i + 1}</span>
                  {s}
                </span>
                {i < steps.length - 1 && <ChevronDown className="size-4 rotate-[-90deg] text-blood/60" aria-hidden />}
              </motion.li>
            ))}
          </motion.ol>
          <Reveal className="mt-10">
            <InkButton href="/book" size="lg">Start Your Idea</InkButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- FAQ -------------------------------- */

function FaqSection() {
  return (
    <section className="border-t border-bone/10 py-24 md:py-32" aria-labelledby="faq-heading">
      <div className="mx-auto w-full max-w-4xl px-5 md:px-8">
        <SectionHeading index="07" kicker="Questions" title={<>Before you ask.</>} align="center" />
        <div className="divide-y divide-bone/10 border-y border-bone/10">
          {faqs.slice(0, 6).map((f, i) => (
            <details key={f.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-body text-sm font-semibold text-bone/85 transition-colors hover:text-bone md:text-base">
                {f.question}
                <span className="font-mono text-blood transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-bone/60">{f.answer}</p>
              <span className="sr-only">{i}</span>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- FINAL CTA ----------------------------- */

function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-bone/10 py-28 md:py-40" aria-labelledby="cta-heading">
      <div className="pointer-events-none absolute inset-0 grain opacity-60" aria-hidden />
      <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blood/10 blur-[130px]" aria-hidden />
      <div className="relative mx-auto w-full max-w-5xl px-5 text-center md:px-8">
        <CursorLabel label="BOOK">
          <Reveal>
            <h2 id="cta-heading" className="font-display text-[13vw] uppercase leading-[0.9] tracking-tight text-bone sm:text-7xl md:text-8xl">
              Make it<br /><span className="text-blood">permanent.</span>
            </h2>
          </Reveal>
        </CursorLabel>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-md font-body text-base text-bone/65">
            Consultations are free. Bring an idea — leave with a plan.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <InkButton href="/book" size="lg">Book Your Tattoo</InkButton>
            <InkButton href={`https://wa.me/${contact.whatsappNumber}`} external variant="outline" size="lg">
              WhatsApp Us
            </InkButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
