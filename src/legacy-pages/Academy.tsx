import { motion, useReducedMotion } from "framer-motion";
import { Fragment, useState } from "react";
import { PenToolIcon, ShieldIcon, UserCheckIcon, WorkflowIcon } from "@/components/icons";
import { InkButton, PageHero, Reveal, SectionHeading } from "@/components/ui-kit";
import { breadcrumbSchema, faqSchema, pageMeta } from "@/config/seo";
import { academyCourses, academyFaqs, academyWorkshopImages } from "@/data/courses";
import { useJsonLd, useSeo } from "@/hooks/use-seo";
import { submitAcademyEnquiry } from "@/lib/forms";
import { academyMessage, openWhatsApp } from "@/lib/whatsapp";

const why = [
  { icon: WorkflowIcon, title: "Learn Inside a Working Studio", body: "You train where tattoos actually happen — real consultations, real hygiene routines, real clients (once you've earned it)." },
  { icon: UserCheckIcon, title: "Taught by Working Artists", body: "Your instructors spend their days tattooing, not just teaching. The curriculum is what the job actually demands." },
  { icon: PenToolIcon, title: "Drawing Before Machines", body: "The craft starts on paper. You'll earn the machine through fundamentals — no shortcuts, no bad habits." },
  { icon: ShieldIcon, title: "Hygiene From Day One", body: "Sterile discipline is a module, not a footnote. It's the difference between a tattooist and a liability." },
];

const audiences = [
  "Complete beginners who want the craft done properly",
  "Artists from other mediums moving into tattoo",
  "Self-taught tattooists fixing bad fundamentals",
  "Anyone obsessed enough to practise on paper for weeks",
];

export default function Academy() {
  useSeo(pageMeta.academy);
  useJsonLd([
    faqSchema(academyFaqs),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Academy", path: "/academy" },
    ]),
  ]);

  return (
    <>
      <PageHero
        index="01"
        kicker="Street Culture Academy"
        title={<>Learn the<br />craft.</>}
        lead="Structured, practical tattoo education inside a working Mumbai studio — drawing first, machines later, clients last. No shortcuts, no fake certificates."
      >
        <Reveal delay={0.3} className="mt-8 flex flex-wrap items-center gap-6">
          <InkButton href="#enquire" size="lg">Enquire Now</InkButton>
          <div className="hidden items-center gap-3 border-l border-acid/40 pl-5 sm:flex" aria-label="Academy learning path graphic">
            <span className="size-3 rounded-full bg-acid" />
            <span className="h-px w-12 bg-acid/60" />
            <span className="size-2 rounded-full border border-acid" />
            <span className="h-px w-8 bg-acid/60" />
            <span className="size-3 rotate-45 border border-acid" />
          </div>
        </Reveal>
      </PageHero>

      <WhySection />
      <CurriculumSection />
      <WorkshopSection />
      <WhoSection />
      <ToolsSection />
      <FaqSection />
      <EnquireSection />
    </>
  );
}

function WhySection() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="why-heading">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <SectionHeading index="02" kicker="Why Street Culture" title={<>Built different,<br />on purpose.</>} />
        <div className="grid gap-6 sm:grid-cols-2">
          {why.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.08}>
              <div className="h-full border border-bone/12 bg-white/[0.02] p-7">
                <w.icon className="size-7 text-acid/80" />
                <h3 className="mt-4 font-display text-xl uppercase tracking-tight text-bone">{w.title}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-bone/65">{w.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CurriculumSection() {
  const reduce = useReducedMotion();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  return (
    <section className="border-t border-bone/10 py-20 md:py-28" aria-labelledby="curriculum-heading">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <SectionHeading index="03" kicker="Course Structure" title={<>Four ways in.<br />Choose your path.</>} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {academyCourses.map((c, i) => (
            <Fragment key={`${c.id}-group`}>
            <motion.article
              key={c.id}
              initial={reduce ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              animate={reduce ? undefined : { y: [0, -5, 0], rotate: [0, i % 2 ? 0.3 : -0.3, 0] }}
              whileHover={reduce ? undefined : { scale: 1.015, rotate: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 4.8, repeat: Infinity, delay: (i % 3) * 0.25, ease: "easeInOut" }}
              className={`group relative flex cursor-pointer flex-col border border-bone/12 bg-white/[0.02] p-6 transition-colors hover:-translate-y-2 hover:border-acid/60 hover:bg-white/[0.04] hover:shadow-[0_18px_0_rgba(239,190,58,0.12)] ${selectedCourse === c.id ? "border-acid/70 bg-white/[0.05] shadow-[0_12px_0_rgba(239,190,58,0.18)]" : ""}`}
              onClick={() => setSelectedCourse(selectedCourse === c.id ? null : c.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelectedCourse(selectedCourse === c.id ? null : c.id);
                }
              }}
              role="button"
              tabIndex={0}
              aria-expanded={selectedCourse === c.id}
            >
              <div className="pointer-events-none absolute right-5 top-5 opacity-60 transition duration-500 group-hover:rotate-12 group-hover:scale-110" aria-hidden>
                <span className="block size-9 rounded-full border border-acid/50" />
                <span className="absolute left-1/2 top-[-6px] h-12 w-px -translate-x-1/2 rotate-45 bg-acid/50" />
                <span className="absolute left-1/2 top-1/2 h-px w-12 -translate-x-1/2 bg-acid/50" />
              </div>
              <div className="flex items-baseline justify-between pr-14">
                <span className="font-mono text-[11px] text-acid/70">{c.number}</span>
                <span className="border border-bone/15 px-2 py-0.5 text-[9px] uppercase tracking-[0.18em] text-bone/50">
                  {c.level}
                </span>
              </div>
              {c.images?.length ? (
                <div className="mt-4 grid grid-cols-5 gap-1" aria-label={`${c.title} curriculum visuals`}>
                  {c.images.map((image, imageIndex) => (
                    <img key={image} src={image} alt={`${c.title} module ${imageIndex + 1}`} className="aspect-[4/5] w-full object-cover" loading="lazy" />
                  ))}
                </div>
              ) : null}
              <h3 className="mt-4 font-display text-xl uppercase leading-tight tracking-tight text-bone">{c.title}</h3>
              <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-bone/60">{c.summary}</p>
              <ul className="mt-4 space-y-1.5 border-t border-bone/10 pt-4">
                {c.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2 text-[12px] leading-snug text-bone/70">
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-acid/70" aria-hidden />
                    {o}
                  </li>
                ))}
              </ul>
              {c.instructor ? <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-acid/80">{c.instructor}</p> : null}
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/40">{c.duration}</p>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  openWhatsApp(`Hello Street Culture Academy! I would like to enquire about the ${c.title} (${c.duration}) and request the current price. Please share the details.`);
                }}
                className="group/mario relative mt-5 overflow-hidden border border-acid/70 px-4 py-3 text-left font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-acid transition-colors hover:bg-acid hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acid"
              >
                <span className="inline-flex items-center gap-2 transition-transform duration-300 group-hover/mario:-translate-y-1 group-hover/mario:translate-x-1">Enquire for price <span aria-hidden>↗</span></span>
              </button>
            </motion.article>
            {selectedCourse === c.id ? (
              <motion.div
                layout
                initial={{ opacity: 0, height: 0, y: -12 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -12 }}
                className="-mt-5 border-x border-b border-acid/40 bg-ink/80 p-6 md:col-span-2 lg:col-span-3"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-acid">Course breakdown</p>
                    <h4 className="mt-2 font-display text-3xl uppercase tracking-tight text-bone">{c.title}</h4>
                    <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-bone/70">{c.summary}</p>
                  </div>
                  <span className="shrink-0 border border-acid/50 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-acid">{c.duration}</span>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {c.outcomes.map((outcome) => (
                    <div key={outcome} className="border border-bone/12 p-4 font-body text-sm text-bone/75">{outcome}</div>
                  ))}
                </div>
              </motion.div>
            ) : null}
            </Fragment>
          ))}
        </div>
        <Reveal className="mt-8">
          <p className="text-center font-body text-xs leading-relaxed text-bone/45">
            Course fees and enrolment details are shared during the application —{" "}
            <a href="#enquire" className="text-acid underline underline-offset-4">enquire for current information</a>.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function WorkshopSection() {
  return (
    <section className="border-t border-bone/10 py-20 md:py-28" aria-labelledby="workshop-heading">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading index="04" kicker="Studio Field Notes" title={<>Learn it.<br />Live it.</>} />
          <p className="max-w-sm font-body text-sm leading-relaxed text-bone/60">A master course is more than modules on a page. It is shared studio time, live demonstrations, practice, critique and the people you meet while learning.</p>
        </div>
        <div className="mt-10 grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4">
          {academyWorkshopImages.map((image, index) => (
            <motion.figure
              key={image.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className={`group relative overflow-hidden border border-bone/15 bg-charcoal ${index === 0 || index === 4 ? "row-span-2" : ""} ${index === 4 ? "col-span-2 md:col-span-1" : ""}`}
            >
              <img src={image.src} alt={image.alt} className="size-full object-cover transition duration-700 group-hover:scale-105 group-hover:saturate-150" loading="lazy" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent px-4 pb-4 pt-10 font-mono text-[10px] uppercase tracking-[0.16em] text-bone/85">{image.label}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhoSection() {
  return (
    <section className="border-t border-bone/10 py-20 md:py-28" aria-labelledby="who-heading">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-2">
        <div>
          <SectionHeading index="04" kicker="Who It's For" title={<>Is this<br />you?</>} />
          <Reveal delay={0.1}>
            <ul className="space-y-4">
              {audiences.map((a) => (
                <li key={a} className="flex items-start gap-3 border border-bone/12 p-4 font-body text-sm text-bone/75">
                  <PenToolIcon className="mt-0.5 size-4 shrink-0 text-acid/80" />
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div>
          <SectionHeading index="05" kicker="Practical Training" title={<>How you'll<br />actually learn.</>} />
          <Reveal delay={0.1}>
            <div className="space-y-4 font-body text-sm leading-relaxed text-bone/70">
              <p>
                Paper practice with weekly reviews. Synthetic skin before anything else. Studio observation
                hours — you watch real consultations and setups before you touch a needle cartridge.
              </p>
              <p>
                Checkpoints, not calendars: you advance when your work proves you're ready. Everything happens
                under supervision, inside our hygiene protocols, in the Kandivali West studio.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ToolsSection() {
  return (
    <section className="border-t border-bone/10 py-20 md:py-28" aria-labelledby="tools-heading">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <SectionHeading index="06" kicker="Tools & Equipment" title={<>Professional kit,<br />professional habits.</>} />
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Coil & rotary machines",
              "Cartridge needle systems",
              "Medical-grade sterilisation",
              "Practice skin & paper media",
              "Professional pigment sets",
              "Studio-grade workstations",
              "Stencil & transfer setup",
              "Portfolio photography kit",
            ].map((t) => (
              <div key={t} className="border border-bone/12 p-5 text-[12px] font-medium uppercase tracking-[0.14em] text-bone/70">
                {t}
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 font-body text-xs text-bone/45">
            Students train on studio equipment under supervision. Personal kit recommendations are provided at enrolment — [details TBC].
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="border-t border-bone/10 py-20 md:py-28" aria-labelledby="faq-heading">
      <div className="mx-auto w-full max-w-4xl px-5 md:px-8">
        <SectionHeading index="07" kicker="Questions" title={<>Before you<br />enquire.</>} align="center" />
        <div className="divide-y divide-bone/10 border-y border-bone/10">
          {academyFaqs.map((f) => (
            <details key={f.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-body text-sm font-semibold text-bone/85 md:text-base">
                {f.question}
                <span className="font-mono text-acid transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 font-body text-sm leading-relaxed text-bone/60">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function EnquireSection() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [location, setLocation] = useState("");
  const [applicantType, setApplicantType] = useState("Fresher");
  const [experience, setExperience] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const valid = name.trim().length > 1 && age.trim().length > 0 && (email.includes("@") || whatsapp.trim().length >= 8);

  const buildPayload = () => ({ name, age, email, whatsapp, location, applicantType, experience, message });

  const onWhatsApp = () => {
    if (!valid) return setError("Add your name, age, and an email or WhatsApp number so we can reply.");
    setError("");
    openWhatsApp(academyMessage({ name, age, location, email, whatsapp, applicantType, experience, message }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return setError("Add your name, age, and an email or WhatsApp number so we can reply.");
    setError("");
    const result = await submitAcademyEnquiry(buildPayload());
    // No Google Form endpoint configured yet — don't claim the enquiry was
    // received. The confirmation screen hands the user one explicit WhatsApp
    // button so they choose when to send it.
    if (!result.configured) {
      setSent(true);
      return;
    }
    if (!result.ok) {
      return setError(
        result.error ?? "We couldn't send that just now. Please try WhatsApp instead.",
      );
    }
    setSent(true);
  };

  return (
    <section id="enquire" className="border-t border-bone/10 py-20 md:py-28" aria-labelledby="enquire-heading">
      <div className="mx-auto w-full max-w-3xl px-5 md:px-8">
        <SectionHeading index="08" kicker="Enquire Now" title={<>Claim your<br />seat.</>} align="center" />
        {sent ? (
          <Reveal>
            <div className="border border-acid/40 bg-[#131a12] p-8 text-center">
              <p className="font-display text-2xl uppercase text-bone">Enquiry ready to send.</p>
              <p className="mt-3 font-body text-sm text-bone/65">
                Tap the button below to send your enquiry on WhatsApp. Seats are limited
                and shortlisting happens in order.
              </p>
              <div className="mt-6">
                <InkButton onClick={onWhatsApp}>Send on WhatsApp</InkButton>
              </div>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} className="space-y-5 border border-bone/12 bg-white/[0.02] p-6 md:p-8" noValidate={false}>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name *">
                  <input value={name} onChange={(e) => setName(e.target.value)} required className={inputCls} placeholder="Your name" />
                </Field>
                <Field label="Age *">
                  <input value={age} onChange={(e) => setAge(e.target.value)} required type="number" min="16" max="80" className={inputCls} placeholder="Your age" />
                </Field>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="WhatsApp">

                  <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className={inputCls} placeholder="+91 …" inputMode="tel" />
                </Field>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Email">
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className={inputCls} placeholder="you@example.com" />
                </Field>
                <Field label="Location">
                  <input value={location} onChange={(e) => setLocation(e.target.value)} className={inputCls} placeholder="City / area" />
                </Field>
              </div>
              <Field label="I am a…">
                <select value={applicantType} onChange={(e) => { setApplicantType(e.target.value); setExperience(""); }} className={inputCls}>
                  <option>Fresher</option>
                  <option>Artist</option>
                </select>
              </Field>
              {applicantType === "Artist" && (
                <Field label="Artist experience">
                  <input value={experience} onChange={(e) => setExperience(e.target.value)} className={inputCls} placeholder="How long have you been tattooing?" />
                </Field>
              )}
              <Field label="Anything else we should know?">
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} className={inputCls} placeholder="Your goals or questions…" />
              </Field>
              {error && <p role="alert" className="text-xs text-blood">{error}</p>}
              <div className="flex flex-wrap gap-3">
                <InkButton type="submit">Submit Enquiry</InkButton>
                <InkButton variant="outline" onClick={onWhatsApp}>Ask on WhatsApp</InkButton>
              </div>
              <p className="text-[11px] leading-relaxed text-bone/40">
                Submitting sends your enquiry to the studio's intake form; WhatsApp opens with the details pre-filled.
              </p>
            </form>
          </Reveal>
        )}
      </div>
    </section>
  );
}

const inputCls =
  "w-full border border-bone/20 bg-ink px-3.5 py-3 font-body text-sm text-bone placeholder:text-bone/30 focus:border-acid/60 focus:outline-none";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-bone/50">{label}</span>
      {children}
    </label>
  );
}
