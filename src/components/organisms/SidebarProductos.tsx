'use client';

import React, { useMemo } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { Producto } from '@/types/admin/producto';

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

  const listaCategorias = useMemo(() => {
    const grupos: Record<string, number> = {};
    allProductos.forEach((prod) => {
      const cat = prod.category_name || 'Sin Categoría';
      grupos[cat] = (grupos[cat] || 0) + 1;
    });
    return Object.entries(grupos).map(([nombre, count]) => ({ nombre, count }));
  }, [allProductos]);

  const todosActivo = categoriasActivas.length === 0;

  return (
    <div className="w-full md:w-64 font-sans">

      {/* Contenedor principal — card con borde celeste */}
      <div className="border-2 border-[#44BFDB] rounded-[14px] overflow-hidden bg-white">

        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-3.5">
          <SlidersHorizontal size={17} className="text-[#2BAFD6]" />
          <span className="text-[14px] font-medium text-[#1a1a3a] tracking-wide">
            Categoría
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#eef0f2]" />

        {/* Lista de categorías */}
        <div className="px-4 py-2">

          {/* Todos */}
          <div
            onClick={() => onLimpiar()}
            className={`flex items-center justify-between py-2 px-0 rounded-md cursor-pointer transition-colors duration-150 ${
              todosActivo ? 'bg-[#F1FAFD]' : 'hover:bg-[#f3fbfd]'
            }`}
          >
            <div className="flex items-center gap-2.5 px-1">
              {/* Checkbox */}
              <div
                className={`w-4 h-4 rounded-[4px] border flex items-center justify-center flex-shrink-0 transition-colors ${
                  todosActivo
                    ? 'bg-[#2BAFD6] border-[#2BAFD6]'
                    : 'border-[#c4c8ce]'
                }`}
              >
                {todosActivo && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span
                className={`text-[12px] transition-colors ${
                  todosActivo ? 'text-[#0E6886] font-medium' : 'text-[#4a4a5a]'
                }`}
              >
                Todos
              </span>
            </div>
            <span
              className={`text-[11px] rounded-full px-2 py-0.5 transition-colors ${
                todosActivo
                  ? 'bg-[#BDE7F2] text-[#0E6886]'
                  : 'bg-[#f1f3f5] text-[#a8aeb8]'
              }`}
            >
              {allProductos.length}
            </span>
          </div>

          {/* Categorías dinámicas */}
          {listaCategorias.map(({ nombre, count }) => {
            const isActive = categoriasActivas.includes(nombre);
            return (
              <div
                key={nombre}
                onClick={() => onToggleCategoria(nombre)}
                className={`flex items-center justify-between py-2 px-0 rounded-md cursor-pointer transition-colors duration-150 ${
                  isActive ? 'bg-[#F1FAFD]' : 'hover:bg-[#f3fbfd]'
                }`}
              >
                <div className="flex items-center gap-2.5 px-1">
                  <div
                    className={`w-4 h-4 rounded-[4px] border flex items-center justify-center flex-shrink-0 transition-colors ${
                      isActive
                        ? 'bg-[#2BAFD6] border-[#2BAFD6]'
                        : 'border-[#c4c8ce]'
                    }`}
                  >
                    {isActive && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`text-[12px] transition-colors ${
                      isActive ? 'text-[#0E6886] font-medium' : 'text-[#4a4a5a]'
                    }`}
                  >
                    {nombre}
                  </span>
                </div>
                <span
                  className={`text-[11px] rounded-full px-2 py-0.5 transition-colors ${
                    isActive
                      ? 'bg-[#BDE7F2] text-[#0E6886]'
                      : 'bg-[#f1f3f5] text-[#a8aeb8]'
                  }`}
                >
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SidebarProductos;
