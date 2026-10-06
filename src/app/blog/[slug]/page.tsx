import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { metadataFromPage } from "@/next/metadata";
import { pageMeta } from "@/config/seo";
import { blogPosts, getPost } from "@/data/blog";
import ClientRouteBoundary from "@/next/ClientRouteBoundary";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  return post ? metadataFromPage({ ...pageMeta.blog, title: `${post.title} | ${pageMeta.blog.siteName}`, description: post.excerpt, canonical: `https://streetculture.tattoo/blog/${post.slug}` }) : metadataFromPage(pageMeta.blog);
}

export default async function BlogPostRoute({ params }: PageProps) {
  const { slug } = await params;
  if (!getPost(slug)) notFound();
  return <ClientRouteBoundary route="blog" />;
}
