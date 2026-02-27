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
    }, [slug, getBlogBySlug]);

    // 1. PRIMERO: ¿Está cargando?
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Cargando blog...</div>;
    }

    // 2. SEGUNDO: ¿Hubo error?
    if (error) {
        return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
    }

    // 3. TERCERO: ¿Llegó vacío?
    if (!blog) {
        return <div className="flex justify-center items-center h-screen">No se encontró el blog.</div>;
    }

    // --- A partir de aquí, TypeScript sabe que 'blog' existe 100% ---
    
    const calculatedSlug = blog.product?.slug || blog.product?.name
        ?.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, '-');

    const imgHero = blog.gallery.find(e => e.slot === imageBlogSlots.HERO);
    const imgDesc = blog.gallery.find(e => e.slot === imageBlogSlots.DESC);
    const imgBene = blog.gallery.find(e => e.slot === imageBlogSlots.BENEFITS);
    const imgTestimonial = blog.gallery.find(e => e.slot === imageBlogSlots.TESTIMONIAL);

    return (
        <>
            <HeroPage
                url={imgHero?.url || ""}
                imageAlt={imgHero?.alt || blog.title}
                imageTitle={imgHero?.title || blog.title}
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
                productSlug={calculatedSlug} 
            />
			{blog.video_url &&
                <VideoSection
                    videoUrl={blog.video_url}
                />
            }
            <OpinionSection
                testimonial={blog.testimonial}
                imageSrc={imgTestimonial?.url || ""}
                imageAlt={imgTestimonial?.alt || blog.title}
                imageTitle={imgTestimonial?.title || blog.title}
            />
            
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