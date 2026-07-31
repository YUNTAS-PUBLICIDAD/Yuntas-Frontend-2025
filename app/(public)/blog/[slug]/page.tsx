import { BlogClient } from "./BlogClient";
import { getBlogBySlugService, getBlogsService } from "@/services/blogService";
import { Metadata } from "next";

type PageProps = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  try {
    const res = await getBlogsService(100);
    if (res.success && res.data && res.data.length > 0) {
      return res.data.map((blog) => ({
        slug: blog.slug
      }));
    }
  } catch (error) {
    console.error("Error generating static params for blog:", error);
  }
  return [{ slug: "default" }];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const response = await getBlogBySlugService(params.slug);
  const blog = response.success ? response.data : null;

  const canonicalUrl = `https://staging.yuntaspublicidad.com/blog/${params.slug}`;

  if (!blog) {
    return {
      title: "Artículo no encontrado",
      robots: {
        index: false
      }
    }
  }

  return {
    title: blog.meta_title || blog.title,
    description: blog.meta_description || blog.description?.substring(0, 160) || `Conoce más sobre ${blog.title}`,
    keywords: blog.keywords || [],

    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true
    },

    openGraph: {
      title: blog.meta_title || blog.title,
      description: blog.meta_description || blog.description,
      url: canonicalUrl,
      type: "article",
      siteName: "Yuntas Publicidad",
      locale: "es_PE",
    }
  }
}

export default async function Page({ params }: PageProps) {
  const response = await getBlogBySlugService(params.slug);
  return <BlogClient initialBlog={response.success ? response.data || null : null} />;
}
