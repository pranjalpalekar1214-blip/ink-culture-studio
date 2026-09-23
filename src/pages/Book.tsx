import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, MessageCircle, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { InkButton, PageHero, Reveal } from "@/components/ui-kit";
import { breadcrumbSchema, pageMeta } from "@/config/seo";
import { useJsonLd, useSeo } from "@/hooks/use-seo";
import { submitBooking } from "@/lib/forms";
import { bookingMessage, openWhatsApp } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const steps = ["Service", "Artist", "Details", "Contact", "Confirm"] as const;

const services = ["New Tattoo", "Cover Up", "Custom Design", "Consultation", "Other"];
const artistOptions = ["Karan", "Lucky", "No Preference"];
const styleOptions = [
  "Black & Grey",
  "Realism",
  "Fine Line",
  "Traditional",
  "Neo Traditional",
  "Lettering",
  "Geometric",
  "Other / Not Sure",
];
const sizeOptions = ["Small (≤ 5 cm)", "Medium (5–15 cm)", "Large (15–30 cm)", "XL (30 cm+ / sleeve)"];
const budgetOptions = ["Under ₹5,000", "₹5,000 – ₹15,000", "₹15,000 – ₹30,000", "₹30,000+", "Let's discuss"];
const timeOptions = ["Morning", "Afternoon", "Evening", "Flexible"];
const contactPrefs = ["WhatsApp", "Email", "Phone"];

type FormState = {
  service: string;
  artist: string;
  name: string;
  whatsapp: string;
  email: string;
  idea: string;
  placement: string;
  size: string;
  style: string;
  budget: string;
  date: string;
  time: string;
  contactPreference: string;
  referenceName: string;
};

const initial: FormState = {
  service: "",
  artist: "",
  name: "",
  whatsapp: "",
  email: "",
  idea: "",
  placement: "",
  size: "",
  style: "",
  budget: "",
  date: "",
  time: "",
  contactPreference: "WhatsApp",
  referenceName: "",
};

export default function Book() {
  useSeo(pageMeta.book);
  useJsonLd(
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Book", path: "/book" },
    ]),
  );

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initial);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [receipt, setReceipt] = useState<{ waConfigured: boolean; formOk: boolean }>({ waConfigured: true, formOk: false });
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof FormState, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const validate = (s: number): string => {
    if (s === 0 && !form.service) return "Pick what you're looking for.";
    if (s === 1 && !form.artist) return "Choose an artist (or no preference).";
    if (s === 2) {
      if (form.name.trim().length < 2) return "Tell us your name.";
      if (!/^[\d+\-\s()]{8,16}$/.test(form.whatsapp.trim())) return "Add a valid WhatsApp number.";
      if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) return "That email doesn't look right.";
      if (form.idea.trim().length < 10) return "Give us at least a sentence about the idea.";
    }
    return "";
  };

  const next = () => {
    const err = validate(step);
    if (err) return setError(err);
    setError("");
    setStep((s) => Math.min(s + 1, 4));
  };
  const back = () => {
    setError("");
    setStep((s) => Math.max(s - 1, 0));
  };

  const waMessage = () =>
    bookingMessage({
      name: form.name,
      service: form.service,
      artist: form.artist,
      idea: form.idea,
      placement: form.placement,
      size: form.size,
      style: form.style,
      date: form.date,
      time: form.time,
      budget: form.budget,
      contact: `${form.contactPreference} · ${form.whatsapp}${form.email ? " · " + form.email : ""}`,
      referenceNote: form.referenceName ? `${form.referenceName} (attached via WhatsApp)` : "—",
    });

  const onWhatsApp = () => {
    if (validate(2)) {
      setStep(2);
      return setError(validate(2));
    }
    openWhatsApp(waMessage());
  };

  const onSubmit = async () => {
    const err = validate(2);
    if (err) {
      setStep(2);
      return setError(err);
    }
    setSubmitting(true);
    const result = await submitBooking({
      name: form.name,
      whatsapp: form.whatsapp,
      email: form.email,
      service: form.service,
      artist: form.artist,
      idea: form.idea,
      placement: form.placement,
      size: form.size,
      style: form.style,
      budget: form.budget,
      date: form.date,
      time: form.time,
      contactPreference: form.contactPreference,
      notes: form.referenceName,
    });
    setSubmitting(false);
    setReceipt({ waConfigured: true, formOk: result.ok });
    setDone(true);
    setStep(4);
  };

  /* ------------------------------ CONFIRMED ------------------------------ */
  if (done) {
    return (
      <main className="flex min-h-[100svh] items-center justify-center px-5 py-32">
        <Reveal>
          <div className="mx-auto max-w-xl border border-bone/15 bg-white/[0.02] p-8 text-center md:p-12">
            <span className="mx-auto flex size-14 items-center justify-center rounded-full border border-acid/60 text-acid">
              <Check className="size-6" />
            </span>
            <h1 className="mt-6 font-display text-3xl uppercase tracking-tight text-bone md:text-4xl">
              Your idea has entered the studio.
            </h1>
            <p className="mt-4 font-body text-sm leading-relaxed text-bone/60">
              We've got your request{receipt.formOk ? " in our intake" : ""} — we usually reply within a day.
              Want it answered fastest? Send the same details straight to our WhatsApp.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <InkButton
                onClick={() => openWhatsApp(waMessage())}
                ariaLabel="Send booking details on WhatsApp"
              >
                <MessageCircle className="size-4" /> Send Details on WhatsApp
              </InkButton>
              <InkButton href="/" variant="outline">Back Home</InkButton>
            </div>
          </div>
        </Reveal>
      </main>
    );
  }

  /* ------------------------------- FORM UI ------------------------------- */
  return (
    <>
      <PageHero
        index="04"
        kicker="Booking"
        title={<>Let's make it<br />permanent.</>}
        lead="Five quick steps. No payment, no pressure — just the idea, the artist and a plan. Prefer talking? Every step has a WhatsApp escape hatch."
      >
      </PageHero>

      <section className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-3xl px-5 md:px-8">
          {/* stepper */}
          <ol className="mb-10 flex items-center justify-between" aria-label="Booking progress">
            {steps.map((s, i) => (
              <li key={s} className="flex flex-1 items-center last:flex-none">
                <button
                  onClick={() => i < step && setStep(i)}
                  disabled={i > step}
                  aria-current={i === step ? "step" : undefined}
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-full border font-mono text-[11px] transition-colors",
                    i < step && "border-blood bg-blood text-ink",
                    i === step && "border-bone bg-bone/10 text-bone",
                    i > step && "border-bone/20 text-bone/35",
                  )}
                >
                  {i < step ? <Check className="size-4" /> : `0${i + 1}`}
                </button>
                <span className={cn("ml-2 hidden text-[10px] uppercase tracking-[0.2em] sm:block", i === step ? "text-bone" : "text-bone/35")}>
                  {s}
                </span>
                {i < steps.length - 1 && <span aria-hidden className={cn("mx-2 h-px flex-1", i < step ? "bg-blood/60" : "bg-bone/15")} />}
              </li>
            ))}
          </ol>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (step < 4) next();
              else onSubmit();
            }}
            className="border border-bone/15 bg-white/[0.02] p-6 md:p-10"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {step === 0 && (
                  <StepShell title="What are you looking for?" hint="Pick the closest — we'll sort the details together.">
                    <div className="grid gap-3 sm:grid-cols-2">
                      {services.map((s) => (
                        <Choice key={s} label={s} active={form.service === s} onClick={() => set("service", s)} />
                      ))}
                    </div>
                  </StepShell>
                )}

                {step === 1 && (
                  <StepShell title="Choose your artist" hint="Both draw custom — pick a style direction or roll with whoever's free.">
                    <div className="grid gap-3 sm:grid-cols-3">
                      {artistOptions.map((a) => (
                        <Choice key={a} label={a} active={form.artist === a} onClick={() => set("artist", a)} />
                      ))}
                    </div>
                  </StepShell>
                )}

                {step === 2 && (
                  <StepShell title="Tattoo details" hint="The more honest the brief, the better the quote.">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Name *">
                        <input className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name" required />
                      </Field>
                      <Field label="WhatsApp number *">
                        <input className={inputCls} value={form.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} placeholder="+91 …" inputMode="tel" required />
                      </Field>
                      <Field label="Email">
                        <input className={inputCls} value={form.email} onChange={(e) => set("email", e.target.value)} type="email" placeholder="you@example.com" />
                      </Field>
                      <Field label="Tattoo placement">
                        <input className={inputCls} value={form.placement} onChange={(e) => set("placement", e.target.value)} placeholder="Forearm, ribs, shoulder…" />
                      </Field>
                      <Field label="Approximate size" >
                        <select className={inputCls} value={form.size} onChange={(e) => set("size", e.target.value)}>
                          <option value="">Select…</option>
                          {sizeOptions.map((s) => <option key={s}>{s}</option>)}
                        </select>
                      </Field>
                      <Field label="Style">
                        <select className={inputCls} value={form.style} onChange={(e) => set("style", e.target.value)}>
                          <option value="">Select…</option>
                          {styleOptions.map((s) => <option key={s}>{s}</option>)}
                        </select>
                      </Field>
                      <Field label="Budget range">
                        <select className={inputCls} value={form.budget} onChange={(e) => set("budget", e.target.value)}>
                          <option value="">Select…</option>
                          {budgetOptions.map((b) => <option key={b}>{b}</option>)}
                        </select>
                      </Field>
                      <Field label="Preferred date">
                        <input className={inputCls} value={form.date} onChange={(e) => set("date", e.target.value)} type="date" />
                      </Field>
                      <Field label="Preferred time">
                        <select className={inputCls} value={form.time} onChange={(e) => set("time", e.target.value)}>
                          <option value="">Select…</option>
                          {timeOptions.map((t) => <option key={t}>{t}</option>)}
                        </select>
                      </Field>
                      <div className="sm:col-span-2">
                        <Field label="Tattoo idea *">
                          <textarea className={inputCls} value={form.idea} onChange={(e) => set("idea", e.target.value)} rows={4} placeholder="Describe the idea — subject, meaning, references, anything." required />
                        </Field>
                      </div>
                      <div className="sm:col-span-2">
                        <Field label="Reference image (optional)">
                          <label className="flex cursor-pointer items-center gap-3 border border-dashed border-bone/25 px-4 py-4 text-sm text-bone/60 transition-colors hover:border-bone/50">
                            <Upload className="size-4" />
                            {form.referenceName || "Attach a reference — or send it on WhatsApp after submitting"}
                            <input
                              ref={fileRef}
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={(e) => set("referenceName", e.target.files?.[0]?.name ?? "")}
                            />
                          </label>
                        </Field>
                      </div>
                    </div>
                  </StepShell>
                )}

                {step === 3 && (
                  <StepShell title="How should we reach you?" hint="We'll use this for your consultation and quote.">
                    <div className="grid gap-3 sm:grid-cols-3">
                      {contactPrefs.map((c) => (
                        <Choice key={c} label={c} active={form.contactPreference === c} onClick={() => set("contactPreference", c)} />
                      ))}
                    </div>
                  </StepShell>
                )}

                {step === 4 && (
                  <StepShell title="Confirm your request" hint="One look before it enters the studio.">
                    <dl className="grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
                      {[
                        ["Looking for", form.service],
                        ["Artist", form.artist],
                        ["Name", form.name],
                        ["WhatsApp", form.whatsapp],
                        ["Email", form.email || "—"],
                        ["Idea", form.idea],
                        ["Placement", form.placement || "—"],
                        ["Size", form.size || "—"],
                        ["Style", form.style || "—"],
                        ["Budget", form.budget || "—"],
                        ["Preferred date", form.date || "—"],
                        ["Preferred time", form.time || "—"],
                        ["Contact via", form.contactPreference],
                        ["Reference", form.referenceName || "—"],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between gap-4 border-b border-bone/10 pb-2">
                          <dt className="text-[10px] uppercase tracking-[0.2em] text-bone/45">{k}</dt>
                          <dd className="text-right text-bone/80">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </StepShell>
                )}
              </motion.div>
            </AnimatePresence>

            {error && (
              <p role="alert" className="mt-6 border border-blood/40 bg-blood/10 px-4 py-3 text-xs text-blood">
                {error}
              </p>
            )}

            {/* nav buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-bone/10 pt-6">
              <button
                type="button"
                onClick={back}
                disabled={step === 0}
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-bone/50 transition-colors hover:text-bone disabled:opacity-30"
              >
                <ArrowLeft className="size-4" /> Back
              </button>
              <div className="flex flex-wrap gap-3">
                <InkButton variant="outline" onClick={onWhatsApp}>
                  <MessageCircle className="size-4" /> WhatsApp Instead
                </InkButton>
                {step < 4 ? (
                  <InkButton type="submit">
                    Continue <ArrowRight className="size-4" />
                  </InkButton>
                ) : (
                  <InkButton type="submit" disabled={submitting}>
                    {submitting ? "Sending…" : "Submit Booking Request"}
                  </InkButton>
                )}
              </div>
            </div>
          </form>

          <p className="mt-6 text-center font-body text-xs leading-relaxed text-bone/40">
            By submitting you agree to be contacted about your enquiry. Your details are used only for booking —
            never marketing, never shared.
          </p>
        </div>
      </section>
    </>
  );
}

/* ------------------------------ helpers ------------------------------ */

function StepShell({ title, hint, children }: { title: string; hint: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl uppercase tracking-tight text-bone md:text-3xl">{title}</h2>
      <p className="mt-2 font-body text-sm text-bone/55">{hint}</p>
      <div className="mt-7">{children}</div>
    </div>
  );
}

function Choice({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "border px-5 py-4 text-left font-display text-sm uppercase tracking-[0.14em] transition-all",
        active
          ? "border-blood bg-blood/15 text-bone"
          : "border-bone/20 text-bone/60 hover:border-bone/50 hover:text-bone",
      )}
    >
      {label}
      {active && <Check className="ml-2 inline size-4 text-blood" aria-hidden />}
    </button>
  );
}

const inputCls =
  "w-full border border-bone/20 bg-ink px-3.5 py-3 font-body text-sm text-bone placeholder:text-bone/30 focus:border-blood/70 focus:outline-none";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-bone/50">{label}</span>
      {children}
    </label>
  );
}
