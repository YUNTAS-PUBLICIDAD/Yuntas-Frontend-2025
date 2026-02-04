import HeroSection from "@/components/organisms/productos/HeroSection";
import imagenPopup from "@/assets/productos/popup/Productos.webp";
import Popup from "@/components/molecules/Popup";
import { getProductosService } from "@/services/productosService";
import { sourceData } from "@/data/popup/sourceData";
import heroBackground from "@/assets/productos/heroBackground.png";
import { ProductList } from "./ProductList";

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
                url: heroBackground.src,
                width: 1200,
                height: 630,
                alt: "Catálogo de productos publicitarios Yuntas",
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
            <ProductList initialProductos={productos} />
            <Popup
                imgSrc={imagenPopup.src}
                imgTitle="Luces bar estilo neon"
                imgAlt="Luces bar estilo neon"
                title="¡Tu marca brillando como se merece!"
                buttonText="Explorar opciones"
                sourceId={sourceData.PRODUCTOS} // source id para "Productos"
            />
        </main>
    );
} 
