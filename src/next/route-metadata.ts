import { articleSchema, breadcrumbSchema, faqSchema, localBusinessSchema, organizationSchema, pageMeta, personSchema } from "@/config/seo";
import { artists } from "@/data/artists";
import { blogPosts } from "@/data/blog";

export const staticMetadata = pageMeta;

export function homeJsonLd() {
  return [organizationSchema(), localBusinessSchema(), breadcrumbSchema([{ name: "Home", path: "/" }])];
}

export function aboutJsonLd() {
  return [organizationSchema(), localBusinessSchema(), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])];
}

export function artistJsonLd(id: string) {
  const artist = artists.find((item) => item.id === id);
  if (!artist) return [];
  return [personSchema({ name: artist.name, role: artist.role, bio: artist.bio, slug: artist.id, image: artist.image }), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Artists", path: "/artists" }, { name: artist.name, path: `/artists/${artist.id}` }])];
}

export function blogJsonLd(slug: string) {
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) return [];
  return [articleSchema(post), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Journal", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }])];
}

export function breadcrumbJsonLd(name: string, path: string) {
  return breadcrumbSchema([{ name: "Home", path: "/" }, { name, path }]);
}
