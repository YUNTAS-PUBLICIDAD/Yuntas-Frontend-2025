
import DescripcionSection from "@/components/organisms/blog/blogId/DescripcionSection";
import BeneficiosSection from "@/components/organisms/blog/blogId/BeneficiosSection";
import OpinionSection from "@/components/organisms/blog/blogId/OpinionSection";
import VideoSection from "@/components/organisms/blog/blogId/VideoSection";
import { notFound } from 'next/navigation';
import { Blog, imageBlogSlots } from "@/types/admin/blog";
import { getBlogBySlugService, getBlogsService } from "@/services/blogService";
import HeroSection from "@/components/molecules/HeroSection";

export async function generateStaticParams(){
  const res = await getBlogsService(100);
  if(!res.success || !res.data) return [];
  return res.data.map((blog) => ({
    slug: blog.slug
  }));
}

async function getBlogBySlug(slug: string): Promise<Blog|null>{
  const response = await getBlogBySlugService(slug);

  if(!response.success || !response.data) return null;

  return response.data;
}
// export async function getBlogBySlug(slug: string){
//   const baseUrl = process.env.NEXT_PUBLIC_API_URL;
//   if(!baseUrl){
//     throw new Error("API URL no definida");
//   }
//   const res = await fetch(`${baseUrl}/blogs/${slug}`, {
//     next: {revalidate: 60}
//   })

//   if(!res.ok) return null;
//   // const data = await res.json();
//   // return data;
//   const json = await res.json();
//   console.log(json);
//   return json.data;
// }

type PageProps = {
  params: {
    slug: string
  }
}

 export default async function Page({params}: PageProps) {
   if(!params?.slug){
     notFound();
   }
   const blog = await getBlogBySlug(params.slug);
   if(!blog) {
     notFound();
   }

    const calculatedSlug = blog.product?.slug || blog.product?.name
        ?.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, '-');

    const imgHero = blog.gallery.find(e => e.slot === imageBlogSlots.HERO);
    const imgDesc = blog.gallery.find(e => e.slot === imageBlogSlots.DESC);
    const imgBene = blog.gallery.find(e => e.slot === imageBlogSlots.BENEFITS);
    const imgTestimonial = blog.gallery.find(e => e.slot === imageBlogSlots.TESTIMONIAL);

    return (
        <>
            <HeroSection
                url={imgHero?.url || ""}
                imageAlt={imgHero?.alt || blog.title}
                imageTitle={imgHero?.title || blog.title}
                text={blog.hero_title || blog.title}
                position="medio"
            />
            <DescripcionSection
                title={blog.title}
                imageSrc={imgDesc?.url || ""}
                imageAlt={imgDesc?.alt || blog.title}
                imageTitle={imgDesc?.title || blog.title}
                description={blog.description || ""}
            />
            <BeneficiosSection
                subtitle={blog.cover_subtitle}
                imageSrc={imgBene?.url || ""}
                imageAlt={imgBene?.alt || blog.title}
                imageTitle={imgBene?.title || blog.title}
                benefits={blog.benefits || []}
                productSlug={calculatedSlug}
            />
			{blog.video_url &&
                <VideoSection
                    videoUrl={blog.video_url}
                />
            }
            <OpinionSection
                testimonial={blog.testimonial}
                imageSrc={imgTestimonial?.url || ""}
                imageAlt={imgTestimonial?.alt || blog.title}
                imageTitle={imgTestimonial?.title || blog.title}
            />

        </>
    );
}
