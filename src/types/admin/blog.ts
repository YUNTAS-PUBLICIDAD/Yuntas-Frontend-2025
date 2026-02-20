import { Producto } from "./producto";

type ImageBlogSlot = "Hero" | "Desc" | "Benefits" | "Testimonial";

interface ImagenBlog {
    url: string | null;
    alt: string | null;
    title: string | null;
}

interface Galeria {
    url: string;
    alt: string | null;
    title: string | null;
    slot: ImageBlogSlot;
}

export interface Blog {
	id: number;
	title: string;
	slug: string;
	hero_title: string;
	cover_subtitle: string;
	video_url: string;
	meta_title: string;
	meta_description: string;
	product: Pick<Producto, "id" | "name"> | null;
	main_image: ImagenBlog;
	gallery: Galeria[];
	description: string;
	testimonial: string;
	benefits: string[];
	created_at: string;
}

export interface BlogInput {
	title: string;
	slug: string;
	hero_title: string;
	cover_subtitle: string;
	video_url?: string;

	meta_title: string;
	meta_description: string;

	main_image: File | string | null;
    main_image_title: string;
    main_image_alt: string;

	gallery: Array<{
        slot: ImageBlogSlot;
        image: File | string;
        title: string;
        alt: string;
    }>;

	description: string;
	testimonial: string;
	benefits: string[];

	product_id: string;
}

export interface BlogServiceResponse<T = null> {
	success: boolean;
	message?: string;
	data?: T;
}

export interface BlogExport {
	ID: string | number;
	Título: string;
	Subtítulo: string;
	"Meta Título": string;
	Fecha: string;
	"Cant. Párrafos": number;
	"Cant. Imágenes": number;
}

export type BlogView = Blog | BlogStatic;
export type BlogStatic = {
	id: number;
	slug: string;
	title: string;
	cover_subtitle?: string;
	content: string;
	categories: string[];
	benefits?: string[];
	opinion?: string;
	video_url?: string;
	main_image: {
		url: string;
	};
};