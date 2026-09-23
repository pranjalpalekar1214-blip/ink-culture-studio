import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router";
import { InkStroke } from "@/components/art";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { Breadcrumbs, InkButton, Reveal } from "@/components/ui-kit";
import { articleSchema, breadcrumbSchema } from "@/config/seo";
import { getPost, relatedPosts } from "@/data/blog";
import { useJsonLd, useSeo } from "@/hooks/use-seo";
import { NotFound } from "./NotFound";

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug ?? "");

  useSeo(
    post
      ? {
          title: post.seoTitle ?? `${post.title} | Street Culture Tattoo Studio, Mumbai`,
          description: post.seoDescription ?? post.excerpt,
          path: `/blog/${post.slug}`,
          type: "article",
          publishedTime: post.dateISO,
          author: post.author,
          image: post.image,
        }
      : null,
  );
  useJsonLd(
    post
      ? [
          articleSchema({
            slug: post.slug,
            title: post.seoTitle ?? post.title,
            excerpt: post.seoDescription ?? post.excerpt,
            date: post.dateISO,
            author: post.author,
            image: post.image,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Journal", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]
      : null,
  );

  if (!post) return <NotFound />;

  const related = relatedPosts(post);

  return (
    <article className="pt-28 md:pt-40">
      <div className="mx-auto w-full max-w-3xl px-5 md:px-8">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Journal", path: "/blog" },
            { name: post.category },
          ]}
        />

        <Reveal>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-blood">{post.category}</p>
          <h1 className="mt-4 font-display text-3xl uppercase leading-[1.02] tracking-tight text-bone sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 font-body text-base leading-relaxed text-bone/65">{post.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 border-y border-bone/10 py-4 text-[11px] uppercase tracking-[0.18em] text-bone/45">
            <span className="text-bone/70">{post.author}</span>
            <span aria-hidden>·</span>
            <time dateTime={post.dateISO}>{post.date}</time>
            <span aria-hidden>·</span>
            <span>{post.readTime}</span>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mx-auto mt-10 w-full max-w-4xl px-5 md:px-8">
        <div className="aspect-[16/9] overflow-hidden border border-bone/12">
          <PlaceholderImage seed={post.slug} label={post.category} sub={post.title} />
        </div>
      </Reveal>

      <div className="mx-auto mt-12 w-full max-w-3xl px-5 md:px-8">
        {post.body.map((block, i) => {
          if (block.type === "h2") {
            return (
              <Reveal key={i}>
                <h2 className="mt-10 font-display text-2xl uppercase tracking-tight text-bone md:text-3xl">{block.text}</h2>
              </Reveal>
            );
          }
          if (block.type === "quote") {
            return (
              <Reveal key={i}>
                <blockquote className="my-10 border-l-2 border-blood pl-6">
                  <InkStroke className="mb-3 w-24 text-blood/70" />
                  <p className="font-marker text-xl leading-relaxed text-cream/85 md:text-2xl">{block.text}</p>
                </blockquote>
              </Reveal>
            );
          }
          return (
            <Reveal key={i}>
              <p className="mt-6 font-body text-base leading-[1.85] text-bone/75">{block.text}</p>
            </Reveal>
          );
        })}

        {/* footer CTA */}
        <Reveal className="mt-14 border border-bone/12 bg-white/[0.02] p-7 text-center md:p-10">
          <p className="font-display text-2xl uppercase tracking-tight text-bone">Reading about it? Come get one.</p>
          <p className="mx-auto mt-3 max-w-sm font-body text-sm text-bone/60">
            Consultations are free — bring the idea, we'll make the plan.
          </p>
          <div className="mt-6">
            <InkButton href="/book">Book Your Tattoo</InkButton>
          </div>
        </Reveal>

        <Reveal className="mt-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-bone/50 transition-colors hover:text-blood">
            <ArrowLeft className="size-4" /> Back to the Journal
          </Link>
        </Reveal>
      </div>

      {/* related */}
      <section className="mx-auto mt-16 w-full max-w-7xl border-t border-bone/10 px-5 py-16 md:px-8" aria-label="Related articles">
        <h2 className="font-display text-2xl uppercase tracking-tight text-bone md:text-3xl">Keep reading</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {related.map((p) => (
            <Link
              key={p.slug}
              to={`/blog/${p.slug}`}
              className="group flex h-full flex-col border border-bone/12 bg-white/[0.02] transition-colors hover:border-blood/50"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <PlaceholderImage seed={p.slug} label={p.category} className="transition-transform duration-700 group-hover:scale-[1.04]" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-blood/80">{p.category}</p>
                <h3 className="mt-2 font-display text-base uppercase leading-tight tracking-tight text-bone">{p.title}</h3>
                <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-bone/40">{p.date} · {p.readTime}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
