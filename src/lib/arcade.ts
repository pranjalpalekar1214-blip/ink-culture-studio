const KEY = "sc-coin-count";

/** Current total coins collected across sessions. */
export function getCoins(): number {
  try {
    return Number(window.localStorage.getItem(KEY) ?? 0) || 0;
  } catch {
    return 0;
  }
}

/** Add coins, persist, and broadcast the new total on "sc:coins". */
export function addCoins(n = 1): number {
  const total = getCoins() + n;
  try {
    window.localStorage.setItem(KEY, String(total));
  } catch {
    /* private mode — coins just don't persist */
  }
  window.dispatchEvent(new CustomEvent("sc:coins", { detail: total }));
  return total;
}
