'use client';

import HeroPage from "@/components/molecules/HeroPage";
import DescripcionSection from "@/components/organisms/blog/blogId/DescripcionSection";
import BeneficiosSection from "@/components/organisms/blog/blogId/BeneficiosSection";
import OpinionSection from "@/components/organisms/blog/blogId/OpinionSection";
import VideoSection from "@/components/organisms/blog/blogId/VideoSection";
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from "react";
import { useBlogs } from "@/hooks/useBlog";

function BlogDetalleContent() {
	const searchParams = useSearchParams();
	const slug = searchParams.get('slug');
	const { getBlogBySlug, blog, isLoading, error } = useBlogs();

	useEffect(() => {
		if (slug) {
			getBlogBySlug(slug);
		}
	}, []);

	const imgDesc = blog?.gallery.filter(e => e.slot === "Hero")[0];
	const imgUrl = imgDesc?.url || blog?.main_image?.url || "";
	const imgAlt = imgDesc?.alt || blog?.main_image?.alt || blog?.title;
	const imgTitle = imgDesc?.title || blog?.main_image?.title || blog?.title;

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
				url={imgUrl}
				imageAlt={imgAlt}
				imageTitle={imgTitle}
				text={blog.hero_title || blog.title}
				position="medio"
			/>
			<DescripcionSection blog={blog} />
			<BeneficiosSection blog={blog} />
			<OpinionSection blog={blog} />
			{blog.video_url && <VideoSection blog={blog} />}
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
