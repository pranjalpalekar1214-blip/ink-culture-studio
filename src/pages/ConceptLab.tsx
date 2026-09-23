import { useAction } from "convex/react";
import { motion } from "framer-motion";
import { ImagePlus, Loader2, MessageCircle, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import { api } from "@/convex/_generated/api";
import { BombMotif, CatMotif, SparkMotif, WinkMotif } from "@/components/art";
import { CursorLabel } from "@/components/CursorLabel";
import { InkButton, PageHero, Reveal } from "@/components/ui-kit";
import { contact } from "@/config/contact";
import { breadcrumbSchema, pageMeta } from "@/config/seo";
import { useJsonLd, useSeo } from "@/hooks/use-seo";
import { cn } from "@/lib/utils";

const styleOptions = [
  "No preference",
  "Black & Grey",
  "Realism",
  "Fine Line",
  "Traditional",
  "Neo Traditional",
  "Lettering",
  "Geometric",
];

export default function ConceptLab() {
  useSeo(pageMeta.concept ?? pageMeta.book);
  useJsonLd(
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "AI Concept Lab", path: "/concept" },
    ]),
  );

  const generate = useAction(api.ai.conceptBrief);

  const [idea, setIdea] = useState("");
  const [placement, setPlacement] = useState("");
  const [style, setStyle] = useState(styleOptions[0]);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [brief, setBrief] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const valid = idea.trim().length >= 10;

  const onFile = (file: File | undefined) => {
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      setError("Keep the reference under 4 MB so it uploads fast.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImageDataUrl(reader.result as string);
      setError("");
    };
    reader.readAsDataURL(file);
  };

  const onGenerate = async () => {
    if (!valid) {
      setError("Give us at least a sentence about your idea (10+ characters).");
      return;
    }
    setLoading(true);
    setError("");
    setBrief(null);
    try {
      const result = await generate({
        idea: idea.trim(),
        placement: placement.trim() || undefined,
        style: style === "No preference" ? undefined : style,
        imageDataUrl: imageDataUrl ?? undefined,
      });
      setBrief(result.brief);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const waHandoff = () => {
    const msg =
      `Hey ${contact.studioName}! I used your AI Concept Lab and I love this direction:\n\n` +
      `${brief ?? idea}\n\n` +
      (placement ? `Placement: ${placement}\n` : "") +
      `I'd like to book a consultation.`;
    open(`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <PageHero
        index="07"
        kicker="AI Concept Lab"
        title={<>Dream it.<br />Brief it.</>}
        lead="Upload a reference, describe the idea, and get a personalized concept brief drafted in studio style — then bring it to a real artist to make it permanent."
      >
        <Reveal delay={0.3} className="mt-6">
          <p className="flex items-center gap-2 font-marker text-xl text-cream/70">
            <WinkMotif className="h-6 w-10 text-blood" /> the machine drafts, the artist decides
          </p>
        </Reveal>
      </PageHero>

      <section className="py-14 md:py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 md:px-8 lg:grid-cols-[1fr_1.1fr]">
          {/* -------- input column -------- */}
          <div className="space-y-5">
            <div className="border-2 border-bone/15 bg-white/[0.02] p-6">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-bone/50">
                1 · Your idea *
              </p>
              <textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                rows={4}
                className={cn(inputCls, "resize-none")}
                placeholder="A black & grey moth holding a tiny umbrella, rain made of fine line work, two sessions max…"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="border-2 border-bone/15 bg-white/[0.02] p-6">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-bone/50">
                  2 · Placement
                </p>
                <input
                  value={placement}
                  onChange={(e) => setPlacement(e.target.value)}
                  className={inputCls}
                  placeholder="Forearm, ribs, calf…"
                />
              </div>
              <div className="border-2 border-bone/15 bg-white/[0.02] p-6">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-bone/50">
                  3 · Style vibe
                </p>
                <select value={style} onChange={(e) => setStyle(e.target.value)} className={inputCls}>
                  {styleOptions.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="border-2 border-bone/15 bg-white/[0.02] p-6">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-bone/50">
                4 · Reference image (optional)
              </p>
              {imageDataUrl ? (
                <div className="relative">
                  <img src={imageDataUrl} alt="Your tattoo reference" className="mx-auto max-h-56 border-2 border-bone/20" />
                  <button
                    onClick={() => setImageDataUrl(null)}
                    className="absolute right-2 top-2 border-2 border-ink bg-blood px-2 py-1 font-display text-[10px] uppercase text-ink"
                  >
                    remove
                  </button>
                </div>
              ) : (
                <label
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    onFile(e.dataTransfer.files?.[0]);
                  }}
                  className="flex cursor-pointer flex-col items-center gap-2 border-2 border-dashed border-bone/25 px-4 py-8 text-center transition-colors hover:border-blood"
                >
                  <ImagePlus className="size-8 text-bone/40" />
                  <span className="font-body text-sm text-bone/60">
                    drop an image or <span className="text-blood underline underline-offset-4">browse</span>
                  </span>
                  <span className="font-mono text-[10px] text-bone/35">JPG / PNG / WebP · max 4 MB</span>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="sr-only"
                    onChange={(e) => onFile(e.target.files?.[0])}
                  />
                </label>
              )}
            </div>

            {error && (
              <p role="alert" className="border-2 border-blood bg-blood/10 px-4 py-3 text-xs font-semibold text-blood">
                {error}
              </p>
            )}

            <InkButton onClick={onGenerate} disabled={loading} size="lg" className="w-full justify-center">
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Sketching your brief…
                </>
              ) : (
                <>
                  <Sparkles className="size-4" /> Generate Concept Brief
                </>
              )}
            </InkButton>

            <p className="text-center font-body text-[11px] leading-relaxed text-bone/40">
              Your image is sent to our AI (OpenAI) only to draft this brief and is never stored on our servers.
            </p>
          </div>

          {/* -------- output column -------- */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            {loading ? (
              <BriefSkeleton />
            ) : brief ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <BriefCard brief={brief} onWhatsApp={waHandoff} />
              </motion.div>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------ sub-views ------------------------------ */

function BriefCard({ brief, onWhatsApp }: { brief: string; onWhatsApp: () => void }) {
  const blocks = brief.split(/\n{2,}/).filter(Boolean);
  return (
    <article className="relative border-2 border-ink bg-[#151310] p-6 shadow-[8px_8px_0_0_var(--blood)] md:p-8">
      <div className="absolute -right-3 -top-3 rotate-12">
        <SparkMotif className="h-9 w-9 text-blood" />
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-blood">Concept Brief · Draft 01</p>
      <div className="mt-5 space-y-4">
        {blocks.map((block, i) => {
          const [first, ...rest] = block.split("\n");
          const isHeading = /^\d+\.\s/.test(first.trim()) || /^[A-Z &']{3,}:/.test(first.trim());
          if (isHeading) {
            const heading = first.replace(/^\d+\.\s*/, "").replace(/:$/, "");
            return (
              <section key={i}>
                <h3 className="font-display text-sm uppercase tracking-[0.14em] text-blood">{heading}</h3>
                <div className="mt-1.5 space-y-1 font-body text-sm leading-relaxed text-bone/80">
                  <p>{rest.join(" ").trim() || (block.split("\n").slice(1).join(" ") || first.replace(/^\d+\.\s*/, "").replace(/^[A-Z &']+:\s*/, ""))}</p>
                  {rest.length === 0 && null}
                </div>
              </section>
            );
          }
          return (
            <p key={i} className="font-body text-sm leading-relaxed text-bone/80">
              {block}
            </p>
          );
        })}
      </div>
      <div className="mt-7 flex flex-wrap gap-3 border-t-2 border-dashed border-bone/15 pt-6">
        <InkButton onClick={onWhatsApp}>
          <MessageCircle className="size-4" /> Send to the Studio
        </InkButton>
        <InkButton href="/book" variant="outline">
          Book This Idea
        </InkButton>
      </div>
    </article>
  );
}

function BriefSkeleton() {
  return (
    <div className="border-2 border-bone/15 bg-white/[0.02] p-6 md:p-8">
      <div className="flex items-center gap-3">
        <Loader2 className="size-5 animate-spin text-blood" />
        <p className="font-display text-lg uppercase tracking-tight text-bone">
          Your artist-brain is thinking…
        </p>
      </div>
      <p className="mt-2 font-marker text-lg text-cream/60">studying your reference, weighing line weights</p>
      <div className="mt-6 space-y-4">
        {[92, 78, 85, 60, 88].map((w, i) => (
          <div key={i} className="space-y-1.5">
            <div className="h-3 w-1/3 animate-pulse bg-bone/10" />
            <div className="h-2.5 animate-pulse bg-bone/5" style={{ width: `${w}%`, animationDelay: `${i * 120}ms` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="relative overflow-hidden border-2 border-dashed border-bone/20 p-8 md:p-10">
      <div className="pointer-events-none absolute inset-0 grain opacity-40" aria-hidden />
      <div className="flex items-start justify-between">
        <CatMotif className="h-16 w-16 text-blood/60" />
        <BombMotif className="h-14 w-14 text-bone/20" />
      </div>
      <h2 className="mt-6 font-display text-2xl uppercase tracking-tight text-bone">
        Your brief lands here
      </h2>
      <p className="mt-3 font-body text-sm leading-relaxed text-bone/60">
        Describe the tattoo living in your head — messy is fine. Add a reference if you have one. Our AI drafts
        a concept brief in the studio's voice: concept, style notes, placement guidance and which of our
        artists should hold the machine.
      </p>
      <ul className="mt-5 space-y-2 font-body text-sm text-bone/65">
        {[
          "Concept name + the story behind it",
          "Style & linework recommendations",
          "Realistic size and session guidance",
          "Karan vs Lucky — who fits your idea",
          "3 questions to ask at your consultation",
        ].map((t) => (
          <li key={t} className="flex items-start gap-2">
            <SparkMotif className="mt-1 size-3 shrink-0 text-blood" />
            {t}
          </li>
        ))}
      </ul>
      <CursorLabel label="FREE">
        <p className="mt-6 inline-block font-marker text-xl text-cream/70">
          free while we're in beta — no sign-up, no card
        </p>
      </CursorLabel>
    </div>
  );
}

const inputCls =
  "w-full border-2 border-bone/20 bg-ink px-3.5 py-3 font-body text-sm text-bone placeholder:text-bone/30 focus:border-blood/70 focus:outline-none";
