'use client';

import { useParams } from 'next/navigation'; 
import HeroSection from "@/components/organisms/productos/detalle/HeroSection";
import ListaDetalleSection from "@/components/organisms/productos/detalle/ListaDetalleSection";
import InformacionSection from "@/components/organisms/productos/detalle/InformacionSection";
import CotizaSection from "@/components/organisms/productos/detalle/CotizaSection";
import Popup from '@/components/molecules/Popup';
import { useProductos } from "@/hooks/useProductos";
import { useEffect } from "react";

export function ProductClient() {
    const params = useParams();
    
    const slug = typeof params?.slug === 'string' ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : null;

    const { getProductoBySlug, producto, isLoading, error } = useProductos();

    useEffect(() => {
        if (slug) {
            getProductoBySlug(slug);
        }
    }, [slug, getProductoBySlug]);

    if (!slug) {
        return <div className="flex justify-center items-center h-screen">URL no válida</div>;
    }

    return (
        <>
            {isLoading && <div className="flex justify-center items-center h-screen">Cargando producto...</div>}

            {
                producto && !isLoading && (
                    <main>
                        <HeroSection
                            productName={producto?.name || ""}
                            backgroundImage={producto?.gallery[0]?.url || ""}
                        />
                        <ListaDetalleSection
                            text="ESPECIFICACIONES"
                            listItems={producto?.specifications || []}
                            imageSrc={producto?.gallery[1]?.url || ""}
                            imageAlt={producto?.gallery[1]?.alt || "Especificaciones del producto"}
                        />
                        <InformacionSection info={producto?.description || ""} />
                        <ListaDetalleSection
                            text="BENEFICIOS"
                            listItems={producto?.benefits || []}
                            imageSrc={producto?.gallery[2]?.url || ""}
                            imageAlt={producto?.gallery[2]?.alt || "Beneficios del producto"}
                            reverse={true}
                        />
                        <CotizaSection />
                        <Popup
                            imgSrc={producto?.gallery[3]?.url || ""}
                            title="¡Tu marca brillando como se merece!"
                            buttonText="Explorar opciones"
                            productId={producto?.id}
                            sourceId={3}
                        />
                    </main>
                )
            }

            {error && <div className="flex justify-center items-center h-screen">Producto no encontrado</div>}
        </>
    );
}