import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Producto } from '@/types/admin/producto';
import Link from 'next/link';

interface SidebarProductosProps {
  allProductos: Producto[];
  categoriaActiva: string;
  onSelectCategoria: (nombre: string) => void;
}

const SidebarProductos = ({ 
  allProductos, 
  categoriaActiva, 
  onSelectCategoria 
}: SidebarProductosProps) => {
  
  const productosPorCategoria = useMemo(() => {
    const grupos: Record<string, Producto[]> = {};
    allProductos.forEach((prod) => {
      const catName = prod.category_name || "Sin Categoría";
      if (!grupos[catName]) grupos[catName] = [];
      grupos[catName].push(prod);
    });
    return grupos;
  }, [allProductos]);

  const categoriasDisponibles = Object.keys(productosPorCategoria);
  
  // Estado del acordeón
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (catName: string) => {
    onSelectCategoria(catName);
    setOpenCategory(openCategory === catName ? null : catName);
  };

  return (
    <div className="w-full md:w-64 flex flex-col pr-2 font-sans">
      
      {/* TÍTULO */}
      <h2 className="text-xl font-bold text-[#0F172A] uppercase mb-4 tracking-wide">
        CATEGORÍA
      </h2>

      <div className="relative">
        
        <button
          onClick={() => {
             onSelectCategoria('Todos los Productos');
             setOpenCategory(null);
          }}
          className={`
            relative z-10 w-full text-left px-4 py-2.5 rounded-lg border 
            transition-all duration-200 text-sm font-medium
            ${categoriaActiva === 'Todos los Productos' 
              ? 'bg-[#E0F7FA] border-[#22D3EE] text-gray-800 shadow-sm' // Activo (Estilo Figma)
              : 'bg-white border-gray-200 text-gray-600 hover:border-[#22D3EE] hover:bg-[#E0F7FA]'}
          `}
        >
          Todos los productos ({allProductos.length})
        </button>

       
        <div className="relative mt-0 ml-5 pb-2">
            
            <div className="absolute left-0 top-0 h-full w-px bg-[#22D3EE]"></div>

            
            <div className="flex flex-col pt-4 gap-4">
            
              {categoriasDisponibles.map((catName) => {
                const productosDeEstaCat = productosPorCategoria[catName];
                const isActive = categoriaActiva === catName;
                const isOpen = openCategory === catName || isActive;

                return (
                  <div key={catName} className="relative pl-6">
                    
                  
                    <div className="absolute left-0 top-3 w-6 h-px bg-[#22D3EE]"></div>

                    <div className="flex flex-col">
                      
                     
                      <div 
                        onClick={() => toggleCategory(catName)}
                        className="flex items-center justify-between cursor-pointer group pr-2"
                      >
                        <span className={`text-sm transition-colors duration-200 ${isActive ? 'font-bold text-gray-900' : 'font-medium text-gray-600 group-hover:text-[#22D3EE]'}`}>
                          {catName}
                        </span>
                        
                        
                        <span className="text-gray-400">
                           {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </span>
                      </div>

                    
                      {isOpen && (
                        <div className="flex flex-col mt-2 gap-1 animate-in fade-in slide-in-from-top-1 duration-200">
                          {productosDeEstaCat.map((producto) => (
                            <Link
                              key={producto.id}
                              href={`/productos/${producto.slug}`}
                              className="block py-1 px-2 text-sm text-gray-500 hover:text-[#22D3EE] hover:bg-gray-50 rounded transition-colors"
                            >
                               {producto.name}
                            </Link>
                          ))}
                        </div>
                      )}

                    </div>
                  </div>
                );
              })}
            </div>
        </div>

      </div>
    </div>
  );
};

export default SidebarProductos;