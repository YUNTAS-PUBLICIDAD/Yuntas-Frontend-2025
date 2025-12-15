import {StaticImageData} from 'next/image'
export type Blog = {
  id: number;
  title: string;
  slug: string;
  cover_subtitle: string;
  content: string;
  video_url: string | null;
  status: "published" | "draft";
  created_at: string;

  meta_title: string;
  meta_description: string;

  categories: any[]; // si luego defines categorías, se tipa mejor

  main_image: ImageDTO | null;
  gallery: ImageDTO[];

  paragraphs: string[];
  benefits: string[];
  content_blocks: any[];
};

export type BlogExport = {
  id: string;
  nombre: string;
  descripcion: string;
  fecha: string;
  nro_de_imagenes: number;
};
export type ImageDTO = {
  url: string;
  alt: string | null;
};

