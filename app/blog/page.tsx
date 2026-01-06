import BlogSection from "@/components/organisms/blog/BlogSection";
import HeroSection from "@/components/organisms/blog/HeroSection";
import { blogStaticData } from "@/data/blogStaticData";

export default function BlogPage() {
  return (
    <main>
      <HeroSection />
      <BlogSection data={blogStaticData} />
    </main>
  );
}
