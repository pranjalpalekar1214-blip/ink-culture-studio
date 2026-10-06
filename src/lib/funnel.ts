export type FunnelEventName =
  | "artist_viewed"
  | "style_viewed"
  | "gallery_piece_viewed"
  | "book_clicked"
  | "artist_selected"
  | "style_selected"
  | "size_selected"
  | "placement_selected"
  | "enquiry_submitted";

export type FunnelEvent = {
  name: FunnelEventName;
  value?: string;
  path: string;
  timestamp: number;
};

const KEY = "sc-funnel-events";

export function trackFunnelEvent(name: FunnelEventName, value?: string) {
  if (typeof window === "undefined") return;

  const event: FunnelEvent = {
    name,
    ...(value ? { value } : {}),
    path: window.location.pathname,
    timestamp: Date.now(),
  };

  window.dispatchEvent(new CustomEvent("street-culture:funnel", { detail: event }));

  try {
    const events = JSON.parse(window.sessionStorage.getItem(KEY) ?? "[]") as FunnelEvent[];
    window.sessionStorage.setItem(KEY, JSON.stringify([...events.slice(-99), event]));
  } catch {
    // Analytics must never block the booking flow.
  }
}
