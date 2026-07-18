"use client"

import React, { useRef, useState } from 'react'
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

const ProductoCardSkeleton = () => (
  <div className="w-full animate-pulse">
    <div className="w-full aspect-[4/3] bg-gray-200 rounded-2xl mb-3" />
    <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto" />
  </div>
);

const PAGE_SIZE = 6;

const ProductosSection = ({ ListaBusqueda, setListaProductos, allProductos }: ProductoSection) => {
  const [openCategoria, setOpenCategoria] = useState(false);
  const [productosPaginados, setProductosPaginados] = useState<Producto[]>(
    () => ListaBusqueda.slice(0, PAGE_SIZE)
  );
  const [isReady, setIsReady] = useState(false);

  const productosSectionRef = useRef<HTMLDivElement>(null);

  const scrollToProductosSection = () => {
    productosSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const {
    categoriasActivas,
    handleToggleCategoria,
    handleLimpiar,
    categoriaActiva, // para el título del listado
  } = useCategorias(allProductos);

  // Filtra la lista cada vez que cambian las categorías activas
  useSelectCategorias(categoriasActivas, setListaProductos, allProductos);

  const handleSetProductosPaginados = (items: Producto[]) => {
    setProductosPaginados(items);
    if (!isReady) setIsReady(true);
  };

  // Título dinámico según selección
  const tituloSeccion =
    categoriasActivas.length === 0
      ? 'Todos los Productos'
      : categoriasActivas.length === 1
      ? categoriasActivas[0]
      : 'Productos Filtrados';

  return (
    <section
      ref={productosSectionRef}
      className="min-h-[80vh] pb-24 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 px-4 sm:px-6 md:px-8 lg:px-12 pt-8 scroll-mt-20"
    >
      {/* SIDEBAR */}
      <div className="flex flex-col">
        {/* Header Mobile */}
        <div
          className="cursor-pointer lg:cursor-default items-center flex gap-2 mb-4 lg:hidden"
          onClick={() => setOpenCategoria(!openCategoria)}
        >
          <Text variant="caption" className="font-bold uppercase text-2xl" color="black">
            Categoría
          </Text>
          <FaChevronDown className={`text-xl transition-transform ${openCategoria ? 'rotate-180' : ''}`} />
        </div>

        <div className={`${openCategoria ? 'block' : 'hidden'} lg:block`}>
          {!isReady ? (
            <div className="w-full md:w-64 flex flex-col pr-2 animate-pulse">
              <div className="hidden md:block h-6 w-24 bg-gray-200 rounded mb-4" />
              <div className="w-full h-10 bg-gray-200 rounded-lg" />
              <div className="relative mt-0 ml-5 pb-2">
                <div className="absolute left-0 top-0 h-full w-px bg-gray-200" />
                <div className="flex flex-col pt-4 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="relative pl-6">
                      <div className="absolute left-0 top-3 w-6 h-px bg-gray-200" />
                      <div className="h-4 bg-gray-200 rounded" style={{ width: `${60 + (i % 3) * 15}%` }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <SidebarProductos
              allProductos={allProductos}
              categoriasActivas={categoriasActivas}
              onToggleCategoria={handleToggleCategoria}
              onLimpiar={handleLimpiar}
            />
          )}
        </div>
      </div>

      {/* LISTADO */}
      <div className="flex flex-col w-full">
        <div className="mb-4 hidden lg:block border-b pb-2">
          {!isReady ? (
            <div className="h-7 w-48 bg-gray-200 rounded animate-pulse" />
          ) : (
            <h2 className="text-2xl font-bold uppercase text-gray-800">
              {tituloSeccion}
            </h2>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6 lg:gap-8 xl:gap-10 auto-rows-fr place-items-center">
          {!isReady ? (
            [...Array(PAGE_SIZE)].map((_, i) => <ProductoCardSkeleton key={i} />)
          ) : (
            <>
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
                  No hay productos en esta categoría.
                </p>
              )}
            </>
          )}
        </div>

        <div className="col-span-full flex justify-center order-3 my-6 md:my-8">
          {!isReady ? (
            <div className="flex items-center gap-2 animate-pulse">
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
              {[1, 2, 3].map((n) => (
                <div key={n} className={`w-8 h-8 rounded-full ${n === 1 ? 'bg-gray-400' : 'bg-gray-200'}`} />
              ))}
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
            </div>
          ) : (
            <Pagination
              pageSize={PAGE_SIZE}
              items={ListaBusqueda}
              setProductosPaginados={handleSetProductosPaginados}
              onPageChange={scrollToProductosSection}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductosSection;
