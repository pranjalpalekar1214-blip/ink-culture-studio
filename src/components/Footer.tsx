import { Facebook, Instagram, MapPin } from "lucide-react";
import { Link } from "react-router";
import { contact } from "@/config/contact";
import { BrandLogo } from "@/components/BrandLogo";
import { displayWhatsApp } from "@/lib/whatsapp";
import { InkButton } from "./ui-kit";

const nav = [
  { to: "/about", label: "About" },
  { to: "/artists", label: "Artists" },
  { to: "/gallery", label: "Gallery" },
  { to: "/academy", label: "Academy" },
  { to: "/blog", label: "Journal" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
  { to: "/book", label: "Book" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-bone/10 bg-ink">
      <div className="mx-auto w-full max-w-7xl px-5 pb-24 pt-14 sm:pb-14 md:px-8 md:pb-20 md:pt-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <BrandLogo className="text-base sm:text-lg" />
            <p className="mt-4 font-marker text-2xl text-blood">Ink is culture.</p>
            <p className="mt-3 max-w-sm font-body text-sm leading-relaxed text-bone/60">
              {contact.studioName} — custom tattoos & professional training in {contact.address.locality}, {contact.address.city}.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <InkButton href="/book" size="sm">
                Book Now
              </InkButton>
              <a
                href={contact.social.instagramStudio.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram — Studio (${contact.social.instagramStudio.handle})`}
                title={`Instagram — ${contact.social.instagramStudio.handle}`}
                className="flex size-10 items-center justify-center border border-bone/20 text-bone/70 transition-colors hover:border-blood hover:text-blood"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href={contact.social.instagramAcademy.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram — Academy (${contact.social.instagramAcademy.handle})`}
                title={`Instagram — ${contact.social.instagramAcademy.handle}`}
                className="flex size-10 items-center justify-center border border-bone/20 text-bone/70 transition-colors hover:border-blood hover:text-blood"
              >
                <Instagram className="size-4" />
              </a>
              {contact.social.facebook && (
                <a
                  href={contact.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex size-10 items-center justify-center border border-bone/20 text-bone/70 transition-colors hover:border-blood hover:text-blood"
                >
                  <Facebook className="size-4" />
                </a>
              )}
            </div>
            <ul className="mt-4 space-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-bone/50">
              <li>
                <a href={contact.social.instagramStudio.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blood">
                  Instagram Studio — {contact.social.instagramStudio.handle}
                </a>
              </li>
              <li>
                <a href={contact.social.instagramAcademy.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blood">
                  Instagram Academy — {contact.social.instagramAcademy.handle}
                </a>
              </li>
              {contact.social.facebookHandle && (
                <li>
                  <a href={contact.social.facebook || `https://facebook.com/${contact.social.facebookHandle}`} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blood">
                    Facebook — {contact.social.facebookHandle}
                  </a>
                </li>
              )}
            </ul>
          </div>

          <nav aria-label="Footer">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-bone/40">Studio</p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="font-body text-sm text-bone/70 transition-colors hover:text-blood">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-bone/40">Find Us</p>
            <ul className="mt-4 space-y-2.5 font-body text-sm text-bone/70">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-blood/70" />
                <span>
                  {contact.address.street}<br />
                  {contact.address.locality}, {contact.address.city}<br />
                  {contact.address.state} {contact.address.postalCode}
                </span>
              </li>
              <li>
                <a href={`https://wa.me/${contact.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blood">
                  WhatsApp {displayWhatsApp()}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="transition-colors hover:text-blood">
                  {contact.email}
                </a>
              </li>
              <li className="pt-2 text-[11px] uppercase tracking-[0.2em] text-bone/40">
                12 PM – 9 PM · Closed Friday
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-bone/10 pt-6 text-[11px] uppercase tracking-[0.2em] text-bone/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {contact.studioName}</p>
          <p className="font-mono">Kandivali West · Mumbai · Maharashtra</p>
        </div>
      </div>
    </footer>
  );
}
