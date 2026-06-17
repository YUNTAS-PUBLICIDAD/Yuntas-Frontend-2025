// type ImageProductoSlot = "Hero" | "Specs" | "Benefits" | "Popups";

export type ImageProductoSlot = "Hero" | "Specs" | "Benefits" | "PopupLeft" | "PopupRight" | "PopupMobile";

interface ImagenProducto {
    url: string | null;
    alt: string | null;
    title: string | null;
}

interface Galeria {
    url: string;
    alt: string | null;
    title: string | null;
    slot: ImageProductoSlot;
}

export interface Producto {
    id: number;
    name: string;
    slug: string;
    price: string;
    hero_title: string;
    description: string;
    video_url: string;
    status: "active" | "inactive";
    meta_title: string | null;
    meta_description: string | null;
    keywords: string[];
    main_image: ImagenProducto;
    gallery: Galeria[];
    category_name: string | null;
    specifications: string[];
    benefits: string[];
    created_at: string;
}

export interface ProductoInput {
    name: string;
    slug?: string;
    price: string;
    hero_title: string;
    description: string;
    status?: 'active' | 'inactive';
    video_url?: string | null;

    meta_title: string;
    meta_description: string;
    keywords: string[];

    main_image: File | string | null;
    main_image_title: string;
    main_image_alt: string;
    gallery: Array<{
        slot: ImageProductoSlot;
        image: File | string;
        title: string;
        alt: string;
    }>;

    categories: string[];
    specifications: string[];
    benefits: string[];
}

// respuesta de service
export interface ProductoServiceResponse<T = null> {
    success: boolean;
    message?: string;
    data?: T;
}

export interface ProductoExport {
    nombre: string;
    categorias: number;
};

export const imageProductoSlots = {
	HERO: "Hero",
	SPECS: "Specs",
	BENEFITS: "Benefits",
	// POPUPS: "Popups"
	POPUP_LEFT: 'PopupLeft',
	POPUP_RIGHT: 'PopupRight',
	POPUP_MOBILE: 'PopupMobile'
} as const;
