'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import HeroSection from "@/components/molecules/HeroSection";
import BeneficiosSection from "@/components/organisms/blog/blogId/BeneficiosSection";
import DescripcionSection from "@/components/organisms/blog/blogId/DescripcionSection";
import OpinionSection from "@/components/organisms/blog/blogId/OpinionSection";
import VideoSection from "@/components/organisms/blog/blogId/VideoSection";
import { useBlogs } from "@/hooks/useBlog";
import { Blog, imageBlogSlots } from "@/types/admin/blog";

interface BlogClientProps {
    initialBlog?: Blog | null;
}

export function BlogClient({ initialBlog }: BlogClientProps) {
    const params = useParams();
    const slug = typeof params?.slug === 'string' ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : null;

    const { getBlogBySlug, blog: hookBlog, isLoading, error } = useBlogs();

    // Usar el blog inicial si está disponible, de lo contrario usar el del hook
    const displayBlog = hookBlog || initialBlog;

    useEffect(() => {
        // Solo cargar si no tenemos el blog inicial o si el slug cambió
        if (slug && (!initialBlog || initialBlog.slug !== slug)) {
            getBlogBySlug(slug);
        }
    }, [slug, getBlogBySlug, initialBlog]);

    if (isLoading && !displayBlog) {
        return <div className="flex justify-center items-center h-screen">Cargando artículo...</div>;
    }

    if (error && !displayBlog) {
        return <div className="flex justify-center items-center h-screen">Artículo no encontrado</div>;
    }

    if (!displayBlog) {
        return <div className="flex justify-center items-center h-screen">Artículo no encontrado</div>;
    }

    const calculatedSlug = displayBlog.product?.slug || displayBlog.product?.name
        ?.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, '-');

    const imgHero = displayBlog.gallery.find(e => e.slot === imageBlogSlots.HERO);
    const imgDesc = displayBlog.gallery.find(e => e.slot === imageBlogSlots.DESC);
    const imgBene = displayBlog.gallery.find(e => e.slot === imageBlogSlots.BENEFITS);
    const imgTestimonial = displayBlog.gallery.find(e => e.slot === imageBlogSlots.TESTIMONIAL);

    return (
        <>
            <HeroSection
                url={imgHero?.url || ""}
                imageAlt={imgHero?.alt || displayBlog.title}
                imageTitle={imgHero?.title || displayBlog.title}
                text={displayBlog.hero_title || displayBlog.title}
                position="medio"
            />
            <DescripcionSection
                title={displayBlog.title}
                imageSrc={imgDesc?.url || ""}
                imageAlt={imgDesc?.alt || displayBlog.title}
                imageTitle={imgDesc?.title || displayBlog.title}
                description={displayBlog.description || ""}
            />
            <BeneficiosSection
                subtitle={displayBlog.cover_subtitle}
                imageSrc={imgBene?.url || ""}
                imageAlt={imgBene?.alt || displayBlog.title}
                imageTitle={imgBene?.title || displayBlog.title}
                benefits={displayBlog.benefits || []}
                productSlug={calculatedSlug}
            />
            {displayBlog.video_url &&
                <VideoSection
                    videoUrl={displayBlog.video_url}
                    videoSubtitle={displayBlog.video_subtitle}
                    videoDescription={displayBlog.video_description}
                />
            }
            <OpinionSection
                testimonial={displayBlog.testimonial}
                imageSrc={imgTestimonial?.url || ""}
                imageAlt={imgTestimonial?.alt || displayBlog.title}
                imageTitle={imgTestimonial?.title || displayBlog.title}
            />
        </>
    );
}
