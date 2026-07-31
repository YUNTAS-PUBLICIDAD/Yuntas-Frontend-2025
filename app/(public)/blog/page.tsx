// 'use client'

import { Suspense } from "react";
import BlogSection from "@/components/organisms/blog/BlogSection";
import HeroSection from "@/components/organisms/blog/HeroSection";
import { getBlogsService } from "@/services/blogService";
import { Metadata } from "next";

export const revalidate = 0;
// import { useBlogs } from "@/hooks/useBlog";
// import { useEffect } from "react";
	export const metadata: Metadata = {
	title: "Blog de Letreros LED, Pantallas y Publicidad Visual en Lima | Yuntas",
  description:
    "Explora artículos sobre iluminación LED, señalización y tendencias en publicidad visual en Perú.",
  alternates: {
    canonical: "https://yuntaspublicidad.com/blog",
  },
  openGraph: {
    title: "Blog de Yuntas Publicidad",
    description:
      "Artículos sobre iluminación LED, señalización y publicidad visual.",
    url: "https://yuntaspublicidad.com/blog",
    siteName: "Yuntas Publicidad",
    locale: "es_PE",
    type: "website",
    images: [
      {
          url: "https://yuntaspublicidad.com/logo.svg",
          width: 1200,
          height: 630,
          alt: "Blog Yuntas Publicidad",
        },
    ]
  },
	}

export default async function BlogPage() {
	// const { blogs, getBlogs, isLoading, error } = useBlogs();

	// useEffect(() => {
	// 	getBlogs();
	// }, [getBlogs]);
	const result = await getBlogsService(10);

	if(!result.success){
	return <div>Error: {result.message}</div>
	}

	const blogs = result.data ?? [];

	const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  inLanguage: "es-PE",
  name: "Blog de Yuntas Publicidad",
  description:
    "Artículos sobre iluminación LED, señalización y publicidad visual en Perú.",
  url: "https://yuntaspublicidad.com/blog",
  blogPost: blogs.map((blog) => ({
    "@type": "BlogPosting",
    "@id": `https://yuntaspublicidad.com/blog/${blog.slug}`,
    headline: blog.title,
    url: `https://yuntaspublicidad.com/blog/${blog.slug}`,
    ...(blog.main_image?.url && { image: [blog.main_image.url] }),
    // datePublished: blog.created_at ? new Date(blog.created_at).toISOString() : undefined,
    inLanguage: "es-PE",
    author: {
      "@type": "Organization",
      name: "Yuntas Publicidad",
    },
    publisher: {
      "@type": "Organization",
      name: "Yuntas Publicidad",
      logo: {
        "@type": "ImageObject",
        url: "https://yuntaspublicidad.com/logo.svg",
      },
    },
  })),
};

	return (
		<>
		<script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}/>
			<HeroSection />
			<Suspense fallback={
				<div className="w-full min-h-[40vh] flex flex-col items-center justify-center gap-4 py-20">
					<div className="w-12 h-12 border-4 border-[#23C1DE] border-t-transparent rounded-full animate-spin"></div>
					<p className="text-[#203565] font-semibold animate-pulse">Cargando inspiración...</p>
				</div>
			}>
				<BlogSection blogs={blogs}/>
			</Suspense>

			{/*{isLoading ? (
				<div className="w-full min-h-[40vh] flex flex-col items-center justify-center gap-4 py-20">
					<div className="w-12 h-12 border-4 border-[#23C1DE] border-t-transparent rounded-full animate-spin"></div>
					<p className="text-[#203565] font-semibold animate-pulse">Cargando inspiración...</p>
				</div>
			) : error ? (
				<div className="w-full py-20 text-center text-red-500">Error: {error}</div>
			) : (
				<BlogSection blogs={blogs} />
			)}*/}
		</>
	);
}
