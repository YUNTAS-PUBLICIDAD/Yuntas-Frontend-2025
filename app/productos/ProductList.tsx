'use client'

import HeroSearchSection from "@/components/organisms/productos/HeroSearchSection";
import ProductosSection from "@/components/organisms/productos/ProductosSection";
import { Producto } from "@/types/admin/producto";
import { useState } from "react";

interface ProductListProps {
    initialProductos: Producto[];
}

export function ProductList({ initialProductos }: ProductListProps) {
    const [listaProductos, setListaProductos] = useState<Producto[]>(initialProductos);
    const [allProductos] = useState<Producto[]>(initialProductos);

    return (
        <>
            <HeroSearchSection
                setListaProductos={setListaProductos}
                allProductos={allProductos} 
            />
            <ProductosSection
                ListaBusqueda={listaProductos}
                setListaProductos={setListaProductos}
                allProductos={allProductos}
            />
        </>
    );
}