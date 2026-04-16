'use client';

import { useParams } from 'next/navigation';
import HeroSection from "@/components/organisms/productos/detalle/HeroSection";
import ListaDetalleSection from "@/components/organisms/productos/detalle/ListaDetalleSection";
import InformacionSection from "@/components/organisms/productos/detalle/InformacionSection";
import CotizaSection from "@/components/organisms/productos/detalle/CotizaSection";
import Popup from '@/components/molecules/Popup';
import { useProductos } from "@/hooks/useProductos";
import { sourceData } from "@/data/popup/sourceData";
import { useEffect } from "react";
import { Producto } from '@/types/admin/producto';
import { imageProductoSlots } from '@/types/admin/producto';

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

    const imgHero = displayProducto?.gallery.find(e => e.slot === imageProductoSlots.HERO);
    const imgSpecs = displayProducto?.gallery.find(e => e.slot === imageProductoSlots.SPECS);
    const imgBene = displayProducto?.gallery.find(e => e.slot === imageProductoSlots.BENEFITS);
    const imgPopups = displayProducto?.gallery.find(e => e.slot === imageProductoSlots.POPUPS);

    return (
        <>
            {isLoading && !displayProducto && <div className="flex justify-center items-center h-screen">Cargando producto...</div>}

            {
                displayProducto && (
                    <>
                        <HeroSection
                            productName={displayProducto?.name || ""}
                            backgroundImage={imgHero?.url || ""}
                            imageTitle={imgHero?.title || `${displayProducto.name} - Yuntas Publicidad`}
                            imageAlt={imgHero?.alt || `${displayProducto.name} - Yuntas Publicidad`}
                        />
                        <ListaDetalleSection
                            text="ESPECIFICACIONES"
                            listItems={displayProducto?.specifications || []}
                            imageSrc={imgSpecs?.url || ""}
                            imageTitle={imgSpecs?.title || "Especificaciones del producto"}
                            imageAlt={imgSpecs?.alt || "Especificaciones del producto"}
                        />
                        <InformacionSection info={displayProducto?.description || ""} />
                        <ListaDetalleSection
                            text="BENEFICIOS"
                            listItems={displayProducto?.benefits || []}
                            imageSrc={imgBene?.url || ""}
                            imageTitle={imgBene?.title || "Beneficios del producto"}
                            imageAlt={imgBene?.alt || "Beneficios del producto"}
                            reverse={true}
                        />
                        <CotizaSection />
                        <Popup
                            imgSrc={imgPopups?.url || ""}
                            imgTitle={imgPopups?.title || "Cotiza tu producto"}
                            imgAlt={imgPopups?.alt || "Cotiza tu producto"}
                            title="¡Tu marca brillando como se merece!"
                            buttonText="Explorar opciones"
                            productId={displayProducto?.id}
                            sourceId={sourceData.PRODUCTO_DETALLE} // source id para "Producto detalle"
                        />
                    </>
                )
            }

            {error && !displayProducto && <div className="flex justify-center items-center h-screen">Producto no encontrado</div>}
        </>
    );
}
