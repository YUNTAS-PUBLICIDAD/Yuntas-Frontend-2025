import { Suspense } from "react";
import HeroSection from "@/components/organisms/productos/HeroSection";
//import Popup from "@/components/molecules/Popup";
import { getProductosService } from "@/services/productosService";
import { sourceData } from "@/data/popup/sourceData";
import { ProductList } from "./ProductList";
import { imagenes } from "@/data/imagenes";
 
export const metadata = {
    title: "Productos Publicitarios",
    description: "Descubre nuestra amplia selección de productos publicitarios: letras corpóreas, letreros LED, pantallas publicitarias, señalización y más. Fabricación personalizada en Lima, Perú.",
 
    keywords: [
        "productos publicitarios",
        "letreros luminosos",
        "pantallas LED",
        "publicidad exterior",
        "proyectores publicitarios",
        "iluminación decorativa",
        "publicidad Lima Perú"
    ],
 
    alternates: {
        canonical: "https://yuntaspublicidad.com/productos",
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
        title: "Productos Publicitarios - Yuntas Publicidad",
        description: "Explora nuestra colección completa de productos publicitarios personalizados. Letras LED, pantallas digitales, señalización y más para potenciar tu marca.",
        url: "https://yuntaspublicidad.com/productos",
        siteName: "Yuntas Publicidad",
        images: [
            {
                url: imagenes.productos.hero.src,
                width: 1200,
                height: 630,
                alt: imagenes.productos.hero.alt,
            },
        ],
        type: "website",
        locale: "es_PE",
    },
    
};
 
export default async function ProductosPage() {
    const result = await getProductosService(100);
    const productos = result.success && result.data ? result.data : [];
 
    
 
    return (
        <main>
            <HeroSection />
            <Suspense fallback={
                <div className="w-full min-h-[40vh] flex flex-col items-center justify-center gap-4 py-20">
                    <div className="w-12 h-12 border-4 border-[#a855f7] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-[#203565] font-semibold animate-pulse">Cargando productos...</p>
                </div>
            }>
                <ProductList initialProductos={productos} />
            </Suspense>

             {/* 
               Se oculta el Popup temporalmente a petición para mejorar la navegación.
               Descomentar estas líneas y la importación arriba cuando se vuelva a necesitar.
            <Popup
                imgSrc={imagenes.productos.popup.src}
                imgTitle={imagenes.productos.popup.title}
                imgAlt={imagenes.productos.popup.alt}
                title="¡Tu marca brillando como se merece!"
                buttonText="Explorar opciones"
                sourceId={sourceData.PRODUCTOS} // source id para "Productos"
            />

                */}
        </main>
    );
} 
