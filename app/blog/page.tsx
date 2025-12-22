'use client'
import BlogSection from "@/components/organisms/blog/BlogSection";
import HeroSection from "@/components/organisms/blog/HeroSection";
import { useBlogs } from "@/hooks/useBlog";
import Loader from "@/components/atoms/Loader";
import { useEffect } from "react";
  export default  function   BlogPage() {
  const {getBlogs,blogs,isLoading}=useBlogs();
  useEffect(() => {
      getBlogs(6); 
    }, [getBlogs]);
  console.log("estos on los blogs",blogs);
  return (
    <main >
      <HeroSection/>
      {isLoading ? 
             <div className="flex flex-col items-center justify-center py-16 gap-4 w-full">
                  <Loader size="lg" />
                  <p className="text-[#203565] text-lg font-medium">Cargando datos...</p>
              </div>:
            <BlogSection data={blogs}/> }
    </main>
  );
}
