import { ProductClient } from "./ProductClient";
import { getProductoBySlugService, getProductosService } from "@/services/productosService";
import { Metadata } from "next";
import { Producto } from "@/types/admin/producto";

interface PageProps {
    params: { slug: string };
}

export const dynamicParams = true;
export const revalidate = false; 

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
    console.log('=====================================');
    console.log('🚀 INICIANDO generateStaticParams');
    console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
    console.log('Fecha:', new Date().toISOString());
    console.log('=====================================');
    
    try {
        const products = await getProductosService(100);
        
        console.log('📊 Resultado de getProductosService:');
        console.log('Success:', products.success);
        console.log('Data length:', products.data?.length || 0);
        console.log('Data:', products.data ? 'Existe' : 'null/undefined');

        if (!products.success || !products.data) {
            console.error('❌ Error: No se obtuvieron productos');
            console.error('Message:', products.message);
            return [];
        }

        const params = products.data.map((product) => ({
            slug: product.slug,
        }));
        
        console.log('✅ Generando', params.length, 'rutas');
        console.log('Primeras 3 rutas:', params.slice(0, 3));
        
        return params;
    } catch (error) {
        console.error('❌❌❌ ERROR CRÍTICO en generateStaticParams:');
        console.error(error);
        return [];
    }
}

export default async function Page({ params }: PageProps) {
    const result = await getProductoBySlugService(params.slug);

    return <ProductClient initialProduct={result.success ? result.data || null : null} />;
}