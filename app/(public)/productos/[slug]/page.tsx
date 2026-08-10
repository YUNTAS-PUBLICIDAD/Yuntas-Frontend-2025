import { ProductClient } from "./ProductClient";
import { getProductoBySlugService, getProductosService } from "@/services/productosService";
import { Metadata } from "next";
import { Producto } from "@/types/admin/producto";
import { notFound } from "next/navigation";

interface PageProps {
    params: { slug: string };
}

export const revalidate = false;
export const dynamicParams = true;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const result = await getProductoBySlugService(params.slug);

    const canonicalUrl = `https://yuntaspublicidad.com/productos/${params.slug}`;

    if (!result.success || !result.data) {
        return {
            title: "Producto no encontrado",
            alternates: {
                canonical: canonicalUrl,
            },
            robots: {
                index: false,
                follow: true,
            },
        };
    }

    const producto: Producto = result.data;

    const title = producto.meta_title || `${producto.name}`;
    const description =
        producto.meta_description ||
        producto.description.substring(0, 160);

    return {
        title,
        description,
        keywords: producto.keywords?.join(", ") || "",

        alternates: {
            canonical: canonicalUrl,
        },

        robots: {
            index: true,
            follow: true,
            nocache: false,
            googleBot: {
                index: true,
                follow: true,
            },
        },

        openGraph: {
            title: producto.hero_title || title,
            description,
            url: canonicalUrl,
            siteName: "Yuntas Publicidad",
            images: producto.gallery.map((img) => ({
                url: img.url,
                alt: img.alt || producto.name,
                width: 1200,
                height: 630,
            })),
            type: "website",
            locale: "es_PE",
        },
    };
}

export async function generateStaticParams() {
    const MAX_ATTEMPTS = 3;
    const DELAY_MS = 5000;
    
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        try {
            const products = await getProductosService(100);

            if (products.success && products.data && products.data.length > 0) {
                const params = products.data.map((product) => ({
                    slug: product.slug,
                }));

                return params;
            }

            if (!products.success) {
                console.warn(`Intento ${attempt} falló:`, products.message);
            }
        } catch (error) {
            console.error(`Error en intento ${attempt}:`, error);
        }
        
        if (attempt < MAX_ATTEMPTS) {
            await new Promise(resolve => setTimeout(resolve, DELAY_MS));
        }
    }
    
    console.warn('Todos los intentos fallaron.');
    return [];
}

export default async function Page({ params }: PageProps) {
    const result = await getProductoBySlugService(params.slug);

    if (!result.success || !result.data) {
        notFound();
    }

    return <ProductClient initialProduct={result.data} />;
}