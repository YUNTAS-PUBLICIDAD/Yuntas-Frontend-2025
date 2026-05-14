import { BlogInput, Blog } from "@/types/admin/blog";

export const mapBlogToInput = (blog: Blog): BlogInput => ({
  title: blog.title ?? "",
  slug: blog.slug ?? "",
  hero_title: blog.hero_title ?? "",
  cover_subtitle: blog.cover_subtitle ?? "",
  video_url: blog.video_url ?? "",

  meta_title: blog.meta_title ?? "",
  meta_description: blog.meta_description ?? "",

  main_image: blog.main_image?.url ?? null,
  main_image_title: blog.main_image?.title ?? "",
  main_image_alt: blog.main_image?.alt ?? "",

  gallery: blog.gallery?.map(img => ({
    slot: img.slot,
    image: img.url,
    title: img.title ?? "",
    alt: img.alt ?? "",
  })) ?? [],

  description: blog.description ?? "",
  testimonial: blog.testimonial ?? "",
  benefits: blog.benefits ?? [],

  product_id: blog.product?.id ? String(blog.product.id) : "",
});
