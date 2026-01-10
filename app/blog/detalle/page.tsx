'use client';
import HeroPage from "@/components/molecules/HeroPage";
import DescripcionSection from "@/components/organisms/blog/blogId/DescripcionSection";
import BeneficiosSection from "@/components/organisms/blog/blogId/BeneficiosSection";
import OpinionSection from "@/components/organisms/blog/blogId/OpinionSection";
import VideoSection from "@/components/organisms/blog/blogId/VideoSection";
import { useSearchParams } from 'next/navigation';
import { useEffect } from "react";
import { useBlogs } from "@/hooks/useBlog";
import { getImg } from "@/utils/getImg";
export default function BlogDetallePage() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  const { getBlogBySlug, blog, isLoading, error } = useBlogs();

  useEffect(() => {
    if (slug) {
      getBlogBySlug(slug);
    }
  }, []);
  console.log(blog);
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Cargando blog...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
  }

  if (!blog) {
    return <div className="flex justify-center items-center h-screen">No se encontró el blog.</div>;
  }
  console.log(blog.main_image?.url)
  return (
    <main>
      <HeroPage
        url={getImg(blog.main_image?.url)}
        text={blog.product?.name || "Blog"}
        position="medio"
      />
      <DescripcionSection data={blog} />
      <BeneficiosSection data={blog} />
      <OpinionSection data={blog} />
      {blog.video_url && <VideoSection data={blog} />}
    </main>
  );
}