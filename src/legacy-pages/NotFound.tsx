import { SnakeMotif, StarMotif } from "@/components/art";
import { InkButton } from "@/components/ui-kit";
import { Reveal } from "@/components/ui-kit";
import { useSeo } from "@/hooks/use-seo";

export function NotFound() {
  useSeo({
    title: "404 — Page Not Found | Street Culture Tattoo Studio",
    description: "This page slipped out of the studio. Head back to Street Culture — tattoo studio & academy in Kandivali West, Mumbai.",
    path: "/404",
  });

  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 text-center">
      <div className="pointer-events-none absolute inset-0 grain opacity-50" aria-hidden />
      <StarMotif className="h-8 w-8 text-blood/60" aria-hidden />
      <Reveal>
        <h1 className="mt-6 font-display text-[26vw] font-black uppercase leading-none tracking-tight text-bone sm:text-[10rem]">
          404
        </h1>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-2 font-marker text-2xl text-cream/70">this page never made it to skin</p>
        <p className="mx-auto mt-4 max-w-sm font-body text-sm leading-relaxed text-bone/55">
          The link you followed doesn't exist — but the studio does, and so does your next tattoo.
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <InkButton href="/">Back Home</InkButton>
          <InkButton href="/book" variant="outline">Book Your Tattoo</InkButton>
        </div>
      </Reveal>
      <SnakeMotif className="pointer-events-none mt-10 h-20 w-20 text-bone/15" aria-hidden />
    </main>
  );
}

export default NotFound;
