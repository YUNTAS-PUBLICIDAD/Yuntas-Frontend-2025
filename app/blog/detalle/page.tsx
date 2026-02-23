'use client';

import HeroPage from "@/components/molecules/HeroPage";
import DescripcionSection from "@/components/organisms/blog/blogId/DescripcionSection";
import BeneficiosSection from "@/components/organisms/blog/blogId/BeneficiosSection";
import OpinionSection from "@/components/organisms/blog/blogId/OpinionSection";
import VideoSection from "@/components/organisms/blog/blogId/VideoSection";
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from "react";
import { useBlogs } from "@/hooks/useBlog";
import { imageBlogSlots } from "@/types/admin/blog";

function BlogDetalleContent() {
	const searchParams = useSearchParams();
	const slug = searchParams.get('slug');
	const { getBlogBySlug, blog, isLoading, error } = useBlogs();

	useEffect(() => {
		if (slug) {
			getBlogBySlug(slug);
		}
	}, []);

	const imgHero = blog?.gallery.find(e => e.slot === imageBlogSlots.HERO);
	const imgDesc = blog?.gallery.find(e => e.slot === imageBlogSlots.DESC);
	const imgBene = blog?.gallery.find(e => e.slot === imageBlogSlots.BENEFITS);
	const imgTestimonial = blog?.gallery.find(e => e.slot === imageBlogSlots.TESTIMONIAL);

	if (isLoading) {
		return <div className="flex justify-center items-center h-screen">Cargando blog...</div>;
	}

	if (error) {
		return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
	}

	if (!blog) {
		return <div className="flex justify-center items-center h-screen">No se encontró el blog.</div>;
	}
	return (
		<>
			<HeroPage
				url={imgHero?.url || ""}
				imageAlt={imgHero?.alt || blog?.title}
				imageTitle={imgHero?.title || blog?.title}
				text={blog.hero_title || blog.title}
				position="medio"
			/>
			<DescripcionSection
				title={blog.title}
				imageSrc={imgDesc?.url || ""}
				imageAlt={imgDesc?.alt || blog.title}
				imageTitle={imgDesc?.title || blog.title}
				description={blog.description || ""}
			/>
			<BeneficiosSection
				subtitle={blog.cover_subtitle}
				imageSrc={imgBene?.url || ""}
				imageAlt={imgBene?.alt || blog.title}
				imageTitle={imgBene?.title || blog.title}
				benefits={blog.benefits || []}
			/>
			<OpinionSection
				testimonial={blog.testimonial}
				imageSrc={imgTestimonial?.url || ""}
				imageAlt={imgTestimonial?.alt || blog.title}
				imageTitle={imgTestimonial?.title || blog.title}
			/>
			{blog.video_url &&
				<VideoSection
					videoUrl={blog.video_url}
				/>
			}
		</>
	);
}


export default function BlogDetallePage() {
	return (
		<Suspense fallback={<div>Cargando blog...</div>}>
			<BlogDetalleContent />
		</Suspense>
	)
}
