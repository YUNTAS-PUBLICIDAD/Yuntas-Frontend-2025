'use client'

import HeroSearchSection from "@/components/organisms/productos/HeroSearchSection";
import HeroSection from "@/components/organisms/productos/HeroSection";
import imagenPopup from "@/assets/productos/popup/Productos.webp";
import Popup from "@/components/molecules/Popup";
import ProductosSection from "@/components/organisms/productos/ProductosSection";
import { Producto } from "@/types/admin/producto";
import { useState } from "react";
import { sourceData } from "@/data/popup/sourceData";

export default function ProductosPage() {
    const [listaProductos, setListaProductos] = useState<Producto[]>([])
    const [allProductos, setAllProductos] = useState<Producto[]>([])
    return (
        <main>
            <HeroSection />
            <HeroSearchSection
                setListaProductos={setListaProductos}
                allProductos={allProductos} />
            <ProductosSection
                ListaBusqueda={listaProductos}
                setListaProductos={setListaProductos}
                setAllProductos={setAllProductos} />
            <Popup
                imgSrc={imagenPopup.src}
                title="¡Tu marca brillando como se merece!"
                buttonText="Explorar opciones"
                sourceId={sourceData.PRODUCTOS} // source id para "Productos"
            />
        </main>
    );
} 
