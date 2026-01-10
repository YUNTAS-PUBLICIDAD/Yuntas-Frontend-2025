'use client'
import HeroSearchSection from "@/components/organisms/productos/HeroSearchSection";
import HeroSection from "@/components/organisms/productos/HeroSection";
import ProductoPopup from "@/components/organisms/productos/popupInicial/ProductoPopup";
import ProductosSection from "@/components/organisms/productos/ProductosSection";
import { Producto } from "@/types/admin/producto";
import { useState } from "react";
export default function ProductosPage() {
  const [listaProductos,setListaProductos]=useState<Producto[]>([])
  const [allProductos, setAllProductos] = useState<Producto[]>([])
  return (
    <main className="">
      <HeroSection/>
      <HeroSearchSection listaProductos={listaProductos} setListaProductos={setListaProductos} allProductos={allProductos} />
      <ProductosSection ListaBusqueda={listaProductos} setListaProductos={setListaProductos} setAllProductos={setAllProductos} />
      <ProductoPopup delay={5000}/>
    </main>
  );
} 
