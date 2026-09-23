import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { PenToolIcon, ShieldIcon, UserCheckIcon, WorkflowIcon } from "@/components/icons";
import { InkButton, PageHero, Reveal, SectionHeading } from "@/components/ui-kit";
import { breadcrumbSchema, faqSchema, pageMeta } from "@/config/seo";
import { academyFaqs, courses } from "@/data/courses";
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
        <Reveal delay={0.3} className="mt-8">
          <InkButton href="#enquire" size="lg">Enquire Now</InkButton>
        </Reveal>
      </PageHero>

      <WhySection />
      <CurriculumSection />
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
  return (
    <section className="border-t border-bone/10 py-20 md:py-28" aria-labelledby="curriculum-heading">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <SectionHeading index="03" kicker="Course Structure" title={<>Nine modules.<br />Zero shortcuts.</>} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((c, i) => (
            <motion.article
              key={c.id}
              initial={reduce ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col border border-bone/12 bg-white/[0.02] p-6 transition-colors hover:border-acid/50"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[11px] text-acid/70">{c.number}</span>
                <span className="border border-bone/15 px-2 py-0.5 text-[9px] uppercase tracking-[0.18em] text-bone/50">
                  {c.level}
                </span>
              </div>
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
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/40">{c.duration}</p>
            </motion.article>
          ))}
        </div>
        <Reveal className="mt-8">
          <p className="text-center font-body text-xs leading-relaxed text-bone/45">
            Module durations, fees and certification details are being finalised —{" "}
            <a href="#enquire" className="text-acid underline underline-offset-4">enquire for current information</a>.
          </p>
        </Reveal>
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
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [experience, setExperience] = useState("Complete beginner");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const valid = name.trim().length > 1 && (email.includes("@") || whatsapp.trim().length >= 8);

  const buildPayload = () => ({ name, email, whatsapp, experience, message });

  const onWhatsApp = () => {
    if (!valid) return setError("Add your name and an email or WhatsApp number so we can reply.");
    setError("");
    openWhatsApp(academyMessage({ name, experience, message: `${message}\nEmail: ${email}\nWhatsApp: ${whatsapp}` }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return setError("Add your name and an email or WhatsApp number so we can reply.");
    setError("");
    await submitAcademyEnquiry(buildPayload());
    setSent(true);
  };

  return (
    <section id="enquire" className="border-t border-bone/10 py-20 md:py-28" aria-labelledby="enquire-heading">
      <div className="mx-auto w-full max-w-3xl px-5 md:px-8">
        <SectionHeading index="08" kicker="Enquire Now" title={<>Claim your<br />seat.</>} align="center" />
        {sent ? (
          <Reveal>
            <div className="border border-acid/40 bg-[#131a12] p-8 text-center">
              <p className="font-display text-2xl uppercase text-bone">Application noted.</p>
              <p className="mt-3 font-body text-sm text-bone/65">
                For the fastest reply, send it on WhatsApp too — seats are limited and shortlisting happens in order.
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
                <Field label="WhatsApp">
                  <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className={inputCls} placeholder="+91 …" inputMode="tel" />
                </Field>
              </div>
              <Field label="Email">
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className={inputCls} placeholder="you@example.com" />
              </Field>
              <Field label="Experience level">
                <select value={experience} onChange={(e) => setExperience(e.target.value)} className={inputCls}>
                  <option>Complete beginner</option>
                  <option>I draw but haven't tattooed</option>
                  <option>Self-taught tattooist</option>
                  <option>Trained in another studio</option>
                </select>
              </Field>
              <Field label="Why do you want to learn?">
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className={inputCls} placeholder="Tell us a bit about you…" />
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
