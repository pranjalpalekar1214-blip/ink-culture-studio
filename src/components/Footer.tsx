import { Instagram, MapPin } from "lucide-react";
import { Link } from "react-router";
import { contact } from "@/config/contact";
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
            <p className="font-display text-4xl uppercase leading-[0.95] tracking-tight text-bone sm:text-5xl">
              Ink is<br />
              <span className="text-blood">culture.</span>
            </p>
            <p className="mt-5 max-w-sm font-body text-sm leading-relaxed text-bone/60">
              {contact.studioName} — custom tattoos & professional training in {contact.address.locality}, {contact.address.city}.
            </p>
            <div className="mt-6 flex gap-3">
              <InkButton href="/book" size="sm">
                Book Now
              </InkButton>
              <a
                href={contact.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex size-10 items-center justify-center border border-bone/20 text-bone/70 transition-colors hover:border-blood hover:text-blood"
              >
                <Instagram className="size-4" />
              </a>
            </div>
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
                <span>{contact.address.locality}, {contact.address.city}<br />{contact.address.state}</span>
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
                {contact.openingHours[0].hours.split("–")[0]?.trim()} – late · Tue–Sun
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
