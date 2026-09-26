import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Mystery Box engine — INVISIBLE to visitors.
 *
 * The site quietly reads behavior signals (pages explored, CTA presses,
 * block hits, form depth, sessions, dwell time) and — only when a booking
 * is confirmed — decides a mystery discount: 5–20%, reserved for medium
 * and large tattoos. Nothing about the mechanic is shown anywhere before
 * the reveal, so it can be marketed as a pure surprise ("every booking
 * opens a Mystery Box").
 */

const KEY = "sc-mystery-signals";
const KEY_DECISION = "sc-mystery-decision";

/* ------------------------------ signals ------------------------------ */

type Signals = {
  sessions: number;
  pages: string[];
  ctaPresses: number;
  blockHits: number;
  galleryViews: number;
  artistProfiles: number;
  bookingStarts: number;
  bookingMaxStep: number;
  bookingSubmits: number;
  visits: number;
  firstSeen: number;
  lastSeen: number;
};

const EMPTY: Signals = {
  sessions: 0,
  pages: [],
  ctaPresses: 0,
  blockHits: 0,
  galleryViews: 0,
  artistProfiles: 0,
  bookingStarts: 0,
  bookingMaxStep: 0,
  bookingSubmits: 0,
  visits: 0,
  firstSeen: 0,
  lastSeen: 0,
};

function read(): Signals {
  try {
    return { ...EMPTY, ...(JSON.parse(localStorage.getItem(KEY) ?? "{}") as Partial<Signals>) };
  } catch {
    return { ...EMPTY };
  }
}

function write(s: Signals) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* private mode — engine simply goes quiet */
  }
}

/** Count one press on any reactive element (called from the global FX layer). */
export function trackPress(kind: "cta" | "block" = "cta") {
  const s = read();
  if (kind === "block") s.blockHits += 1;
  else s.ctaPresses += 1;
  s.lastSeen = Date.now();
  write(s);
}

/** Count a visit to a page (called from a tiny hook mounted in the layout). */
export function trackPage(path: string) {
  const s = read();
  if (s.firstSeen === 0) s.firstSeen = Date.now();
  s.lastSeen = Date.now();
  if (!s.pages.includes(path)) s.pages = [...s.pages.slice(-40), path];
  if (path === "/gallery") s.galleryViews += 1;
  if (path.startsWith("/artists/")) s.artistProfiles += 1;
  if (path === "/book") s.bookingStarts += 1;
  write(s);
}

/** Track how deep into the booking form the visitor reached. */
export function trackBookingStep(step: number) {
  const s = read();
  s.bookingMaxStep = Math.max(s.bookingMaxStep, step);
  s.lastSeen = Date.now();
  write(s);
}

/** Record a confirmed booking (the mystery box opens at this moment). */
export function trackBookingSubmit() {
  const s = read();
  s.bookingSubmits += 1;
  s.lastSeen = Date.now();
  write(s);
}

/** Tiny invisible hook — mount anywhere; the visit count stays session-safe. */
export function useMysteryTracker() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem("sc-mystery-visit") === "1") return;
      sessionStorage.setItem("sc-mystery-visit", "1");
    } catch {
      /* ignore */
    }
    const s = read();
    s.visits += 1;
    s.sessions = s.visits;
    write(s);
  }, []);

  const { pathname } = useLocation();
  useEffect(() => {
    trackPage(pathname);
  }, [pathname]);
}

/* --------------------------- decision engine --------------------------- */

export type MysteryDecision = {
  percent: number;
  code: string;
  size: "medium" | "large";
  reason: "engaged" | "hesitant" | "warm";
  createdAt: number;
};

/**
 * Engagement score 0–100, built from the silent signals. This is the
 * "pattern reading" — it never surfaces to the visitor.
 */
export function engagementScore(): number {
  const s = read();
  let score = 0;
  score += Math.min(s.pages.length, 12) * 3; // breadth of exploration (max 36)
  score += Math.min(s.ctaPresses, 20) * 1.5; // interaction appetite (max 30)
  score += Math.min(s.blockHits, 10) * 2; // played with the block (max 20)
  score += Math.min(s.galleryViews, 4) * 2; // studied the work (max 8)
  score += Math.min(s.artistProfiles, 3) * 2; // chose an artist (max 6)
  score += Math.min(s.bookingMaxStep, 4) * 3; // went deep into booking (max 12)
  score += Math.min(s.visits - 1, 3) * 4; // came back (max 12)
  return Math.round(Math.min(score, 100));
}

const code = (p: number) =>
  `MYSTERY-${String(p).padStart(2, "0")}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

/**
 * Decide the mystery discount at booking-confirmation time.
 *
 * Business rules:
 *  - Slab is 5–20% only.
 *  - Medium tattoos (5–15 cm) can get up to 12%; large (15 cm+) up to 20%.
 *    Smaller pieces get the polite 5–7% floor band.
 *  - More-engaged visitors sit in the middle of their slab; hesitant ones
 *    get the sweetest end (that's the conversion catch).
 */
export function decideMystery(sizeCm: number | null): MysteryDecision {
  const s = read();
  const score = engagementScore();

  // Warmth: engaged visitors are already converting — hesitant ones need the nudge.
  const hesitant = score < 45 || s.bookingSubmits === 0;

  // Size tier — the catch: the discount is reserved for medium/large work.
  let cap: number;
  let size: MysteryDecision["size"];
  if (sizeCm === null || sizeCm < 5) {
    cap = 7; // small / unspecified — floor band
    size = "medium";
  } else if (sizeCm < 15) {
    cap = 12; // medium
    size = "medium";
  } else {
    cap = 20; // large / XL
    size = "large";
  }

  // Within the slab: hesitant visitors land near the sweet end.
  const spread = size === "medium" || size === "large" ? 0.45 + Math.random() * 0.55 : Math.random();
  const warmth = hesitant ? 0.75 + Math.random() * 0.25 : spread;
  const percent = Math.max(5, Math.min(cap, Math.round(5 + (cap - 5) * warmth)));

  const decision: MysteryDecision = {
    percent,
    code: code(percent),
    size,
    reason: hesitant ? "hesitant" : score >= 70 ? "engaged" : "warm",
    createdAt: Date.now(),
  };
  try {
    localStorage.setItem(KEY_DECISION, JSON.stringify(decision));
  } catch {
    /* ignore */
  }
  return decision;
}

/** Last decision made (used for the post-submit reveal). */
export function getDecision(): MysteryDecision | null {
  try {
    return JSON.parse(localStorage.getItem(KEY_DECISION) ?? "null") as MysteryDecision | null;
  } catch {
    return null;
  }
}
