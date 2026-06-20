'use client';

import React, { useMemo, useState } from 'react';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { Producto } from '@/types/admin/producto';
import Link from 'next/link';

interface SidebarProductosProps {
  allProductos: Producto[];
  categoriasActivas: string[];
  onToggleCategoria: (nombre: string) => void;
  onLimpiar: () => void;
}

const SidebarProductos = ({
  allProductos,
  categoriasActivas,
  onToggleCategoria,
  onLimpiar,
}: SidebarProductosProps) => {

  // Productos agrupados por categoría (para el desplegable)
  const productosPorCategoria = useMemo(() => {
    const grupos: Record<string, Producto[]> = {};
    allProductos.forEach((prod) => {
      const cat = prod.category_name || 'Sin Categoría';
      if (!grupos[cat]) grupos[cat] = [];
      grupos[cat].push(prod);
    });
    return grupos;
  }, [allProductos]);

  const listaCategorias = useMemo(() => {
    return Object.entries(productosPorCategoria).map(([nombre, productos]) => ({
      nombre,
      count: productos.length,
    }));
  }, [productosPorCategoria]);

  // Estado del acordeón: qué categoría tiene su lista de productos desplegada
  const [categoriaExpandida, setCategoriaExpandida] = useState<string | null>(null);

  const toggleExpandir = (e: React.MouseEvent, nombre: string) => {
    e.stopPropagation(); // evita que el click en la flecha también marque el checkbox
    setCategoriaExpandida((prev) => (prev === nombre ? null : nombre));
  };

  const todosActivo = categoriasActivas.length === 0;

  return (
    <div className="w-full md:w-64 font-sans">

      <div className="border-2 border-[#44BFDB] rounded-[14px] overflow-hidden bg-white">

        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-3.5">
          <SlidersHorizontal size={17} className="text-[#2BAFD6]" />
          <span className="text-[14px] font-medium text-[#1a1a3a] tracking-wide">
            Categoría
          </span>
        </div>

        <div className="h-px bg-[#eef0f2]" />

        {/* Lista de categorías */}
        <div className="px-4 py-2">

          {/* Todos */}
          <div
            onClick={() => {
              onLimpiar();
              setCategoriaExpandida(null);
            }}
            className={`flex items-center justify-between py-2 px-2 -mx-2 rounded-md cursor-pointer transition-colors duration-150 ${
              todosActivo ? 'bg-[#F1FAFD]' : 'hover:bg-[#f3fbfd]'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className={`w-4 h-4 rounded-[4px] border flex items-center justify-center flex-shrink-0 transition-colors ${
                  todosActivo ? 'bg-[#2BAFD6] border-[#2BAFD6]' : 'border-[#c4c8ce]'
                }`}
              >
                {todosActivo && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className={`text-[12px] truncate ${todosActivo ? 'text-[#0E6886] font-medium' : 'text-[#4a4a5a]'}`}>
                Todos
              </span>
            </div>
            <span className={`text-[11px] rounded-full px-2 py-0.5 flex-shrink-0 ${todosActivo ? 'bg-[#BDE7F2] text-[#0E6886]' : 'bg-[#f1f3f5] text-[#a8aeb8]'}`}>
              {allProductos.length}
            </span>
          </div>

          {/* Categorías dinámicas */}
          {listaCategorias.map(({ nombre, count }) => {
            const isActive = categoriasActivas.includes(nombre);
            const isExpanded = categoriaExpandida === nombre;
            const productos = productosPorCategoria[nombre] || [];

            return (
              <div key={nombre}>
                <div
                  onClick={() => onToggleCategoria(nombre)}
                  className={`flex items-center justify-between py-2 px-2 -mx-2 rounded-md cursor-pointer transition-colors duration-150 ${
                    isActive ? 'bg-[#F1FAFD]' : 'hover:bg-[#f3fbfd]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-4 h-4 rounded-[4px] border flex items-center justify-center flex-shrink-0 transition-colors ${
                        isActive ? 'bg-[#2BAFD6] border-[#2BAFD6]' : 'border-[#c4c8ce]'
                      }`}
                    >
                      {isActive && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-[12px] truncate ${isActive ? 'text-[#0E6886] font-medium' : 'text-[#4a4a5a]'}`}>
                      {nombre}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-[11px] rounded-full px-2 py-0.5 ${isActive ? 'bg-[#BDE7F2] text-[#0E6886]' : 'bg-[#f1f3f5] text-[#a8aeb8]'}`}>
                      {count}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => toggleExpandir(e, nombre)}
                      aria-label={isExpanded ? `Ocultar productos de ${nombre}` : `Ver productos de ${nombre}`}
                      className={`w-5 h-5 flex items-center justify-center rounded transition-all duration-150 hover:bg-[#eef6f9] ${
                        isExpanded ? 'rotate-180 text-[#2BAFD6]' : 'text-[#9a9aaa]'
                      }`}
                    >
                      <ChevronDown size={14} />
                    </button>
                  </div>
                </div>

                {/* Productos desplegados */}
                {isExpanded && (
                  <div className="flex flex-col pl-[26px] pb-2 pt-0.5">
                    {productos.map((producto) => (
                      <Link
                        key={producto.id}
                        href={`/productos/${producto.slug}`}
                        className="text-[11px] text-[#7a7a8a] hover:text-[#2BAFD6] py-1 transition-colors truncate"
                      >
                        {producto.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="h-px bg-[#eef0f2]" />

        <button
          onClick={() => {
            onLimpiar();
            setCategoriaExpandida(null);
          }}
          className="w-full flex items-center justify-center gap-1.5 text-[11px] text-[#2BAFD6] py-3 hover:opacity-75 transition-opacity cursor-pointer"
        >
          <X size={13} />
          Limpiar todo
        </button>

      </div>
    </div>
  );
};

export default SidebarProductos;
