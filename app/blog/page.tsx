import BlogSection from "@/components/organisms/blog/BlogSection";
import HeroSection from "@/components/organisms/blog/HeroSection";
import { blogStaticData } from "@/data/blogStaticData";

import {BlogView} from "@/types/admin/blog";

async function getBlogs(): Promise<BlogView[]> {
  const res = await fetch( 
    //para traer todos los blogs disponibles
    "https://apiyuntas.yuntaspublicidad.com/api/blogs?per_page=100",
    { cache: "force-cache" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }
  const json = await res.json();
  // Retornamos el array de blogs desde data.data
  return json.data.data;
}

export default async function BlogPage() {
  const blogs = await getBlogs();
  return (
    <main>
      <HeroSection />
      <BlogSection data={blogs} />
    </main>
  );
}
