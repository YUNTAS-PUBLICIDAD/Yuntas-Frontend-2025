'use client'
import BlogSection from "@/components/organisms/blog/BlogSection";
import HeroSection from "@/components/organisms/blog/HeroSection";
import { useBlogs } from "@/hooks/useBlog";
import { useEffect } from "react";


export default  function BlogPage() {
  const { blogs, getBlogs, isLoading, error} = useBlogs();
  useEffect(() => {
    getBlogs();
  }, [getBlogs]);
  if (isLoading) {
    return <div>Cargando...</div>;
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
