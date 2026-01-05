'use client'
import HeroPage from "@/components/molecules/HeroPage";
import DescripcionSection from "@/components/organisms/blog/blogId/DescripcionSection";
import BeneficiosSection from "@/components/organisms/blog/blogId/BeneficiosSection";
import OpinionSection from "@/components/organisms/blog/blogId/OpinionSection";
import VideoSection from "@/components/organisms/blog/blogId/VideoSection";
import { useBlogs } from "@/hooks/useBlog";
import { useEffect } from "react";
import Loader from "@/components/atoms/Loader";
import { getImg } from "@/utils/getImg";
export default function BlogDetallePage({ params }: { params: { slug: string } }) {
  
  const {blog,getBlogBySlug,isLoading}=useBlogs()
  useEffect(() => {
    getBlogBySlug(params.slug);
    
  }, [params.slug]);
  if (!blog) return null;
  console.log(blog)
  return (
    <main className="">
      {isLoading ? <Loader size="lg"/> :
        <>
          <HeroPage url={getImg(blog?.main_image?.url)} text={blog?.title || "Sin titulo"} position="medio"/>
          <DescripcionSection data={blog}/>
          <BeneficiosSection data={blog}/>
          <OpinionSection data={blog}/>
          <VideoSection data={blog}/>
        </>
      }
    </main>
  );
}
