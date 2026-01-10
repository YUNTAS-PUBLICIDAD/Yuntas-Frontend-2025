import HeroPage from "@/components/molecules/HeroPage";
import DescripcionSection from "@/components/organisms/blog/blogId/DescripcionSection";
import BeneficiosSection from "@/components/organisms/blog/blogId/BeneficiosSection";
import OpinionSection from "@/components/organisms/blog/blogId/OpinionSection";
import VideoSection from "@/components/organisms/blog/blogId/VideoSection";
import { blogStaticData } from "@/data/blogStaticData";

import { BlogView } from "@/types/admin/blog";

async function getBlogs(): Promise<BlogView[]> {
  const res = await fetch(
    //  per_page=100 para obtener todos los blogs y generar sus rutas
    "https://apiyuntas.yuntaspublicidad.com/api/blogs?per_page=100",
    { cache: "force-cache" }
  );

  const json = await res.json();
  return json.data.data;
}

async function getBlogBySlug(slug: string): Promise<BlogView | null> {
  const res = await fetch(
    `https://apiyuntas.yuntaspublicidad.com/api/blogs/${slug}`,
    { cache: "force-cache" }
  );

  if (!res.ok) {
    return null;
  }

  const json = await res.json();
  return json.data;
}

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map(blog => ({
    slug: blog.slug
  }));
}
export default async function BlogDetallePage({
  params,
}: { params: { slug: string} ;
}) {
  const blog =  await getBlogBySlug(params.slug);
  
  if (!blog) {
    return <div>Post no encontrado</div>;
}

return (
    <main>
      <HeroPage
      url={blog.main_image?.url}
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


/* export function generateStaticParams() {
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

*/

