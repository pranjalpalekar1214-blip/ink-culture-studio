import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Facebook, Instagram, MessageCircle } from "lucide-react";
import { contact } from "@/config/contact";
import { displayWhatsApp } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/**
 * Site-wide social dock, fixed to the bottom-left. Collapsed to a single
 * brand-yellow WhatsApp tab; the rest slide out on hover or focus, and stay
 * open until the pointer leaves. Mounted once in SiteLayout, so its open
 * state survives route changes instead of resetting per page.
 */
export function SocialDock() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  const { instagramStudio, instagramAcademy, facebookHandle, facebook } =
    contact.social;

  const items = [
    {
      key: "wa",
      href: `https://wa.me/${contact.whatsappNumber}`,
      label: `WhatsApp ${displayWhatsApp()}`,
      Icon: MessageCircle,
      accent: "hover:bg-[#25D366] hover:text-ink",
      always: true,
    },
    {
      key: "ig-studio",
      href: instagramStudio.url,
      label: instagramStudio.handle,
      Icon: Instagram,
      accent: "hover:bg-blood hover:text-ink",
      always: true,
    },
    {
      key: "ig-academy",
      href: instagramAcademy.url,
      label: instagramAcademy.handle,
      Icon: Instagram,
      accent: "hover:bg-blood hover:text-ink",
      always: true,
    },
    {
      key: "fb",
      href: facebook || `https://facebook.com/${facebookHandle}`,
      label: facebookHandle ? `Facebook ${facebookHandle}` : "Facebook",
      Icon: Facebook,
      accent: "hover:bg-blood hover:text-ink",
      always: Boolean(facebook || facebookHandle),
    },
  ].filter((i) => i.always);

  return (
    <div
      className="fixed bottom-4 left-4 z-[70] flex items-end sm:bottom-6 sm:left-6"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <ul className="flex flex-row-reverse items-center gap-2">
        {/* collapsed handle — always visible, the primary CTA */}
        <li>
          <motion.a
            href={`https://wa.me/${contact.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={reduce ? undefined : { scale: 0.94 }}
            className={cn(
              "relative flex size-12 items-center justify-center border border-blood bg-blood text-ink",
              "transition-colors hover:bg-[#25D366] hover:border-[#25D366]",
            )}
            style={{ zIndex: 10 }}
          >
            <MessageCircle className="size-5" />
            <span className="sr-only">WhatsApp us — {displayWhatsApp()}</span>
            {!open && (
              <motion.span
                className="pointer-events-none absolute right-full mr-3 whitespace-nowrap border border-blood/40 bg-ink px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-blood"
                initial={reduce ? false : { opacity: 0, x: 8 }}
                animate={reduce ? {} : { opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
              >
                Chat with us
              </motion.span>
            )}
          </motion.a>
        </li>

        <AnimatePresence initial={false}>
          {open &&
            items
              .filter((i) => i.key !== "wa")
              .map((i) => (
                <motion.li
                  key={i.key}
                  layout
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: -14, scale: 0.85 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: -14, scale: 0.85 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={i.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "group relative flex size-12 items-center justify-center border border-blood/40 bg-ink/95 text-bone backdrop-blur-md",
                      "transition-colors",
                      i.accent,
                    )}
                  >
                    <i.Icon className="size-5" />
                    <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap border border-blood/40 bg-ink px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-bone opacity-0 transition-opacity group-hover:opacity-100">
                      {i.label}
                    </span>
                    <span className="sr-only">{i.label}</span>
                  </a>
                </motion.li>
              ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

