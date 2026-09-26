const KEY_COINS = "sc-coin-count";
const KEY_DISCOUNTS = "sc-arcade-discounts";

/** Coins needed for each mystery discount block. */
export const DISCOUNT_GOAL = 30;

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

const rollPercent = () => 5 + Math.floor(Math.random() * 31); // 5–35 inclusive
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
