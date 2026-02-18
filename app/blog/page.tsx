'use client'
import BlogSection from "@/components/organisms/blog/BlogSection";
import HeroSection from "@/components/organisms/blog/HeroSection";
import { useBlogs } from "@/hooks/useBlog";
import { useEffect } from "react";

export default function BlogPage() {
  const { blogs, getBlogs, isLoading, error } = useBlogs();

  useEffect(() => {
    getBlogs();
  }, [getBlogs]);

  return (
    <main>

      <HeroSection />

      {isLoading ? (
        <div className="w-full min-h-[40vh] flex flex-col items-center justify-center gap-4 py-20">
          <div className="w-12 h-12 border-4 border-[#23C1DE] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#203565] font-semibold animate-pulse">Cargando inspiración...</p>
        </div>
      ) : error ? (
        <div className="w-full py-20 text-center text-red-500">Error: {error}</div>
      ) : (
        <BlogSection data={blogs} />
      )}
    </main>
  );
}