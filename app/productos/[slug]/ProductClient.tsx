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
        if (slug && (!initialProduct || initialProduct.slug !== slug)) {
            getProductoBySlug(slug);
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
                        />
                        <ListaDetalleSection
                            text="ESPECIFICACIONES"
                            listItems={displayProducto?.specifications || []}
                            imageSrc={displayProducto?.gallery[1]?.url || ""}
                            imageAlt={displayProducto?.gallery[1]?.alt || "Especificaciones del producto"}
                        />
                        <InformacionSection info={displayProducto?.description || ""} />
                        <ListaDetalleSection
                            text="BENEFICIOS"
                            listItems={displayProducto?.benefits || []}
                            imageSrc={displayProducto?.gallery[2]?.url || ""}
                            imageAlt={displayProducto?.gallery[2]?.alt || "Beneficios del producto"}
                            reverse={true}
                        />
                        <CotizaSection />
                        <Popup
                            imgSrc={displayProducto?.gallery[3]?.url || ""}
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
