import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Check, Clock, MessageCircle, Upload } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { SparkMotif } from "@/components/art";
import { InkButton, PageHero, Reveal } from "@/components/ui-kit";
import { breadcrumbSchema, pageMeta } from "@/config/seo";
import { useJsonLd, useSeo } from "@/hooks/use-seo";
import { submitBooking } from "@/lib/forms";
import {
  decideMystery,
  trackBookingStart,
  trackBookingStep,
  trackBookingSubmit,
  useMysteryTracker,
  type MysteryDecision,
} from "@/lib/mystery";
import { bookingMessage, displayWhatsApp, openWhatsApp } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { trackFunnelEvent } from "@/lib/funnel";

/** Map the booking size option to an approximate cm figure for the Mystery Box engine. */
const sizeCm = (s: string): number | null => {
  if (s.startsWith("Small")) return 3;
  if (s.startsWith("Medium")) return 10;
  if (s.startsWith("Large")) return 20;
  if (s.startsWith("XL")) return 35;
  return null;
};

/** Shared pixel mystery-box artwork (closed, ribbon + "?"). */
function MysteryBoxArt({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 28 24"
      shapeRendering="crispEdges"
      width={size}
      height={(size * 24) / 28}
      className={className}
      aria-hidden
    >
      {/* lid */}
      <rect x="4" y="6" width="20" height="5" fill="#c9a227" stroke="#141414" strokeWidth="1.5" />
      {/* box body */}
      <rect x="5" y="11" width="18" height="10" fill="#f5c518" stroke="#141414" strokeWidth="1.5" />
      <rect x="7" y="13" width="2" height="2" fill="#141414" />
      <rect x="19" y="13" width="2" height="2" fill="#141414" />
      <rect x="7" y="18" width="2" height="2" fill="#141414" />
      <rect x="19" y="18" width="2" height="2" fill="#141414" />
      {/* ? */}
      <g fill="#141414">
        <rect x="12" y="13" width="4" height="1.5" />
        <rect x="15" y="14.5" width="2" height="2" />
        <rect x="14" y="16.5" width="2" height="1.5" />
        <rect x="14" y="19.5" width="2" height="1.5" />
      </g>
      {/* ribbon */}
      <rect x="13" y="1" width="2" height="5" fill="#141414" />
      <rect x="10" y="0" width="8" height="2" fill="#141414" />
    </svg>
  );
}

/**
 * MysteryBoxTeaser — appears THE MOMENT the visitor lands on /book (i.e.
 * the moment they press Book Now). A wobbling closed box sits beside the
 * form, promising the discount so they finish the booking to open it.
 * Doesn't block the form; can be hidden with one tap.
 */
function MysteryBoxTeaser() {
  const reduce = useReducedMotion();
  const [tapped, setTapped] = useState(false);

  return (
    <motion.aside
      initial={reduce ? false : { opacity: 0, y: 32, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-auto fixed bottom-4 right-4 z-40 w-[13.5rem] border-2 border-ink bg-[#141414] p-4 text-center shadow-[6px_6px_0_0_var(--blood)] sm:bottom-6 sm:right-6 md:w-60"
    >
      <button
        type="button"
        onClick={() => setTapped(true)}
        aria-label="Peek at your mystery box"
        className="group mx-auto flex w-full cursor-pointer flex-col items-center focus:outline-none"
      >
        <motion.div
          animate={reduce || tapped ? {} : { y: [0, -4, 0], rotate: [-1.5, 1.5, -1.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <MysteryBoxArt size={52} className="drop-shadow-[3px_3px_0_rgba(0,0,0,0.45)]" />
        </motion.div>
        <p className="mt-3 font-marker text-lg leading-tight text-blood">Your Mystery Box is waiting…</p>
        <p className="mt-1 text-[9px] font-semibold uppercase leading-relaxed tracking-[0.2em] text-bone/50">
          Finish your booking → open it for a surprise % off
        </p>
        <span
          className={cn(
            "mt-3 w-full border-2 px-2 py-2 font-display text-[11px] uppercase tracking-[0.18em] transition-colors",
            tapped
              ? "border-blood text-blood"
              : "border-bone/25 text-bone group-hover:border-blood group-hover:text-blood",
          )}
        >
          {tapped ? "Opens when you book ✓" : "Peek inside"}
        </span>
      </button>
      <button
        type="button"
        onClick={() => setTapped(false)}
        className="mt-2 text-[9px] uppercase tracking-[0.2em] text-bone/30 transition-colors hover:text-bone/60"
      >
        reset peek
      </button>
      <BoxDismissButton />
    </motion.aside>
  );
}

/** Tiny dismiss control — split out so the teaser stays readable. */
function BoxDismissButton() {
  return (
    <button
      type="button"
      onClick={(e) => {
        const aside = e.currentTarget.closest("aside");
        if (aside) {
          aside.style.display = "none";
        }
      }}
      className="mt-1 text-[8px] uppercase tracking-[0.24em] text-bone/25 transition-colors hover:text-bone/50"
    >
      hide box
    </button>
  );
}

/**
 * MysteryBoxReveal — the box OPENS on the booking-confirmation screen.
 * The discount (decided from their browsing pattern + tattoo size) is
 * revealed here, and only here.
 */
function MysteryBoxReveal({ decision }: { decision: MysteryDecision }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-10 flex flex-col items-center">
      {!open ? (
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            // Best-effort counter log for the studio (decision lives in the ledger).
            console.info(
              `[mystery] ${decision.code} — ${decision.percent}% off issued with this booking`,
            );
          }}
          aria-label="Open your mystery box"
          className="group flex cursor-pointer flex-col items-center focus:outline-none"
        >
          <motion.div
            animate={reduce ? {} : { y: [0, -4, 0], rotate: [-1.5, 1.5, -1.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <MysteryBoxArt size={64} className="drop-shadow-[3px_3px_0_rgba(0,0,0,0.45)]" />
          </motion.div>
          <span className="mt-3 font-display text-xs font-bold uppercase tracking-[0.22em] text-bone transition-colors group-hover:text-[#f5c518]">
            🎁 Open your Mystery Box
          </span>
          <span className="mt-1 text-[9px] uppercase tracking-[0.18em] text-bone/40">
            Every booking gets one. No exceptions.
          </span>
        </button>
      ) : (
        <motion.div
          className="flex flex-col items-center"
          initial={reduce ? false : { scale: 0.6, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-[#f5c518]">
            ✦ Mystery Unlocked ✦
          </p>
          <p className="mt-2 font-display text-6xl uppercase leading-none text-bone">
            {decision.percent}
            <span className="text-3xl text-blood">%</span>
            <span className="ml-2 align-middle font-body text-sm tracking-[0.2em] text-bone/60">OFF</span>
          </p>
          <p className="mt-3 border border-bone/20 bg-ink px-3 py-1.5 font-mono text-xs tracking-[0.2em] text-bone/85">
            CODE&nbsp; {decision.code}
          </p>
          <p className="mt-3 max-w-xs text-center text-[10px] uppercase leading-relaxed tracking-[0.14em] text-bone/45">
            Mention this code on WhatsApp or show it at the studio — it's yours with this booking.
          </p>
        </motion.div>
      )}
    </div>
  );
}


const steps = ["Service", "Artist", "Date & Time", "Details", "Confirm"] as const;

type ServiceType = "Tattoo" | "Piercing" | "Academy";

const serviceTypes: { id: ServiceType; blurb: string }[] = [
  { id: "Tattoo", blurb: "Custom pieces, cover-ups, small & large — drawn for you." },
  { id: "Piercing", blurb: "Ear, nose, septum & more — sterile, safe, quick." },
  { id: "Academy", blurb: "Courses, workshops & studio tours for future artists." },
];

const subOptions: Record<ServiceType, string[]> = {
  Tattoo: ["New Tattoo", "Cover Up", "Custom Design", "Consultation", "Touch-up"],
  Piercing: ["Ear Lobe", "Helix", "Nose", "Septum", "Eyebrow", "Other"],
  Academy: ["Beginner Course", "Single Workshop", "Studio Tour", "Counselling"],
};

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

/** Bookable slots per day — surface a realistic, editable schedule. */
const TIME_SLOTS = ["12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM", "6:00 PM", "7:30 PM", "9:00 PM"];

/** Temporary browser-session availability until CRM storage is connected. */
const bookedSlots = new Set<string>();

function slotKey(date: string, time: string) {
  return `${date}:${time}`;
}

function nextDays(n: number) {
  const days: { iso: string; label: string; day: string }[] = [];
  for (let i = 1; i <= n; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push({
      iso: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      day: d.toLocaleDateString("en-IN", { weekday: "short" }),
    });
  }
  return days;
}

type FormState = {
  serviceType: ServiceType | "";
  service: string;
  artist: string;
  date: string;
  time: string;
  name: string;
  whatsapp: string;
  email: string;
  idea: string;
  placement: string;
  size: string;
  style: string;
  budget: string;
  contactPreference: string;
  referenceName: string;
};

const initial: FormState = {
  serviceType: "",
  service: "",
  artist: "",
  date: "",
  time: "",
  name: "",
  whatsapp: "",
  email: "",
  idea: "",
  placement: "",
  size: "",
  style: "",
  budget: "",
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
  const [formOk, setFormOk] = useState(false);
  const [mystery, setMystery] = useState<MysteryDecision | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  /* The mystery box exists the moment they land on /book — the engine is
     armed on arrival and the visible teaser appears beside the form. */
  useMysteryTracker();
  useEffect(() => {
    trackBookingStart();
    trackFunnelEvent("book_clicked");
  }, []);
  useEffect(() => {
    trackBookingStep(step);
  }, [step]);

  const days = useMemo(() => nextDays(14), []);
  const set = (k: keyof FormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    const eventByField: Partial<Record<keyof FormState, "artist_selected" | "style_selected" | "size_selected" | "placement_selected">> = {
      artist: "artist_selected",
      style: "style_selected",
      size: "size_selected",
      placement: "placement_selected",
    };
    const event = eventByField[k];
    if (event && v.trim()) trackFunnelEvent(event, v);
  };

  const validate = (s: number): string => {
    if (s === 0 && (!form.serviceType || !form.service)) return "Pick a service to continue.";
    if (s === 1 && form.serviceType !== "Piercing" && !form.artist) return "Choose an artist (or no preference).";
    if (s === 2 && (!form.date || !form.time)) return "Pick a date and an available time slot.";
    if (s === 3) {
      if (form.name.trim().length < 2) return "Tell us your name.";
      if (!/^[\d+\-\s()]{8,16}$/.test(form.whatsapp.trim())) return "Add a valid WhatsApp number.";
      if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) return "That email doesn't look right.";
      if (form.serviceType === "Tattoo" && form.idea.trim().length < 10)
        return "Give us at least a sentence about the tattoo idea.";
    }
    return "";
  };

  const next = () => {
    const err = validate(step);
    if (err) return setError(err);
    setError("");
    setStep((s) => {
      const nextStep = s + 1;
      return form.serviceType === "Piercing" && nextStep === 1 ? 2 : Math.min(nextStep, 4);
    });
  };
  const back = () => {
    setError("");
    setStep((s) => Math.max(s - 1, 0));
  };

  const waMessage = () =>
    bookingMessage({
      name: form.name,
      service: form.serviceType === "Tattoo" ? form.service : `${form.serviceType} — ${form.service}`,
      artist: form.artist,
      idea: form.idea || `[${form.serviceType} enquiry: ${form.service}]`,
      placement: form.placement,
      size: form.size,
      style: form.style,
      date: form.date,
      time: form.time,
      budget: form.budget,
      contact: `${form.contactPreference} · ${form.whatsapp}${form.email ? " · " + form.email : ""}`,
      referenceNote: form.referenceName ? `${form.referenceName} (attached via WhatsApp)` : "—",
    }) + (mystery ? `\n\n🎁 Mystery Box: ${mystery.code} — ${mystery.percent}% off (unlocked with this booking).` : "");

  const onWhatsApp = () => {
    for (const s of [0, 1, 2, 3]) {
      const err = validate(s);
      if (err) {
        setStep(s);
        return setError(err);
      }
    }
    openWhatsApp(waMessage());
  };

  const onSubmit = async () => {
    for (const s of [0, 1, 2, 3]) {
      const err = validate(s);
      if (err) {
        setStep(s);
        return setError(err);
      }
    }
    setSubmitting(true);
    const decision = decideMystery(sizeCm(form.size));
    const result = await submitBooking({
      name: form.name,
      whatsapp: form.whatsapp,
      email: form.email,
      service: `${form.serviceType}: ${form.service}`,
      ...(form.serviceType === "Piercing"
        ? {}
        : {
            artist: form.artist,
            idea: form.idea,
            placement: form.placement,
            size: form.size,
            style: form.style,
          }),
      budget: form.budget,
      date: form.date,
      time: form.time,
      contactPreference: form.contactPreference,
      notes: `${form.referenceName}${mystery ? `\nMystery Box: ${mystery.code} — ${mystery.percent}% off` : ""}`,
      mysteryCode: decision.code,
      mysteryDiscount: String(decision.percent),
    });
    setSubmitting(false);
    // The box opens now: decide the discount from behavior pattern + tattoo size.
    trackBookingSubmit();
    trackFunnelEvent("enquiry_submitted", form.artist || "No Preference");
    if (result.ok) {
      bookedSlots.add(slotKey(form.date, form.time));
    }
    setMystery(decision);
    setFormOk(result.ok);
    // No Google Form endpoint configured yet — don't silently swallow the
    // booking. The confirmation screen hands the user one explicit WhatsApp
    // button so they choose when to send it.
    setDone(true);
  };

  /* ------------------------------ CONFIRMED ------------------------------ */
  if (done) {
    return (
      <main className="flex min-h-[100svh] items-center justify-center px-5 py-32">
        <Reveal>
          <div className="relative mx-auto max-w-xl border-2 border-ink bg-[#141414] p-8 text-center shadow-[8px_8px_0_0_var(--blood)] md:p-12">
            <SparkMotif className="absolute -right-3 -top-3 h-8 w-8 text-blood" aria-hidden />
            <span className="mx-auto flex size-14 items-center justify-center rounded-full border-2 border-blood text-blood">
              <Check className="size-6" />
            </span>
            <h1 className="mt-6 font-display text-3xl uppercase tracking-tight text-bone md:text-4xl">
              {formOk ? "Slot requested!" : "Finish on WhatsApp"}
            </h1>
            <p className="mt-4 font-body text-sm leading-relaxed text-bone/65">
              {form.date} · {form.time}{form.serviceType === "Piercing" ? " for your piercing." : ` with ${form.artist === "No Preference" ? "our next-available artist" : form.artist}. `}
              {formOk
                ? "We'll confirm shortly — it's in our intake."
                : `Your booking isn't sent yet. Tap the button below to send the full details to ${displayWhatsApp()} on WhatsApp.`}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <InkButton onClick={() => openWhatsApp(waMessage())}>
                <MessageCircle className="size-4" />
                {formOk ? "Nudge us on WhatsApp" : "Send booking on WhatsApp"}
              </InkButton>
              <InkButton href="/" variant="outline">Back Home</InkButton>
            </div>
            {mystery && <MysteryBoxReveal decision={mystery} />}
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
        title={<>Grab a<br />chair.</>}
        lead="Tattoo, piercing or academy — pick your artist, grab a time slot and tell us the idea. No payment now, ever."
      />

      {/* The Mystery Box appears the moment they land on /book — finish the
          booking to open it. Pointer-events confined to the card itself. */}
      <AnimatePresence>
        <MysteryBoxTeaser />
      </AnimatePresence>

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
                    "flex size-9 shrink-0 items-center justify-center rounded-full border-2 font-mono text-[11px] transition-all",
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
            className="border-2 border-bone/15 bg-white/[0.02] p-6 md:p-10"
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
                  <StepShell title="What are we doing today?" hint="Tattoo, piercing or academy — pick your path.">
                    <div className="space-y-4">
                      {serviceTypes.map((t) => (
                        <div key={t.id} className={cn("border-2 p-4 transition-colors", form.serviceType === t.id ? "border-blood bg-blood/5" : "border-bone/15")}>
                          <button
                            type="button"
                            onClick={() => {
                              setForm((f) => ({ ...f, serviceType: t.id, service: "" }));
                              setError("");
                            }}
                            aria-pressed={form.serviceType === t.id}
                            className="flex w-full items-center justify-between font-display text-xl uppercase tracking-tight text-bone"
                          >
                            {t.id}
                            {form.serviceType === t.id ? (
                              <Check className="size-5 text-blood" />
                            ) : (
                              <span className="font-body text-xs text-bone/40">select</span>
                            )}
                          </button>
                          <p className="mt-1 font-body text-sm text-bone/55">{t.blurb}</p>
                          {form.serviceType === t.id && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {subOptions[t.id].map((o) => (
                                <Choice key={o} label={o} active={form.service === o} onClick={() => set("service", o)} small />
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </StepShell>
                )}

                {step === 1 && form.serviceType !== "Piercing" && (
                  <StepShell title="Who's holding the machine?" hint="Both residents draw custom — or leave it to fate.">
                    <div className="grid gap-4 sm:grid-cols-3">
                      {artistOptions.map((a) => {
                        const isArtist = a !== "No Preference";
                        const slug = a.toLowerCase();
                        return (
                          <div key={a} className="relative">
                            <Choice label={a} active={form.artist === a} onClick={() => set("artist", a)} tall />
                            {isArtist && (
                              <Link
                                to={`/artists/${slug}/portfolio`}
                                className="absolute -top-2 right-2 border border-bone/30 bg-ink px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.15em] text-bone/70 transition-colors hover:border-blood hover:text-blood"
                              >
                                portfolio
                              </Link>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    {form.serviceType === "Academy" && (
                      <p className="mt-4 font-marker text-base text-cream/70">Note: academy sessions are taught by the studio team.</p>
                    )}
                  </StepShell>
                )}

                {step === 2 && (
                  <StepShell title="Claim your slot" hint="Real availability shown — yellow means up for grabs.">
                    <div className="grid gap-6 sm:grid-cols-[1fr_1.2fr]">
                      <div>
                        <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-bone/50">
                          <Calendar className="size-4 text-blood" /> Pick a date
                        </p>
                        <div className="grid grid-cols-4 gap-2 sm:grid-cols-3">
                          {days.map((d) => (
                            <button
                              key={d.iso}
                              type="button"
                              onClick={() => {
                                set("date", d.iso);
                                setError("");
                              }}
                              aria-pressed={form.date === d.iso}
                              className={cn(
                                "border-2 p-2 text-center transition-all",
                                form.date === d.iso ? "border-blood bg-blood/10 text-bone" : "border-bone/15 text-bone/60 hover:border-bone/40",
                              )}
                            >
                              <span className="block font-mono text-[9px] uppercase text-bone/40">{d.day}</span>
                              <span className="block font-display text-sm">{d.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-bone/50">
                          <Clock className="size-4 text-blood" /> Pick a time
                        </p>
                        {!form.date ? (
                          <p className="border-2 border-dashed border-bone/15 p-6 text-center font-marker text-lg text-bone/40">
                            pick a date first ↑
                          </p>
                        ) : (
                          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                            {TIME_SLOTS.map((t) => {
                              const taken = bookedSlots.has(slotKey(form.date, t));
                              return (
                                <button
                                  key={t}
                                  type="button"
                                  disabled={taken}
                                  onClick={() => {
                                    set("time", t);
                                    setError("");
                                  }}
                                  aria-pressed={form.time === t}
                                  className={cn(
                                    "border-2 py-3 font-display text-xs uppercase tracking-[0.1em] transition-all",
                                    taken
                                      ? "cursor-not-allowed border-bone/10 text-bone/25 line-through"
                                      : form.time === t
                                        ? "border-blood bg-blood text-ink shadow-[3px_3px_0_0_#e8e2d5]"
                                        : "border-bone/25 text-bone/70 hover:border-blood hover:text-blood",
                                  )}
                                >
                                  {t}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </StepShell>
                )}

                {step === 3 && (
                  <StepShell title="Tell us everything" hint="Details help us quote right — honest briefs get honest answers.">
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
                      {form.serviceType === "Tattoo" && (
                        <Field label="Tattoo placement">
                          <input className={inputCls} value={form.placement} onChange={(e) => set("placement", e.target.value)} placeholder="Forearm, ribs, lobe…" />
                        </Field>
                      )}
                      {form.serviceType === "Tattoo" && (
                        <>
                          <Field label="Approximate size">
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
                        </>
                      )}
                      {form.serviceType === "Tattoo" && (
                        <div className="sm:col-span-2">
                          <Field label="Tattoo idea *">
                            <textarea
                              className={inputCls}
                              value={form.idea}
                              onChange={(e) => set("idea", e.target.value)}
                              rows={4}
                              placeholder="Describe the idea — subject, meaning, references."
                              required
                            />
                          </Field>
                        </div>
                      )}
                      {form.serviceType === "Tattoo" && (
                        <div className="sm:col-span-2">
                          <Field label="Reference image (optional)">
                            <label className="flex cursor-pointer items-center gap-3 border-2 border-dashed border-bone/25 px-4 py-4 text-sm text-bone/60 transition-colors hover:border-blood">
                              <Upload className="size-4" />
                              {form.referenceName || "Attach a reference — or use the AI Ink Lab first!"}
                              <input
                                ref={fileRef}
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={(e) => set("referenceName", e.target.files?.[0]?.name ?? "")}
                              />
                            </label>
                          </Field>
                          <Link to="/concept" className="mt-2 inline-flex items-center gap-1.5 font-marker text-base text-blood underline underline-offset-4">
                            → or let AI draft your concept brief
                          </Link>
                        </div>
                      )}
                    </div>
                  </StepShell>
                )}

                {step === 4 && (
                  <StepShell title="One last look" hint="Confirm and it's in the book.">
                    <dl className="grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
                      {[
                        ["Service", `${form.serviceType}: ${form.service}`],
                        ...(form.serviceType === "Piercing" ? [] : [["Artist", form.artist] as const]),
                        ["Date", form.date],
                        ["Time", form.time],
                        ["Name", form.name],
                        ["WhatsApp", form.whatsapp],
                        ["Email", form.email || "—"],
                        ["Placement", form.placement || "—"],
                        ["Size", form.size || "—"],
                        ["Style", form.style || "—"],
                        ["Budget", form.budget || "—"],
                        ["Contact via", form.contactPreference],
                        ["Reference", form.referenceName || "—"],
                        ["Idea", form.idea],
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
              <p role="alert" className="mt-6 border-2 border-blood bg-blood/10 px-4 py-3 text-xs font-semibold text-blood">
                {error}
              </p>
            )}

            {/* nav buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-bone/10 pt-6">
              <button
                type="button"
                onClick={back}
                disabled={step === 0}
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-bone/50 transition-colors hover:text-blood disabled:opacity-30"
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
                    {submitting ? "Sending…" : "Request This Slot"}
                  </InkButton>
                )}
              </div>
            </div>
          </form>

          <p className="mt-6 text-center font-body text-xs leading-relaxed text-bone/40">
            Slots are requests until confirmed by the studio. Your details are used only for booking — never marketing.
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

function Choice({ label, active, onClick, small, tall }: { label: string; active: boolean; onClick: () => void; small?: boolean; tall?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "border-2 text-left font-display uppercase tracking-[0.1em] transition-all",
        small ? "px-3 py-2 text-[11px]" : tall ? "px-4 py-6 text-sm" : "px-5 py-4 text-sm",
        active
          ? "border-blood bg-blood/15 text-bone shadow-[3px_3px_0_0_var(--blood)]"
          : "border-bone/20 text-bone/60 hover:border-blood hover:text-bone",
      )}
    >
      {label}
    </button>
  );
}

const inputCls =
  "w-full border-2 border-bone/20 bg-ink px-3.5 py-3 font-body text-sm text-bone placeholder:text-bone/30 focus:border-blood/70 focus:outline-none";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-bone/50">{label}</span>
      {children}
    </label>
  );
}
