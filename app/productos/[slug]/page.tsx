import { ProductClient } from "./ProductClient";
import { getProductoBySlugService, getProductosService } from "@/services/productosService";
import { Metadata } from "next";
import { Producto } from "@/types/admin/producto";

interface PageProps {
    params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const result = await getProductoBySlugService(params.slug);

    const canonicalUrl = `https://yuntaspublicidad.com/productos/${params.slug}`;

    if (!result.success || !result.data) {
        return {
            title: "Producto no encontrado - Yuntas Publicidad",
            alternates: {
                canonical: canonicalUrl,
            },
            robots: {
                index: true,
                follow: true,
            },
        };
    }

    const producto: Producto = result.data;

    const title = producto.meta_title || `${producto.name} - Yuntas Publicidad`;
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
    const products = await getProductosService(100);

    if (!products.success || !products.data) {
        return [];
    }

    return products.data.map((product) => ({
        slug: product.slug,
    }));
}

export default async function Page({ params }: PageProps) {
    const result = await getProductoBySlugService(params.slug);

    return <ProductClient initialProduct={result.success ? result.data || null : null} />;
}