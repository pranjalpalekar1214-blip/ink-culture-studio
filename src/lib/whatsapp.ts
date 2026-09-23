import { contact } from "@/config/contact";

/**
 * WhatsApp utilities.
 * The number lives in src/config/contact.ts — never hardcode it anywhere else.
 */

export type BookingEnquiry = {
  name: string;
  service: string;
  artist: string;
  idea: string;
  placement: string;
  size: string;
  style: string;
  date: string;
  time: string;
  budget: string;
  contact: string;
  referenceNote?: string;
};

/** Human-readable WhatsApp number, e.g. "+91 00000 00000" */
export function displayWhatsApp(): string {
  const n = contact.whatsappNumber;
  if (n.length > 10) {
    const cc = n.slice(0, n.length - 10);
    const rest = n.slice(-10);
    return `+${cc} ${rest.slice(0, 5)} ${rest.slice(5)}`;
  }
  return `+${n}`;
}

/** Opens wa.me in a new tab; works on mobile (app) and desktop (web). */
export function openWhatsApp(message: string): void {
  const url = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

/** Generic short message helper. */
export function generalEnquiryMessage(): string {
  return `Hey ${contact.studioName}! I want to enquire about a tattoo.`;
}

/** Builds the full booking enquiry message from form state (tattoo / piercing / academy). */
export function bookingMessage(b: BookingEnquiry): string {
  const line = (label: string, value?: string) => `${label}: ${value?.trim() || "—"}\n`;
  return (
    `Hey ${contact.studioName}!\n\n` +
    `I'd like to request a session.\n\n` +
    line("Name", b.name) +
    line("Looking for", b.service) +
    line("Artist", b.artist) +
    line("Tattoo idea", b.idea) +
    line("Placement", b.placement) +
    line("Size", b.size) +
    line("Style", b.style) +
    line("Preferred date", b.date) +
    line("Preferred time", b.time) +
    line("Budget", b.budget) +
    line("Contact", b.contact) +
    (b.referenceNote ? line("Reference images", b.referenceNote) : "")
  );
}

/** Careers application message. */
export function careersMessage(fields: {
  name: string;
  role: string;
  experience: string;
  portfolio: string;
  instagram: string;
  message: string;
}): string {
  const line = (label: string, value?: string) => `${label}: ${value?.trim() || "—"}\n`;
  return (
    `Hey ${contact.studioName}!\n\n` +
    `I want to apply to join the team.\n\n` +
    line("Name", fields.name) +
    line("Role", fields.role) +
    line("Experience", fields.experience) +
    line("Portfolio", fields.portfolio) +
    line("Instagram", fields.instagram) +
    line("Message", fields.message)
  );
}

/** Academy enquiry message. */
export function academyMessage(fields: {
  name: string;
  experience: string;
  message: string;
}): string {
  const line = (label: string, value?: string) => `${label}: ${value?.trim() || "—"}\n`;
  return (
    `Hey ${contact.studioName} Academy!\n\n` +
    `I want to learn the craft.\n\n` +
    line("Name", fields.name) +
    line("Experience level", fields.experience) +
    line("Message", fields.message)
  );
}
