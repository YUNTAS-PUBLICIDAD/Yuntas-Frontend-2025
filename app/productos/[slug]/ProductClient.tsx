'use client';

import { useParams } from 'next/navigation';
import HeroSection from "@/components/organisms/productos/detalle/HeroSection";
import ListaDetalleSection from "@/components/organisms/productos/detalle/ListaDetalleSection";
import InformacionSection from "@/components/organisms/productos/detalle/InformacionSection";
import CotizaSection from "@/components/organisms/productos/detalle/CotizaSection";
import Popup from '@/components/molecules/Popup';
import { useProductos } from "@/hooks/useProductos";
import { sourceData } from "@/data/popup/sourceData";
import { useEffect, useState } from "react";
import { Producto } from '@/types/admin/producto';

interface ProductClientProps {
    initialProduct?: Producto | null;
}

export function ProductClient({ initialProduct }: ProductClientProps) {
    const params = useParams();

    const slug = typeof params?.slug === 'string' ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : null;

    const { getProductoBySlug, producto: hookProducto, isLoading, error } = useProductos();

    // Usar el producto inicial si está disponible, de lo contrario usar el del hook
    const displayProducto = hookProducto || initialProduct;

    useEffect(() => {
        // Solo cargar si no tenemos el producto inicial o si el slug cambió
        console.log('[ProductClient] mount slug=', slug, 'initialProduct=', initialProduct);
        if (slug && (!initialProduct || initialProduct.slug !== slug)) {
            getProductoBySlug(slug);
            console.log('[ProductClient] fetching product for', slug);
        }
    }, [slug, getProductoBySlug, initialProduct]);

    if (!slug && !displayProducto) {
        return <div className="flex justify-center items-center h-screen">URL no válida</div>;
    }

    return (
        <>
            {isLoading && !displayProducto && <div className="flex justify-center items-center h-screen">Cargando producto...</div>}

            {
                displayProducto && (
                    <main>
                        <HeroSection
                            productName={displayProducto?.name || ""}
                            backgroundImage={displayProducto?.gallery[0]?.url || ""}
                            imageTitle={displayProducto?.gallery[0]?.title || `${displayProducto.name} - Yuntas Publicidad`}
                            imageAlt={displayProducto.gallery[0]?.alt || `${displayProducto.name} - Yuntas Publicidad`}
                        />
                        <ListaDetalleSection
                            text="ESPECIFICACIONES"
                            listItems={displayProducto?.specifications || []}
                            imageSrc={displayProducto?.gallery[1]?.url || ""}
                            imageTitle={displayProducto?.gallery[1]?.title || "Especificaciones del producto"}
                            imageAlt={displayProducto?.gallery[1]?.alt || "Especificaciones del producto"}
                        />
                        <InformacionSection info={displayProducto?.description || ""} />
                        <ListaDetalleSection
                            text="BENEFICIOS"
                            listItems={displayProducto?.benefits || []}
                            imageSrc={displayProducto?.gallery[2]?.url || ""}
                            imageTitle={displayProducto?.gallery[2]?.title || "Beneficios del producto"}
                            imageAlt={displayProducto?.gallery[2]?.alt || "Beneficios del producto"}
                            reverse={true}
                        />
                        <CotizaSection />
                        <Popup
                            imgSrc={displayProducto?.gallery[3]?.url || ""}
                            imgTitle={displayProducto?.gallery[3]?.title || "Cotiza tu producto"}
                            imgAlt={displayProducto?.gallery[3]?.alt || "Cotiza tu producto"}
                            title="¡Tu marca brillando como se merece!"
                            buttonText="Explorar opciones"
                            productId={displayProducto?.id}
                            sourceId={sourceData.PRODUCTO_DETALLE} // source id para "Producto detalle"
                        />
                    </main>
                )
            }

            {error && !displayProducto && <div className="flex justify-center items-center h-screen">Producto no encontrado</div>}
        </>
    );
}
