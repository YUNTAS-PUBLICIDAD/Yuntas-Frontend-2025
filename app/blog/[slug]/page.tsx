import HeroPage from "@/components/molecules/HeroPage";
import DescripcionSection from "@/components/organisms/blog/blogId/DescripcionSection";
import BeneficiosSection from "@/components/organisms/blog/blogId/BeneficiosSection";
import OpinionSection from "@/components/organisms/blog/blogId/OpinionSection";
import VideoSection from "@/components/organisms/blog/blogId/VideoSection";
import { blogStaticData } from "@/data/blogStaticData";

export function generateStaticParams() {
  return blogStaticData.map(post => ({
    slug: post.slug
  }));
}

export default function BlogDetallePage({ params }: { params: { slug: string } }) {
  const blog = blogStaticData.find(post => post.slug === params.slug);

  if (!blog) return <div>Post no encontrado</div>;

  return (
    <main>
      <HeroPage
        url={blog.main_image.url}
        text={blog.title}
        position="medio"
      />
      <DescripcionSection data={blog} />
      <BeneficiosSection data={blog} />
      <OpinionSection data={blog} />
      {blog.video_url && <VideoSection data={blog} />}
    </main>
  );
}
