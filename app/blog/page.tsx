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
  if (isLoading) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-[#23C1DE] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#203565] font-semibold animate-pulse">Cargando inspiración...</p>
      </div>
    );
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <main>
      <HeroSection />
      <BlogSection data={blogs} />
    </main>
  );
}
