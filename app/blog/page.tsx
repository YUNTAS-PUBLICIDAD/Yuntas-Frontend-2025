import BlogSection from "@/components/organisms/blog/BlogSection";
import HeroSection from "@/components/organisms/blog/HeroSection";
import { BlogData } from "@/data/blog/blogData";
export default async function   BlogPage() {
  const response = await BlogData();
  const blogs = response?.data?.data ?? [];
  console.log(blogs);
  return (
    <main >
      <HeroSection/>
      <BlogSection data={blogs}/>
    </main>
  );
}
