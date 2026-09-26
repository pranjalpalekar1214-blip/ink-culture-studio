const KEY_COINS = "sc-coin-count";
const KEY_DISCOUNTS = "sc-arcade-discounts";

/** Coins needed for each mystery discount block. */
export const DISCOUNT_GOAL = 30;

/** Variable-ratio payout odds — not every hit pays (keeps the loop addictive). */
export const COIN_ODDS = { click: 0.55, pixel: 0.65, block: 0.75 } as const;

export type ArcadeDiscount = {
  id: string;
  percent: number;
  code: string;
  createdAt: number;
  usedAt: number | null;
};

/* ------------------------------- coins ------------------------------- */

/** Current total coins collected across sessions. */
export function getCoins(): number {
  try {
    return Number(window.localStorage.getItem(KEY_COINS) ?? 0) || 0;
  } catch {
    return 0;
  }
}

/** Add coins, persist, and broadcast the new total on "sc:coins". */
export function addCoins(n = 1): number {
  const total = getCoins() + n;
  try {
    window.localStorage.setItem(KEY_COINS, String(total));
  } catch {
    /* private mode — coins just don't persist */
  }
  window.dispatchEvent(new CustomEvent("sc:coins", { detail: total }));
  return total;
}

/** Variable-ratio coin payout: returns coins won (0 = miss). */
export function gambleCoins(chance: number, amount = 1): number {
  return Math.random() < chance ? amount : 0;
}

/* ----------------------------- discounts ----------------------------- */

function readDiscounts(): ArcadeDiscount[] {
  try {
    return JSON.parse(window.localStorage.getItem(KEY_DISCOUNTS) ?? "[]") as ArcadeDiscount[];
  } catch {
    return [];
  }
}

function writeDiscounts(list: ArcadeDiscount[]) {
  try {
    window.localStorage.setItem(KEY_DISCOUNTS, JSON.stringify(list));
  } catch {
    /* ignore */
  }
}

/** All minted discounts, oldest first. */
export function getDiscounts(): ArcadeDiscount[] {
  return readDiscounts();
}

/** Latest unlocked, not-yet-redeemed discount (the one in your pocket). */
export function getHeldDiscount(): ArcadeDiscount | null {
  const unused = readDiscounts().filter((d) => !d.usedAt);
  return unused.length ? unused[unused.length - 1] : null;
}

const rollPercent = () => {
  // Jackpot band (>15%) must stay under 1:200 odds — we use 1:220 for margin.
  if (Math.random() < 1 / 220) return 16 + Math.floor(Math.random() * 20); // 16–35
  // Normal band 5–15%, square-skewed so 5–8% dominate and 15% is the ceiling.
  return 5 + Math.floor(Math.random() ** 2 * 11); // 5–15
};
const makeCode = (p: number) =>
  `1UP-${String(p).padStart(2, "0")}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

/**
 * If the coin total has crossed the next mystery-block threshold, mint a
 * fresh random 5–35% discount. Returns the new discount, or null.
 */
export function checkDiscountUnlock(): ArcadeDiscount | null {
  const coins = getCoins();
  const list = readDiscounts();
  const nextGoal = (list.length + 1) * DISCOUNT_GOAL;
  if (coins < nextGoal) return null;
  const percent = rollPercent();
  const discount: ArcadeDiscount = {
    id: `${Date.now()}`,
    percent,
    code: makeCode(percent),
    createdAt: Date.now(),
    usedAt: null,
  };
  writeDiscounts([...list, discount]);
  window.dispatchEvent(new CustomEvent("sc:discount", { detail: discount }));
  return discount;
}

/** Mark a discount as redeemed when a booking is confirmed with it. */
export function markDiscountUsed(id: string) {
  writeDiscounts(readDiscounts().map((d) => (d.id === id ? { ...d, usedAt: Date.now() } : d)));
}
