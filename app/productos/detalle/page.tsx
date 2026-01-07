'use client';

import { useSearchParams } from 'next/navigation';
import HeroSection from "@/components/organisms/productos/detalle/HeroSection";
import ListaDetalleSection from "@/components/organisms/productos/detalle/ListaDetalleSection";
import InformacionSection from "@/components/organisms/productos/detalle/InformacionSection";
import CotizaSection from "@/components/organisms/productos/detalle/CotizaSection";
import ProductoDetallePopup from "@/components/organisms/productos/detalle/ProductoDetallePopup";
import { useProductos } from "@/hooks/useProductos";
import { BASE_URL } from "@/config";
import { useEffect } from "react";

function ProductoDetalleContent() {
    const searchParams = useSearchParams();
    const slug = searchParams.get('slug');
    const { getProductoBySlug, producto, isLoading, error } = useProductos();

    useEffect(() => {
        if (slug) {
            getProductoBySlug(slug);
        }
    }, [slug, getProductoBySlug]);

    if (!slug) {
        return <div className="flex justify-center items-center h-screen">No encontrado</div>;
    }

    return (
        <>
            {isLoading && <div className="flex justify-center items-center h-screen">Cargando producto...</div>}

            {
                producto && !isLoading && (
                    <main>
                        <HeroSection
                            productName={producto?.name || ""}
                            backgroundImage={`${BASE_URL.replace('/api', '')}${producto?.gallery[0]?.url || ""}`}
                        />
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
        </>
    );
}

export default function ProductoDetallePage() {
    return (
        <ProductoDetalleContent />
    );
}