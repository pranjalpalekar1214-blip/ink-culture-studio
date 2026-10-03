import { useState } from "react";
import { InkButton, PageHero, Reveal, SectionHeading } from "@/components/ui-kit";
import { breadcrumbSchema, pageMeta } from "@/config/seo";
import { careerRoles } from "@/data/careers";
import { useJsonLd, useSeo } from "@/hooks/use-seo";
import { submitCareersApplication } from "@/lib/forms";
import { careersMessage, openWhatsApp } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const inputCls =
  "w-full border border-bone/20 bg-ink px-3.5 py-3 font-body text-sm text-bone placeholder:text-bone/30 focus:border-blood/70 focus:outline-none";

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-bone/50">
        {label} {required && <span className="text-blood">*</span>}
      </span>
      {children}
    </label>
  );
}

export default function Careers() {
  useSeo(pageMeta.careers);
  useJsonLd(
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Careers", path: "/careers" },
    ]),
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    role: careerRoles[0].title,
    experience: "",
    portfolio: "",
    instagram: "",
    message: "",
    cvName: "",
  });
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const valid = form.name.trim().length > 1 && /^\S+@\S+\.\S+$/.test(form.email.trim()) && form.whatsapp.trim().length >= 8;

  const onWhatsApp = () => {
    if (!valid) return setError("Name, a valid email and WhatsApp number are required.");
    setError("");
    openWhatsApp(
      careersMessage({
        name: form.name,
        role: form.role,
        experience: form.experience,
        portfolio: form.portfolio,
        instagram: form.instagram,
        message: form.message,
      }),
    );
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return setError("Name, a valid email and WhatsApp number are required.");
    if (form.portfolio && !/^https?:\/\//.test(form.portfolio.trim()))
      return setError("Portfolio link should start with https:// (or leave it empty).");
    setError("");
    const result = await submitCareersApplication({ ...form });
    // No Google Form endpoint configured yet — don't claim the application was
    // received. Hand it to WhatsApp so the enquiry actually reaches the studio.
    if (!result.configured) {
      openWhatsApp(
        careersMessage({
          name: form.name,
          role: form.role,
          experience: form.experience,
          portfolio: form.portfolio,
          instagram: form.instagram,
          message: form.message,
        }),
      );
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
    <>
      <PageHero
        index="05"
        kicker="Careers"
        title={<>Make your<br />mark.</>}
        lead="Artists, apprentices, camera people and studio operators — Street Culture grows when sharp people join. Here's what we look for and how to apply."
      />

      {/* ROLES */}
      <section className="py-16 md:py-24" aria-labelledby="roles-heading">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <SectionHeading index="01" kicker="Open Positions" title={<>Join Street<br />Culture.</>} />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {careerRoles.map((r, i) => (
              <Reveal key={r.id} delay={(i % 3) * 0.07}>
                <article className="flex h-full flex-col border border-bone/12 bg-white/[0.02] p-6 transition-colors hover:border-blood/50">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/40">{r.department}</span>
                    <span
                      className={cn(
                        "border px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em]",
                        r.status === "Open" ? "border-acid/60 text-acid" : "border-bone/20 text-bone/40",
                      )}
                    >
                      {r.status}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-xl uppercase tracking-tight text-bone">{r.title}</h3>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-bone/45">{r.type}</p>
                  <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-bone/60">{r.description}</p>
                  <ul className="mt-4 space-y-1.5 border-t border-bone/10 pt-4">
                    {r.lookingFor.map((l) => (
                      <li key={l} className="flex items-start gap-2 text-[12px] leading-snug text-bone/65">
                        <span className="mt-1.5 size-1 shrink-0 rounded-full bg-blood/70" aria-hidden />
                        {l}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-6">
            <p className="text-center font-body text-xs text-bone/45">
              No roles are open right now — applications below are reviewed when spots open. Strong portfolios never go unnoticed.
            </p>
          </Reveal>
        </div>
      </section>

      {/* APPLICATION */}
      <section className="border-t border-bone/10 py-16 md:py-24" aria-labelledby="apply-heading">
        <div className="mx-auto w-full max-w-3xl px-5 md:px-8">
          <SectionHeading index="02" kicker="Apply" title={<>Send your<br />work.</>} align="center" />
          {sent ? (
            <Reveal>
              <div className="border border-acid/40 bg-[#131a12] p-8 text-center md:p-10">
                <p className="font-display text-2xl uppercase text-bone">Application ready to send.</p>
                <p className="mx-auto mt-3 max-w-md font-body text-sm text-bone/65">
                  We go through every portfolio when a seat opens. WhatsApp should have opened with your
                  details — press send there to finish. You can also send it again below.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <InkButton onClick={onWhatsApp}>Apply via WhatsApp</InkButton>
                  <InkButton href="/academy" variant="outline">Train With Us Instead</InkButton>
                </div>
              </div>
            </Reveal>
          ) : (
            <Reveal delay={0.1}>
              <form onSubmit={onSubmit} className="space-y-5 border border-bone/12 bg-white/[0.02] p-6 md:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name" required>
                    <input className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} required />
                  </Field>
                  <Field label="Email" required>
                    <input className={inputCls} type="email" value={form.email} onChange={(e) => set("email", e.target.value)} required />
                  </Field>
                  <Field label="WhatsApp" required>
                    <input className={inputCls} value={form.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} inputMode="tel" required />
                  </Field>
                  <Field label="Role">
                    <select className={inputCls} value={form.role} onChange={(e) => set("role", e.target.value)}>
                      {careerRoles.map((r) => (
                        <option key={r.id}>{r.title}</option>
                      ))}
                    </select>
                  </Field>
                </div>
                <Field label="Experience">
                  <textarea className={inputCls} rows={3} value={form.experience} onChange={(e) => set("experience", e.target.value)} placeholder="Where you've worked, what you've made…" />
                </Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Portfolio URL">
                    <input className={inputCls} value={form.portfolio} onChange={(e) => set("portfolio", e.target.value)} placeholder="https://…" type="url" />
                  </Field>
                  <Field label="Instagram">
                    <input className={inputCls} value={form.instagram} onChange={(e) => set("instagram", e.target.value)} placeholder="@handle" />
                  </Field>
                </div>
                <Field label="Message">
                  <textarea className={inputCls} rows={3} value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Why Street Culture?" />
                </Field>
                <Field label="CV / Résumé (optional)">
                  <label className="flex cursor-pointer items-center gap-3 border border-dashed border-bone/25 px-4 py-4 text-sm text-bone/60 transition-colors hover:border-bone/50">
                    {form.cvName || "Attach PDF — or paste a link above"}
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="sr-only"
                      onChange={(e) => set("cvName", e.target.files?.[0]?.name ?? "")}
                    />
                  </label>
                </Field>
                {error && <p role="alert" className="text-xs text-blood">{error}</p>}
                <div className="flex flex-wrap gap-3">
                  <InkButton type="submit">Submit Application</InkButton>
                  <InkButton variant="outline" onClick={onWhatsApp}>Apply via WhatsApp</InkButton>
                </div>
              </form>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
