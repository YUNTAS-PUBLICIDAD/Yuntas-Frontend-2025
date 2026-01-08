import BlogSection from "@/components/organisms/blog/BlogSection";
import HeroSection from "@/components/organisms/blog/HeroSection";
import { blogStaticData } from "@/data/blogStaticData";

import {BlogView} from "@/types/admin/blog";

async function getBlogs(): Promise<BlogView[]> {
  const res = await fetch( 
    "https://apiyuntas.yuntaspublicidad.com/api/blogs",
    { cache: "force-cache" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }
  const json = await res.json();
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
