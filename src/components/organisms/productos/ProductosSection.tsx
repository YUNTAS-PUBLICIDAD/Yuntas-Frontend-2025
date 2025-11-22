"use client"
import React, { useEffect, useState } from 'react'
import { productosData } from '@/data/productosData'
import ProductoCard from '@/components/molecules/producto/ProductoCard'
import CategoriaSelect from '@/components/molecules/producto/CategoriaSelect'
import Text from '@/components/atoms/Text'
import { useCategorias } from '@/hooks/ui/productos/useCategorias'
import Pagination from '@/components/molecules/Pagination'
import { Producto } from '@/types/producto'
import { useSelectCategorias } from '@/hooks/ui/productos/useSelectCategoria'
type ProductoSection = {
  ListaBusqueda: Producto[];
  setListaProductos:React.Dispatch<React.SetStateAction<Producto[]>>
};
const ProductosSection = ({ListaBusqueda,setListaProductos}:ProductoSection) => {
  console.log(ListaBusqueda)
  const {listaCategorias,handleSelectCategoria,categoriaActiva}=useCategorias(productosData)
  useSelectCategorias(categoriaActiva, setListaProductos);

  const [productosPaginados, setProductosPaginados] = useState<Producto[]>([]);
  return (
  <section className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-10 px-16 pt-10">
      
      <div className='flex flex-col '>
        <Text variant='caption' className='font-bold uppercase' color='black'>Categorias</Text>
        {listaCategorias.map((e, index) => (
          <CategoriaSelect 
            onClick={()=>handleSelectCategoria(e.nombre)}
            key={`${e.nombre}${index}`} 
            nombre={e.nombre} 
            count={e.count}
            active={categoriaActiva===e.nombre?true:false}
          />
        ))}
      </div>

      <div className='flex flex-wrap justify-center gap-x-20 gap-y-5'>
        {productosPaginados.map((e, index) => (
          <ProductoCard 
            key={index} 
            img={e.img} 
            nombre={e.nombre}
          />
        ))}
      </div>
      <div className="col-span-full  flex justify-center order-3 my-6">
        <Pagination pageSize={6} items={ListaBusqueda} setProductosPaginados={setProductosPaginados}/>
      </div>
    </section>
  )
}

export default ProductosSection
