export interface EtiquetaProducto {
    meta_titulo: string;
    meta_descripcion: string;
    keywords: string[];
}

export interface ImagenProducto {
    id: number;
    title: string;
    url_imagen: string;
    texto_alt_SEO: string;
}

export interface Producto {
    id: number;
    link: string;
    nombre: string;
    titulo: string;
    descripcion: string;
    seccion: string;
    imagen_principal: string;
    text_alt_principal: string | null;
    especificaciones: any;
    beneficios: string[];
    imagenes: ImagenProducto[];
    etiqueta: EtiquetaProducto;
    created_at: string;
    updated_at: string;
}

export interface ProductoListResponse {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    data: Producto[];
}

export interface ProductoActionResponse<T = null> {
    success: boolean;
    message?: string;
    data?: T;
    meta?: {
        current_page: number;
        per_page: number;
        total: number;
        last_page: number;
    };
}

export interface ProductoResponse {
    success: boolean;
    message: string;
    data: Producto;
}

///////////////////////////////////////// 
export interface ProductoInput {
    nombre: string;
    descripcion: string;
    precio: number;
    seccion: string;
    link: string;
    imagen?: string;
}



