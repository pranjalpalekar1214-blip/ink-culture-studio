import { Clock, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { InkButton, PageHero, Reveal } from "@/components/ui-kit";
import { breadcrumbSchema, localBusinessSchema, pageMeta } from "@/config/seo";
import { contact } from "@/config/contact";
import { displayWhatsApp } from "@/lib/whatsapp";
import { useJsonLd, useSeo } from "@/hooks/use-seo";

export default function Contact() {
  useSeo(pageMeta.contact);
  useJsonLd([
    localBusinessSchema(),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact" },
    ]),
  ]);

  const a = contact.address;

  return (
    <>
      <PageHero
        index="06"
        kicker="Find Us"
        title={<>Come through.</>}
        lead="Kandivali West, Mumbai — minutes from the station, impossible to mistake for anything but a tattoo studio."
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-2">
          {/* details */}
          <div className="space-y-8">
            <Reveal>
              <div className="border border-bone/12 bg-white/[0.02] p-7">
                <h2 className="font-display text-xl uppercase tracking-tight text-bone">{contact.studioName}</h2>
                <ul className="mt-5 space-y-4 font-body text-sm text-bone/70">
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-blood" />
                    <span>
                      {a.street}<br />
                      {a.areas.join(", ")}<br />
                      {a.locality}, {a.city}<br />
                      {a.state} {a.postalCode}
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="size-4 shrink-0 text-blood" />
                    <a href={`https://wa.me/${contact.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-bone">
                      {displayWhatsApp()} (WhatsApp preferred)
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="size-4 shrink-0 text-blood" />
                    <a href={`mailto:${contact.email}`} className="transition-colors hover:text-bone">{contact.email}</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <MessageCircle className="size-4 shrink-0 text-blood" />
                    <a href={contact.social.instagram} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-bone">
                      Instagram — {contact.social.instagramHandle}
                    </a>
                  </li>
                </ul>
                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                  {contact.googleRating > 0 && (
                    <span className="inline-flex items-center gap-1.5 font-body text-sm text-bone/80">
                      <span aria-hidden className="text-blood">★★★★★</span>
                      <span className="font-semibold text-bone">{contact.googleRating.toFixed(2)}</span>
                      <span className="text-bone/60">on Google</span>
                    </span>
                  )}
                  {contact.googleReviewUrl && (
                    <a href={contact.googleReviewUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] uppercase tracking-[0.2em] text-blood underline underline-offset-4">
                      Leave us a Google review
                    </a>
                  )}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="border border-bone/12 bg-white/[0.02] p-7">
                <h3 className="flex items-center gap-2 font-display text-lg uppercase tracking-tight text-bone">
                  <Clock className="size-4 text-blood" /> Opening Hours
                </h3>
                <ul className="mt-4 space-y-2 font-body text-sm">
                  {contact.openingHours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-4 border-b border-bone/8 pb-2 text-bone/65 last:border-0">
                      <span>{h.day}</span>
                      <span className={h.hours === "Closed" ? "text-blood" : "text-bone/85"}>{h.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex flex-wrap gap-3">
                <InkButton href={contact.directionsUrl} external>
                  <Navigation className="size-4" /> Get Directions
                </InkButton>
                <InkButton href={`https://wa.me/${contact.whatsappNumber}`} external variant="outline">
                  WhatsApp Us
                </InkButton>
                <InkButton href="/book" variant="outline">Book Now</InkButton>
              </div>
            </Reveal>
          </div>

          {/* map */}
          <Reveal delay={0.1}>
            <div className="flex h-full min-h-[420px] flex-col border border-bone/12 bg-white/[0.02]">
              <iframe
                title={`Map — ${contact.studioName}, ${a.locality}, ${a.city}`}
                src={contact.mapEmbedUrl}
                className="h-full w-full flex-1 grayscale invert-[0.9] contrast-[0.9]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <p className="border-t border-bone/10 px-5 py-4 text-[11px] uppercase tracking-[0.2em] text-bone/45">
                {a.locality} · {a.city} — [replace embed URL in /src/config/contact.ts with the studio's exact pin]
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* getting here */}
      <section className="border-t border-bone/10 py-16 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { t: "By Train", d: "Western Line to Kandivali station, west side. A short auto-rickshaw ride or a walk from the station exit." },
              { t: "By Road", d: "Right off S.V. Road in Kandivali West — easy drop-off point, parking nearby." },
              { t: "From the Airport", d: "Roughly 40–60 minutes depending on traffic, via the western express highway corridor." },
            ].map((x, i) => (
              <Reveal key={x.t} delay={i * 0.07}>
                <div className="h-full border border-bone/12 p-6">
                  <h3 className="font-display text-lg uppercase tracking-tight text-bone">{x.t}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-bone/60">{x.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
