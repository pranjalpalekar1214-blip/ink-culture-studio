import { notFound } from "next/navigation";
import { blogPosts, getPost } from "@/data/blog";
import ClientRouteBoundary from "@/next/ClientRouteBoundary";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostRoute({ params }: PageProps) {
  const { slug } = await params;
  if (!getPost(slug)) notFound();
  return <ClientRouteBoundary route="blog" />;
}
