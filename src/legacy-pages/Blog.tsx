import { useState } from "react";
import { Link } from "react-router";
import { PageHero, Reveal } from "@/components/ui-kit";
import { blogCategories, blogPosts, type BlogCategory } from "@/data/blog";
import { cn } from "@/lib/utils";
import { useSeo, useJsonLd } from "@/hooks/use-seo";
import { breadcrumbSchema, pageMeta } from "@/config/seo";
import { PlaceholderImage } from "@/components/PlaceholderImage";

export default function Blog() {
  useSeo(pageMeta.blog);
  useJsonLd(
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Journal", path: "/blog" },
    ]),
  );

  const [cat, setCat] = useState<"All" | BlogCategory>("All");
  const posts = cat === "All" ? blogPosts : blogPosts.filter((p) => p.category === cat);
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        index="03"
        kicker="The Journal"
        title={<>Notes from<br />the chair.</>}
        lead="Guides, aftercare, style breakdowns and stories from inside Street Culture — written by the people holding the machines."
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          {/* category filter */}
          <div className="-mx-5 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0">
            <div className="flex w-max gap-2 md:flex-wrap md:w-auto">
              {(["All", ...blogCategories] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  aria-pressed={cat === c}
                  className={cn(
                    "whitespace-nowrap border px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors",
                    cat === c ? "border-blood bg-blood text-ink" : "border-bone/20 text-bone/60 hover:border-bone/50 hover:text-bone",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {featured && (
            <Reveal className="mt-10">
              <Link
                to={`/blog/${featured.slug}`}
                className="group grid overflow-hidden border border-bone/12 bg-white/[0.02] transition-colors hover:border-blood/50 md:grid-cols-2"
              >
                <div className="aspect-[16/10] md:aspect-auto md:min-h-[320px]">
                  <PlaceholderImage seed={featured.slug} label={featured.category} sub={featured.readTime} className="transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <div className="flex flex-col justify-center p-7 md:p-10">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-blood">Latest · {featured.category}</p>
                  <h2 className="mt-3 font-display text-2xl uppercase leading-tight tracking-tight text-bone md:text-4xl">
                    {featured.title}
                  </h2>
                  <p className="mt-4 font-body text-sm leading-relaxed text-bone/60 md:text-base">{featured.excerpt}</p>
                  <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-bone/45">
                    {featured.author} · {featured.date} · {featured.readTime}
                  </p>
                </div>
              </Link>
            </Reveal>
          )}

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.06}>
                <Link
                  to={`/blog/${p.slug}`}
                  className="group flex h-full flex-col border border-bone/12 bg-white/[0.02] transition-colors hover:border-blood/50"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <PlaceholderImage seed={p.slug} label={p.category} className="transition-transform duration-700 group-hover:scale-[1.04]" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-blood/80">{p.category}</p>
                    <h3 className="mt-2 font-display text-lg uppercase leading-tight tracking-tight text-bone">{p.title}</h3>
                    <p className="mt-2 flex-1 font-body text-[13px] leading-relaxed text-bone/55">{p.excerpt}</p>
                    <p className="mt-4 border-t border-bone/10 pt-3 text-[10px] uppercase tracking-[0.18em] text-bone/40">
                      {p.date} · {p.readTime}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
