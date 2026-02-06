"use client"

import React, { useState } from 'react'
import ProductoCard from '@/components/molecules/producto/ProductoCard'
import Text from '@/components/atoms/Text'
import { useCategorias } from '@/hooks/ui/productos/useCategorias'
import Pagination from '@/components/molecules/Pagination'
import { Producto } from '@/types/admin/producto'
import { useSelectCategorias } from '@/hooks/ui/productos/useSelectCategoria'
import { FaChevronDown } from "react-icons/fa";
import SidebarProductos from '@/components/organisms/SidebarProductos'; 

type ProductoSection = {
    ListaBusqueda: Producto[];
    setListaProductos: React.Dispatch<React.SetStateAction<Producto[]>>;
    allProductos: Producto[];
};

const ProductosSection = ({ ListaBusqueda, setListaProductos, allProductos }: ProductoSection) => {
    const [openCategoria, setOpenCategoria] = useState(false);
    const [productosPaginados, setProductosPaginados] = useState<Producto[]>([]);

    const { handleSelectCategoria, categoriaActiva } = useCategorias(allProductos);
    useSelectCategorias(categoriaActiva, setListaProductos, allProductos);

    return (
        <section className="min-h-[80vh] pb-24 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 px-4 sm:px-6 md:px-8 lg:px-12 pt-8">
            
            {/* SIDEBAR */}
            <div className='flex flex-col'>
                {/* Header Mobile */}
                <div 
                   className='cursor-pointer lg:cursor-default items-center flex gap-2 mb-4 lg:hidden' 
                   onClick={() => setOpenCategoria(!openCategoria)}
                >
                    <Text variant='caption' className='font-bold uppercase text-2xl' color='black'>Categoría</Text>
                    <FaChevronDown className={`text-xl transition-transform ${openCategoria ? 'rotate-180' : ''}`} />
                </div>

                <div className={`${openCategoria ? 'block' : 'hidden'} lg:block`}>
                    <SidebarProductos 
                        allProductos={allProductos}
                        categoriaActiva={categoriaActiva}
                        onSelectCategoria={handleSelectCategoria}
                    />
                </div>
            </div>

            {/* GRID DE PRODUCTOS */}
            <div className='flex flex-col w-full'>
                 {/* Título visual de la categoría actual */}
                <div className="mb-4 hidden lg:block border-b pb-2">
                     <h1 className="text-2xl font-bold uppercase text-gray-800">
                        {categoriaActiva}
                     </h1>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6 lg:gap-8 xl:gap-10 auto-rows-fr place-items-center'>
                    {productosPaginados.map((e, index) => (
                        <ProductoCard
                            key={index}
                            imgUrl={e.main_image?.url || ''}
                            imgTitle={e.main_image?.title || ''}
                            imgAlt={e.main_image?.alt || ''}
                            nombre={e.name}
                            href={`/productos/${e.slug}`}
                        />
                    ))}
                    {productosPaginados.length === 0 && (
                        <p className="col-span-full text-center py-10 text-gray-500">
                            No hay productos en esta vista.
                        </p>
                    )}
                </div>

                <div className="col-span-full flex justify-center order-3 my-6 md:my-8">
                    <Pagination pageSize={6} items={ListaBusqueda} setProductosPaginados={setProductosPaginados} />
                </div>
            </div>
        </section>
    )
}

export default ProductosSection