"use client";

import { useEffect, useRef, useState } from "react";
type FetcherResponse<T>={
  success: boolean;
  data?: T[];
  message?: string;
};

type AutocompletadoProps<T> = {
  palabras: string;
  fetcher?: (query: string) => Promise<FetcherResponse<T>>;
  items?: T[];
  onSelect: (item: T) => void;
  debounceMs?: number;
};

export function useAutocompletado<T>({palabras,fetcher, items, onSelect, debounceMs = 300,}: AutocompletadoProps<T>) {
  const [lista, setLista] = useState<T[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const containerRef = useRef<HTMLUListElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!palabras.trim()) {
      setLista([]);
      setActiveIndex(-1);
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        if (items) {
          const q = palabras.toLowerCase();
          const filtered = items.filter((it: any) => ((it.name || it.nombre || '') as string).toLowerCase().includes(q));
          setLista(filtered as T[]);
        } else if (fetcher) {
          const res = await fetcher(palabras);
          if (res.success && res.data) {
            setLista(res.data);
          } else {
            setLista([]);
            setError(res.message ?? "Error al buscar");
          }
        } else {
          setLista([]);
        }
      } catch {
        setError("Error de conexión");
        setLista([]);
      } finally {
        setLoading(false);
        setActiveIndex(-1);
      }
    }, debounceMs);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [palabras, fetcher, items, debounceMs]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
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
    loading,
    error,
    containerRef,
    handleKeyDown,
    setActiveIndex,
  };
}
