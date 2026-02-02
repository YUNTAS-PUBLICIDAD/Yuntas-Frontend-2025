"use client"

import React, { useState } from 'react'
import ProductoCard from '@/components/molecules/producto/ProductoCard'
import CategoriaSelect from '@/components/molecules/producto/CategoriaSelect'
import Text from '@/components/atoms/Text'
import { useCategorias } from '@/hooks/ui/productos/useCategorias'
import Pagination from '@/components/molecules/Pagination'
import { Producto } from '@/types/admin/producto'
import { useSelectCategorias } from '@/hooks/ui/productos/useSelectCategoria'
import { FaChevronDown } from "react-icons/fa";

type ProductoSection = {
    ListaBusqueda: Producto[];
    setListaProductos: React.Dispatch<React.SetStateAction<Producto[]>>;
    allProductos: Producto[];
};
const ProductosSection = ({ ListaBusqueda, setListaProductos, allProductos }: ProductoSection) => {
    const [openCategoria, setOpenCategoria] = useState(false);
    const [productosPaginados, setProductosPaginados] = useState<Producto[]>([]);

    const { listaCategorias, handleSelectCategoria, categoriaActiva } = useCategorias(allProductos);
    useSelectCategorias(categoriaActiva, setListaProductos, allProductos);

    return (
        <section className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 px-4 sm:px-6 md:px-8 lg:px-12 pt-8">
            <div className='flex flex-col'>
                <div className='cursor-pointer lg:cursor-default items-center flex gap-2 mb-6' onClick={() => setOpenCategoria(!openCategoria)}>
                    <Text variant='caption' className='font-bold uppercase text-2xl lg:text-3xl' color='black'>Categoría</Text>
                    <FaChevronDown className={`lg:hidden text-xl transition-transform ${openCategoria ? 'rotate-180' : ''}`} />
                </div>

                <div className={`flex flex-col gap-1 ${openCategoria ? 'flex' : 'hidden'} lg:flex`}>
                    {listaCategorias.map((e, index) => (
                        <CategoriaSelect
                            onClick={() => handleSelectCategoria(e.nombre)}
                            key={`${e.nombre}${index}`}
                            nombre={e.nombre}
                            count={e.count}
                            active={categoriaActiva === e.nombre ? true : false}
                        />
                    ))}
                </div>
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
            </div>

            <div className="col-span-full flex justify-center order-3 my-6 md:my-8">
                <Pagination pageSize={6} items={ListaBusqueda} setProductosPaginados={setProductosPaginados} />
            </div>
        </section>
    )
}

export default ProductosSection
