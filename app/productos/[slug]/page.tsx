'use client';

import HeroSection from "@/components/organisms/productos/detalle/HeroSection";
import ListaDetalleSection from "@/components/organisms/productos/detalle/ListaDetalleSection";
import InformacionSection from "@/components/organisms/productos/detalle/InformacionSection";
import CotizaSection from "@/components/organisms/productos/detalle/CotizaSection";
import ProductoDetallePopup from "@/components/organisms/productos/detalle/ProductoDetallePopup";
import { useProductos } from "@/hooks/useProductos";
import { Metadata } from "next";
import { BASE_URL } from "@/config";
import { Producto } from "@/types/producto";
import { useEffect } from "react";

/* export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const result = await getProductoBySlugAction(params.slug);
    
    if (!result.success || !result.data) {
        return { title: "Yuntas Publicidad - Producto no encontrado" };
    }

    const producto = result.data;

    return {
        title: producto.meta_title || producto.name,
        description: producto.meta_description || "",
        keywords: producto.keywords?.join(", ") || "",
        openGraph: {
            title:  producto.meta_title || producto.name,
            description: producto.meta_description || "",
            images: producto.main_image?.url ? [{ url: `${BASE_URL.replace('/api', '')}${producto.main_image.url}` }] : [],
        },
    };
} */

export default function ProductoDetallePage({ params }: { params: { slug: string } }) {
    const { getProductoBySlug, producto, isLoading, error } = useProductos();
    useEffect(() => {
        getProductoBySlug(params.slug);
    }, []);

    return (
        <>
            {isLoading && <div className="flex justify-center items-center h-screen">Cargando...</div>}

            {
                producto && !isLoading && (
                    <main>
                        <HeroSection productName={producto?.name || ""} backgroundImage={`${BASE_URL.replace('/api', '')}${producto?.gallery[0]?.url || ""}`} />
                        <ListaDetalleSection
                            text="ESPECIFICACIONES"
                            listItems={producto?.specifications || []}
                            imageSrc={`${BASE_URL.replace('/api', '')}${producto?.gallery[1]?.url || ""}`}
                            imageAlt={producto?.gallery[1]?.alt_text || "Especificaciones del producto"}
                        />
                        <InformacionSection info={producto?.description || ""} />
                        <ListaDetalleSection
                            text="BENEFICIOS"
                            listItems={producto?.benefits || []}
                            imageSrc={`${BASE_URL.replace('/api', '')}${producto?.gallery[2]?.url || ""}`}
                            imageAlt={producto?.gallery[2]?.alt_text || "Beneficios del producto"}
                            reverse={true}
                        />
                        <CotizaSection />
                        <ProductoDetallePopup imgSrc={`${BASE_URL.replace('/api', '')}${producto?.gallery[3]?.url || ""}`} />
                    </main>
                )
            }

            {error && <div className="flex justify-center items-center h-screen">Producto no encontrado</div>}
        </>);
}
