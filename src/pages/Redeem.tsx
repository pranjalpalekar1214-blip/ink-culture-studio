import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import { useSeo } from "@/hooks/use-seo";
import { parseMysteryCode } from "@/lib/mystery";
import { cn } from "@/lib/utils";

/**
 * /redeem — STAFF-ONLY counter page (unlinked, noindex).
 *
 * Validation is two-layer:
 *  1. Structural: parseMysteryCode checks the MYSTERY-PP-CCCC format and a
 *     checksum derived from the percent + an internal salt — so randomly
 *     typed codes fail instantly, even offline.
 *  2. Ledger: the Convex `mysteryCodes` table proves the code was actually
 *     issued with a booking, and `redeem` burns it exactly once.
 */

type Phase =
  | { kind: "idle" }
  | { kind: "invalid"; code: string }
  | { kind: "unknown"; code: string }
  | { kind: "void"; code: string }
  | { kind: "already"; code: string }
  | { kind: "ok"; code: string; percent: number };

export default function Redeem() {
  useSeo({
    title: "Code Check · Street Culture",
    description: "Staff only — validate mystery box codes at the counter.",
    path: "/redeem",
    keywords: ["staff"],
    type: "website",
  });

  const [code, setCode] = useState("");
  const [phase, setPhase] = useState<Phase>({ kind: "idle" });
  const [busy, setBusy] = useState(false);

  const lookup = useQuery(api.mystery.verify, phase.kind === "unknown" ? { code: phase.code } : "skip");
  const redeemCode = useMutation(api.mystery.redeem);

  const submit = async () => {
    const normalized = code.trim().toUpperCase();
    if (!normalized) return;

    // Layer 1: structural + checksum validation (instant, works offline).
    if (!parseMysteryCode(normalized)) {
      setPhase({ kind: "invalid", code: normalized });
      return;
    }

    setBusy(true);
    const record = await redeemCode({ code: normalized });
    setBusy(false);

    if (!record.ok) {
      if (record.error === "already_redeemed") setPhase({ kind: "already", code: normalized });
      else if (record.error === "void") setPhase({ kind: "void", code: normalized });
      else setPhase({ kind: "unknown", code: normalized });
      return;
    }
    setPhase({ kind: "ok", code: normalized, percent: record.record.percent });
    setCode("");
  };

  // When a code is structurally valid but the ledger hasn't answered yet,
  // show its live lookup status.
  const pendingLookup = phase.kind === "unknown" ? lookup : undefined;

  return (
    <main className="flex min-h-[100svh] items-center justify-center px-5 py-24">
      <div className="w-full max-w-md border-2 border-ink bg-[#141414] p-8 shadow-[8px_8px_0_0_var(--blood)]">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-blood">
          Staff only · counter terminal
        </p>
        <h1 className="mt-2 font-display text-3xl uppercase tracking-tight text-bone">Mystery box check</h1>
        <p className="mt-3 text-xs leading-relaxed text-bone/50">
          Type or paste the customer's code. Valid codes are burned exactly once.
        </p>

        <form
          className="mt-6 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            void submit();
          }}
        >
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="MYSTERY-XX-XXXX"
            spellCheck={false}
            autoComplete="off"
            className="min-w-0 flex-1 border-2 border-bone/25 bg-ink px-3 py-3 font-mono text-sm tracking-[0.15em] text-bone placeholder:text-bone/25 focus:border-blood/70 focus:outline-none"
          />
          <button
            type="submit"
            disabled={busy}
            className="shrink-0 border-2 border-ink bg-blood px-4 py-3 font-display text-xs uppercase tracking-[0.18em] text-ink shadow-[3px_3px_0_0_var(--bone)] transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
          >
            {busy ? "…" : "Check"}
          </button>
        </form>

        <div className="mt-6 min-h-24" aria-live="polite">
          {phase.kind === "invalid" && (
            <Result tone="bad" title="Invalid code">
              "{phase.code}" isn't a real mystery code. Check for typos — format is MYSTERY-XX-XXXX.
            </Result>
          )}

          {phase.kind === "unknown" && (
            <Result tone={pendingLookup ? "warn" : "bad"} title={pendingLookup ? "Not in ledger (still checking)" : "Not issued"}>
              {pendingLookup
                ? "This code is well-formed but was never issued with a booking — the ledger lookup is still settling."
                : `No booking found for "${phase.code}". A well-formed code still needs a ledger entry; ask the customer to re-open their confirmation screen.`}
            </Result>
          )}

          {phase.kind === "void" && (
            <Result tone="warn" title="Code voided">
              "{phase.code}" was voided by the studio. Do not honour it.
            </Result>
          )}

          {phase.kind === "already" && (
            <Result tone="warn" title="Already redeemed">
              "{phase.code}" was burned earlier. One box per booking — check its history in the Convex dashboard.
            </Result>
          )}

          {phase.kind === "ok" && (
            <Result tone="good" title={`Valid — ${phase.percent}% off`}>
              "{phase.code}" redeemed just now. Apply {phase.percent}% to this bill.
            </Result>
          )}

          {phase.kind === "idle" && (
            <p className="font-marker text-lg text-bone/35">waiting for a code…</p>
          )}
        </div>

        <p className="mt-8 border-t border-bone/10 pt-4 text-[9px] uppercase leading-relaxed tracking-[0.2em] text-bone/25">
          Codes are only valid with a booking. Slabs: 5–20% · medium/large pieces unlock the top of the range.
        </p>
      </div>
    </main>
  );
}

function Result({
  tone,
  title,
  children,
}: {
  tone: "good" | "bad" | "warn";
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "border-2 p-4",
        tone === "good" && "border-blood bg-blood/10",
        tone === "bad" && "border-bone/30 bg-bone/5",
        tone === "warn" && "border-bone/20 bg-bone/[0.03]",
      )}
    >
      <p
        className={cn(
          "font-display text-xl uppercase tracking-tight",
          tone === "good" ? "text-blood" : tone === "warn" ? "text-cream" : "text-bone/85",
        )}
      >
        {title}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-bone/55">{children}</p>
    </div>
  );
}
