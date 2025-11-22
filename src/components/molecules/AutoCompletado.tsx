import React from "react";
import { Producto } from "@/types/producto";
import { useAutocompletado } from "@/hooks/ui/useAutocompletado";

type AutoCompletadoProps = {
  items: any[];
  palabras: string;
  onSelect: (item: any) => void;
};

export default function AutoCompletado({ items, palabras, onSelect }: AutoCompletadoProps) {
  const {
    lista,
    activeIndex,
    setActiveIndex,
    handleKeyDown,
    containerRef
  } = useAutocompletado({ items, palabras, onSelect });

  if (!lista.length) return null;

  return (
    <ul
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="
        absolute top-full left-0 w-full bg-white border border-gray-200 
        shadow-lg rounded-2xl p-2 mt-1 max-h-60 overflow-auto z-[9999]
      "
    >
      {lista.map((item, index) => (
        <li
          key={item.nombre}
          onClick={() => onSelect(item)}
          onMouseEnter={() => setActiveIndex(index)}
          className={`
            p-2 rounded-xl cursor-pointer
            ${index === activeIndex ? "bg-gray-200" : "hover:bg-gray-100"}
          `}
        >
          {item.nombre}
        </li>
      ))}
    </ul>
  );
}
