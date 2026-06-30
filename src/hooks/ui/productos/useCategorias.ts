import { useState, useMemo } from 'react';
import { Producto } from '@/types/admin/producto';

interface CategoriaItem {
  nombre: string;
  count: number;
}

export const useCategorias = (lista: Producto[]) => {
  // Array vacío = "Todos" activo. Con elementos = categorías seleccionadas.
  const [categoriasActivas, setCategoriasActivas] = useState<string[]>([]);

  const listaCategorias: CategoriaItem[] = useMemo(() => {
    const categoriasUnicas = Array.from(
      new Set(lista.flatMap((p) => (p.category_name ? [p.category_name] : [])))
    );
    return [
      { nombre: 'Todos los Productos', count: lista.length },
      ...categoriasUnicas.map((nombre) => ({
        nombre,
        count: lista.filter((p) => p.category_name === nombre).length,
      })),
    ];
  }, [lista]);

  // Marcar/desmarcar una categoría individual
  const handleToggleCategoria = (nombre: string) => {
    setCategoriasActivas((prev) => {
      if (prev.includes(nombre)) {
        // Desmarcar: si queda vacío, vuelve a "Todos"
        return prev.filter((c) => c !== nombre);
      } else {
        return [...prev, nombre];
      }
    });
  };

  // Limpiar todo → vuelve a "Todos"
  const handleLimpiar = () => setCategoriasActivas([]);

  // Para compatibilidad con useSelectCategorias existente
  const categoriaActiva =
    categoriasActivas.length === 0 ? 'Todos los Productos' : categoriasActivas[0];

  const handleSelectCategoria = (nombre: string) => {
    if (nombre === 'Todos los Productos') {
      handleLimpiar();
    } else {
      handleToggleCategoria(nombre);
    }
  };

  return {
    listaCategorias,
    categoriasActivas,
    handleToggleCategoria,
    handleLimpiar,
    // Los de abajo se mantienen para no romper useSelectCategorias
    categoriaActiva,
    handleSelectCategoria,
  };
};
