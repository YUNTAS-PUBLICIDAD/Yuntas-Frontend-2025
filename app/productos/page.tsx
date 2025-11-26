'use client'
import HeroSearchSection from "@/components/organisms/productos/HeroSearchSection";
import HeroSection from "@/components/organisms/productos/HeroSection";
import ProductosSection from "@/components/organisms/productos/ProductosSection";
import { Producto } from "@/types/producto";
import { useState } from "react";
export default function ProductosPage() {
  const [listaProductos,setListaProductos]=useState<Producto[]>([])
  return (
    <main className="">
      <HeroSection/>
      <HeroSearchSection listaProductos={listaProductos} setListaProductos={setListaProductos}/>
      <ProductosSection ListaBusqueda={listaProductos} setListaProductos={setListaProductos}/>
    </main>
  );
}
