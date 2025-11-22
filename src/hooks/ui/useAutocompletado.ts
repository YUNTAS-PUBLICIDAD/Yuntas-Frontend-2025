import { useEffect, useRef, useState } from "react";

type AutocompletadoProps<T> = {
  items: T[];
  palabras: string;
  onSelect: (item: T) => void;
};

export function useAutocompletado<T extends { nombre: string }>({
  items,
  palabras,
  onSelect
}: AutocompletadoProps<T>) {
  
  const [lista, setLista] = useState<T[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!palabras.trim()) {
      setLista([]);
      return;
    }

    const coincidencias = items.filter((e) =>
      e.nombre.toLowerCase().includes(palabras.toLowerCase())
    );

    setLista(coincidencias);
    setActiveIndex(-1);
  }, [palabras, items]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveIndex(-1);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!lista.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1 < lista.length ? prev + 1 : 0));
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 >= 0 ? prev - 1 : lista.length - 1));
    }

    if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      onSelect(lista[activeIndex]);
    }
  };

  return {
    lista,
    activeIndex,
    setActiveIndex,
    containerRef,
    handleKeyDown,
  };
}
