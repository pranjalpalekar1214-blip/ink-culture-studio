/**
 * Google Forms integration layer.
 *
 * Posts data as application/x-www-form-urlencoded (the format Google Forms
 * formResponse endpoints accept) which avoids CORS preflight entirely.
 * Endpoints & entry-field mappings are configured in src/config/contact.ts.
 * If an endpoint is not configured, submission resolves to { ok: false,
 * configured: false } and the UI falls back to WhatsApp / mailto.
 */

import { contact, googleForm } from "@/config/contact";

type EntryMap = Record<string, string>;

export type SubmitResult = {
  ok: boolean;
  /** false when no Google Form endpoint has been configured yet */
  configured: boolean;
  error?: string;
};

export function isFormConfigured(url: string): boolean {
  return Boolean(url && url.startsWith("http"));
}

async function postToForm(url: string, entryMap: EntryMap, data: Record<string, string>): Promise<SubmitResult> {
  if (!isFormConfigured(url)) {
    return { ok: false, configured: false };
  }
  try {
    const body = new URLSearchParams();
    for (const [key, value] of Object.entries(data)) {
      const entry = entryMap[key];
      if (entry && value) body.append(entry, value);
    }
    // no-cors: Google Forms does not return CORS headers; fire-and-forget POST.
    await fetch(`${url}`, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    return { ok: true, configured: true };
  } catch (err) {
    return {
      ok: false,
      configured: true,
      error: err instanceof Error ? err.message : "Submission failed",
    };
  }
}

export function submitBooking(data: Record<string, string>): Promise<SubmitResult> {
  return postToForm(googleForm.bookingsUrl, googleForm.bookingsEntryFields, data);
}

export function submitCareersApplication(data: Record<string, string>): Promise<SubmitResult> {
  return postToForm(googleForm.careersUrl, googleForm.careersEntryFields, data);
}

export function submitAcademyEnquiry(data: Record<string, string>): Promise<SubmitResult> {
  return postToForm(googleForm.academyUrl, googleForm.academyEntryFields, data);
}

/** mailto fallback so every form has a working submit path pre-configuration. */
export function mailtoLink(subject: string, body: string): string {
  return `mailto:${contact.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}
