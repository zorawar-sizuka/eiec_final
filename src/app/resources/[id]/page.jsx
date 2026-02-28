import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

export const revalidate = 1800; // 30 mins

export async function generateStaticParams() {
  try {
    const blogs = await prisma.blog.findMany({ select: { id: true } });
    return blogs.map((b) => ({ id: String(b.id) }));
  } catch (err) {
    console.error("Build step static params error (DB sleeping):", err);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params; 
  const numId = parseInt(id, 10);
  if (isNaN(numId)) return {};

  let blog = null;
  try {
    blog = await prisma.blog.findUnique({ where: { id: numId } });
  } catch (err) {
    console.error("generateMetadata error:", err);
  }
  
  if (!blog) return {};

  return {
    title: blog.title,
    description: blog.description,
    alternates: { canonical: `/resources/${blog.id}` },
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: `${siteUrl}/resources/${blog.id}`,
      images: blog.imageUrl
        ? [{ url: blog.imageUrl, width: 1200, height: 630, alt: blog.title }]
        : [{ url: "/og.jpg", width: 1200, height: 630, alt: blog.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [blog.imageUrl || "/og.jpg"],
    },
  };
}

export default async function ResourceArticlePage({ params }) {
  const { id } = await params;
  const numId = parseInt(id, 10);
  if (isNaN(numId)) return notFound();

  let blog = null;
  try {
    blog = await prisma.blog.findUnique({ where: { id: numId } });
  } catch (e) {
    console.error("Error fetching blog for article page:", e);
  }

  if (!blog) return notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.description,
    image: blog.imageUrl ? blog.imageUrl : undefined,
    mainEntityOfPage: `${siteUrl}/resources/${blog.id}`,
    author: {
      "@type": "Organization",
      name: "Your Consultancy Name",
    },
    publisher: {
      "@type": "Organization",
      name: "Your Consultancy Name",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
  };

  return (
    <article className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-3xl mx-auto px-6 pt-28 pb-16 border-t border-slate-100">
        <Link href="/resources" className="text-sm font-bold text-slate-500 hover:text-slate-900 border px-4 py-2 rounded-full inline-block transition-colors hover:border-slate-300">
          ← Back to Resources
        </Link>
        <div className="mt-8 mb-4 flex flex-wrap gap-2">
           {blog.tags.map((tag, t) => (
             <span 
               key={t} 
               className="px-3 py-1 text-[11px] font-bold rounded-full uppercase tracking-widest bg-blue-50 text-blue-700"
             >
               {tag}
             </span>
           ))}
        </div>

        <h1 className="mt-2 text-3xl md:text-5xl font-serif text-slate-900 leading-tight">
          {blog.title}
        </h1>

        <p className="mt-6 text-lg text-slate-500 font-light">
          {blog.description}
        </p>

        {blog.imageUrl && (
          <div className="relative w-full h-72 md:h-[480px] rounded-2xl overflow-hidden mt-10 bg-slate-100 border border-slate-100 shadow-sm">
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        )}

        <div
          className="prose prose-lg prose-slate prose-a:text-blue-600 prose-headings:font-serif prose-headings:text-slate-900 mx-auto font-serif mt-12"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </article>
  );
}
